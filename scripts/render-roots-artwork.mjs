// Biography(Personal)のRootsの森・靄・夜空の汚しを、原画(src/components/RootsArtwork.astro)から
// WebP画像に焼き付ける。原画を変えたら作り直す。
//
// 使い方: devサーバーを起動した状態で `node scripts/render-roots-artwork.mjs [http://localhost:4321] [層の名前...]`
// (層の名前を並べると、その層だけを作り直す。例: mist-far mist-mid)
// 撮影はヘッドレスChrome(透過背景)、WebPへの変換はAstro同梱のsharpで行う。
// 層の大きさ・切り出す帯は src/lib/roots.ts をそのまま読む(Node 23.6以降の型除去で .ts を直接import)
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";
import { ROOTS_LAYERS } from "../src/lib/roots.ts";

const BASE = process.argv[2] ?? "http://localhost:4321";
const ONLY = process.argv.slice(3);
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = "src/assets/biography/roots";

// 原画のviewBoxに対する書き出し倍率。森はデスクトップで最大760px幅×Retinaで見せるため細部が要る。
// 靄・夜空の汚しはぼかした低周波のノイズなので等倍で足りる(縦横比はCSSで引き伸ばす)
const SCALE = { "forest-far": 3, "forest-mid": 3, "forest-near": 3 };
const LAYERS = Object.entries(ROOTS_LAYERS).map(([layer, { viewBox, band }]) => ({
  layer,
  width: viewBox[0],
  height: viewBox[1],
  scale: SCALE[layer] ?? 1,
  band,
})).filter(({ layer }) => ONLY.length === 0 || ONLY.includes(layer));

// 靄の左右の端が板のように切れて見えないよう、横方向のフェードを透明度に焼き込む
// (左端の透明から40%で不透明、88%から右端の透明へ)。CSSのマスクで掛けると、iPhoneで拡大した時に
// 層の縦全体ぶんのメモリを確保して落ちるため
const SIDE_FADE = { "mist-far": true, "mist-mid": true };
const sideFade = (t) => (t < 0.4 ? t / 0.4 : t > 0.88 ? (1 - t) / 0.12 : 1);
async function fadeSides(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4 + 3;
      data[i] = Math.round(data[i] * sideFade((x + 0.5) / info.width));
    }
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

const work = mkdtempSync(join(tmpdir(), "roots-artwork-"));
try {
  for (const { layer, width, height, scale, band } of LAYERS) {
    const png = join(work, `${layer}.png`);
    execFileSync(CHROME, [
      "--headless",
      "--hide-scrollbars",
      "--default-background-color=00000000",
      `--force-device-scale-factor=${scale}`,
      `--window-size=${width},${height}`,
      "--virtual-time-budget=10000",
      `--screenshot=${png}`,
      `${BASE}/dev/roots-artwork/${layer}`,
    ], { stdio: "ignore" });
    const out = join(OUT_DIR, `${layer}.webp`);
    // 森は木のある帯だけを切り出す(帯の外は透明)
    const source = SIDE_FADE[layer] ? await fadeSides(png) : sharp(png);
    const image = band
      ? source.extract({ left: 0, top: band[0] * scale, width: width * scale, height: (band[1] - band[0]) * scale })
      : source;
    const info = await image.webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(out);
    console.log(`${out}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
