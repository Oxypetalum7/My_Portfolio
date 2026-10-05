// Biography(Personal)のRootsの森・靄・夜空の汚しを、原画(src/components/RootsArtwork.astro)から
// WebP画像に焼き付ける。原画を変えたら作り直す。
//
// 使い方: devサーバーを起動した状態で `node scripts/render-roots-artwork.mjs [http://localhost:4321]`
// 撮影はヘッドレスChrome(透過背景)、WebPへの変換はAstro同梱のsharpで行う
import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const BASE = process.argv[2] ?? "http://localhost:4321";
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const OUT_DIR = "src/assets/biography/roots";

// 原画のviewBoxに対する書き出し倍率。森はデスクトップで最大760px幅×Retinaで見せるため細部が要る。
// 靄・夜空の汚しはぼかした低周波のノイズなので等倍で足りる(縦横比はCSSで引き伸ばす)
const LAYERS = [
  { layer: "forest-far", width: 600, height: 1300, scale: 3 },
  { layer: "forest-mid", width: 600, height: 1300, scale: 3 },
  { layer: "forest-near", width: 600, height: 1300, scale: 3 },
  { layer: "mist-far", width: 760, height: 1400, scale: 1 },
  { layer: "mist-mid", width: 760, height: 1400, scale: 1 },
  { layer: "sky-mottle", width: 1600, height: 1400, scale: 1 },
  { layer: "sky-nebula", width: 1600, height: 1400, scale: 1 },
];

const work = mkdtempSync(join(tmpdir(), "roots-artwork-"));
try {
  for (const { layer, width, height, scale } of LAYERS) {
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
    const info = await sharp(png).webp({ quality: 90, alphaQuality: 100, effort: 6 }).toFile(out);
    console.log(`${out}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`);
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}
