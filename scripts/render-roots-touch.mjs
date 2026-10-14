// Rootsの夜景のタッチ端末用の画像を作る。render-roots-artwork.mjs で焼いた画像を元にするので、
// 原画を焼き直したらこれも作り直す。
//
// 使い方: `node scripts/render-roots-touch.mjs`
// タッチ端末(ピンチで拡大できる端末)では、夜空の汚し・森・靄・レトロな質感を1つの要素の背景
// (background-image を重ねて background-blend-mode で混ぜる)として描き、合成層を1枚にまとめる。
// 背景の重ね描きでは層ごとの opacity / filter が使えないため、CSSで掛けていた不透明度と明るさを
// 画像の透明度と色に焼き込んでおく(ざらつきは、敷き詰めた背景にブレンドを掛けるとSafariが灰色に潰すため要素のまま)。狭い画面(≤1250px、森が本文の背後に回る)では森・靄をさらに
// 0.35倍に薄くするので、森・靄は広い画面用と狭い画面用の2通り作る
import { mkdirSync } from "node:fs";
import sharp from "sharp";

const SRC = "src/assets/biography/roots";
const OUT = `${SRC}/touch`;

// BiographyPersonal.astro の .forest-* / .mist-* / .sky-* の opacity・brightness と同じ値
const LAYERS = {
  "forest-far": { opacity: 0.45, brightness: 0.65, forest: true },
  "forest-mid": { opacity: 0.85, brightness: 0.85, forest: true },
  "forest-near": { opacity: 1, brightness: 1, forest: true },
  "mist-far": { opacity: 0.75, forest: true },
  "mist-mid": { opacity: 0.5, forest: true },
  "sky-mottle": { opacity: 0.85 },
  "sky-nebula": { opacity: 0.4 },
};
// 森の表示幅は、広い画面で最大760px×2倍、狭い画面で約470px×3倍
const FOREST_WIDTH = { wide: 1500, narrow: 1200 };
const NARROW_OPACITY = 0.35;

async function bake(input, { opacity = 1, brightness = 1 }) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.round(data[i] * brightness);
    data[i + 1] = Math.round(data[i + 1] * brightness);
    data[i + 2] = Math.round(data[i + 2] * brightness);
    data[i + 3] = Math.round(data[i + 3] * opacity);
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

async function write(image, name, options = { quality: 90, alphaQuality: 100, effort: 6 }) {
  const out = `${OUT}/${name}.webp`;
  const info = await image.webp(options).toFile(out);
  console.log(`${out}: ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`);
}

mkdirSync(OUT, { recursive: true });

for (const [layer, { opacity, brightness, forest }] of Object.entries(LAYERS)) {
  const input = `${SRC}/${layer}.webp`;
  if (!forest) {
    await write(await bake(input, { opacity, brightness }), layer);
    continue;
  }
  const { width } = await sharp(input).metadata();
  for (const [variant, factor] of [["wide", 1], ["narrow", NARROW_OPACITY]]) {
    const image = await bake(input, { opacity: opacity * factor, brightness });
    if (layer.startsWith("forest")) image.resize({ width: Math.min(width, FOREST_WIDTH[variant]) });
    await write(image, `${layer}-${variant}`);
  }
}
