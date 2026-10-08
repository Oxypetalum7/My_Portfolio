// ビルド成果物(dist/)が読み込む外部の読み込み先が、public/_headers のCSPで許されているかを確かめる。
// CSPの取りこぼしは見た目に出ず(埋め込みが空になる・計測が止まる)気づきにくいので、外部を増やしたら回す。
//
// 使い方: `npm run build` のあとに `node scripts/check-csp.mjs`(`npm run check` なら型チェック・ビルドから通しで回る)
// 拾うもの: HTMLの読み込み系の属性(script・iframe・img・link など)、インラインstyleとCSSの url()、
//   インラインscriptと _astro/*.js の文字列中のURL(fetchなどの通信先とみなす)
// 拾えないもの: Cloudflareが本番で差し込むもの(Web Analytics など)は dist/ にないので、手で足すこと
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";

// scriptの文字列に出てくるが、通信先ではないURL(SVGなどの名前空間)
const IGNORED_URLS = [/^http:\/\/www\.w3\.org\//];

// --- _headers からCSPを読む ---
const headers = readFileSync("public/_headers", "utf8");
const cspLine = headers.split("\n").find((line) => /^\s*Content-Security-Policy:/i.test(line));
if (!cspLine) {
  console.error("public/_headers に Content-Security-Policy が見つかりません");
  process.exit(1);
}
const csp = new Map(
  cspLine
    .replace(/^\s*Content-Security-Policy:\s*/i, "")
    .split(";")
    .map((d) => d.trim().split(/\s+/))
    .filter(([name]) => name)
    .map(([name, ...sources]) => [name, sources]),
);

// ディレクティブがなければ default-src に落ちる(form-action・frame-ancestors などは落ちないが、ここでは扱わない)
const sourcesFor = (directive) => csp.get(directive) ?? csp.get("default-src") ?? [];

// CSPのソース式(https://host・https://*.host・https: など)にURLが当てはまるか
const matches = (url, source) => {
  if (/^[a-z][a-z0-9+.-]*:$/i.test(source)) return url.protocol === source.toLowerCase();
  const m = source.match(/^(?:([a-z][a-z0-9+.-]*):\/\/)?(\*\.)?([^/:]+)(?::(\d+|\*))?(\/.*)?$/i);
  if (!m || source.startsWith("'")) return false;
  const [, scheme, wildcard, host, port, path] = m;
  if (scheme && url.protocol !== `${scheme.toLowerCase()}:`) return false;
  // スキームを省いた式は、http のページなら http/https、https のページなら https だけに当てはまる。本番は https なので https に限る
  if (!scheme && url.protocol !== "https:") return false;
  const h = host.toLowerCase();
  if (wildcard ? !url.hostname.endsWith(`.${h}`) : url.hostname !== h) return false;
  if (port && port !== "*" && url.port !== port) return false;
  if (path && !(path.endsWith("/") ? url.pathname.startsWith(path) : url.pathname === path)) return false;
  return true;
};

// --- dist/ から外部の読み込みを集める ---
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const files = walk(DIST);

/** @type {{ directive: string, url: string, file: string }[]} */
const loads = [];
const add = (directive, raw, file) => {
  const value = raw.trim().replace(/&amp;/g, "&");
  if (!/^(https?:)?\/\//i.test(value)) return; // 同一オリジン(相対パス)と data: は対象外
  if (IGNORED_URLS.some((re) => re.test(value))) return;
  loads.push({ directive, url: value.startsWith("//") ? `https:${value}` : value, file });
};
const urlsInCss = (css) => [...css.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)].map((m) => m[2]);
const fontOrImage = (url) => (/\.(woff2?|ttf|otf|eot)([?#]|$)/i.test(url) ? "font-src" : "img-src");
const urlsInScript = (js) => [...js.matchAll(/["'`](https?:\/\/[^"'`\s]+)/g)].map((m) => m[1]);
const attr = (attrs, name) =>
  attrs.match(new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"))?.slice(1).find((v) => v !== undefined);
const srcset = (value) => value.split(",").map((c) => c.trim().split(/\s+/)[0]).filter(Boolean);

for (const file of files) {
  if (file.endsWith(".js")) {
    for (const url of urlsInScript(readFileSync(file, "utf8"))) add("connect-src", url, file);
  } else if (file.endsWith(".css")) {
    for (const url of urlsInCss(readFileSync(file, "utf8"))) add(fontOrImage(url), url, file);
  } else if (file.endsWith(".html")) {
    const html = readFileSync(file, "utf8");
    for (const [, tag, attrs] of html.matchAll(/<([a-z][a-z0-9-]*)(\s[^>]*)?>/gi)) {
      const a = (name) => attr(attrs ?? "", name);
      const style = a("style");
      if (style) for (const url of urlsInCss(style)) add(fontOrImage(url), url, file);
      switch (tag.toLowerCase()) {
        case "script":
          if (a("src")) add("script-src", a("src"), file);
          break;
        case "iframe":
        case "frame":
          if (a("src")) add("frame-src", a("src"), file);
          break;
        case "img":
          if (a("src")) add("img-src", a("src"), file);
          if (a("srcset")) for (const u of srcset(a("srcset"))) add("img-src", u, file);
          break;
        case "source":
          if (a("srcset")) for (const u of srcset(a("srcset"))) add("img-src", u, file);
          if (a("src")) add("media-src", a("src"), file);
          break;
        case "video":
        case "audio":
        case "track":
          if (a("src")) add("media-src", a("src"), file);
          if (a("poster")) add("img-src", a("poster"), file);
          break;
        case "object":
        case "embed":
          if (a("data") ?? a("src")) add("object-src", a("data") ?? a("src"), file);
          break;
        case "form":
          if (a("action")) add("form-action", a("action"), file);
          break;
        case "link": {
          const rel = (a("rel") ?? "").toLowerCase().split(/\s+/);
          const as = (a("as") ?? "").toLowerCase();
          const href = a("href");
          if (!href) break;
          if (rel.includes("stylesheet") || as === "style") add("style-src", href, file);
          else if (as === "font") add("font-src", href, file);
          else if (as === "script" || rel.includes("modulepreload")) add("script-src", href, file);
          else if (as === "image" || rel.some((r) => r.includes("icon"))) add("img-src", href, file);
          else if (rel.includes("manifest")) add("manifest-src", href, file);
          break;
        }
      }
    }
    for (const [, body] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)) {
      for (const url of urlsInCss(body)) add(fontOrImage(url), url, file);
    }
    for (const [, attrs, body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
      const type = (attr(attrs, "type") ?? "").toLowerCase();
      if (type && !["module", "text/javascript", "application/javascript"].includes(type)) continue; // JSON-LDなどは実行されない
      for (const url of urlsInScript(body)) add("connect-src", url, file);
    }
  }
}

// --- 照合 ---
const blocked = new Map(); // "directive url" → 出てきたファイル
for (const { directive, url, file } of loads) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    continue;
  }
  if (sourcesFor(directive).some((s) => matches(parsed, s))) continue;
  const key = `${directive}  ${parsed.origin}`;
  if (!blocked.has(key)) blocked.set(key, new Set());
  blocked.get(key).add(file);
}

if (blocked.size > 0) {
  console.error("CSPで止められる外部の読み込みがあります。public/_headers の該当ディレクティブに足してください:\n");
  for (const [key, where] of blocked) console.error(`  ${key}\n    ← ${[...where].join(", ")}`);
  process.exit(1);
}
const origins = new Set(loads.map((l) => `${l.directive}  ${new URL(l.url).origin}`));
console.log(`CSP OK: 外部の読み込み ${origins.size} 件はすべて許可済み`);
for (const o of [...origins].sort()) console.log(`  ${o}`);
