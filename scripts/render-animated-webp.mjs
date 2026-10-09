// Worksのアニメーション画像(GIF)を、アニメーションWebPに変換する。元のGIFを差し替えたら作り直す。
//
// 使い方: `node scripts/render-animated-webp.mjs`
// アマビエ様のGIFは324コマ・6.3MBあり、Worksページで飛び抜けて重い。背景が透過で、
// グローを輪郭に沿わせているので動画(MP4)にはできず、WebPにする。
// フレームレートは落とさない(ユーザー判断)。q60だと頬の赤みが薄れるのでq75
import sharp from "sharp";

const DIR = "src/assets/works";

for (const name of ["amabie-chara"]) {
  const info = await sharp(`${DIR}/${name}.gif`, { animated: true })
    .webp({ quality: 75, effort: 6 })
    .toFile(`${DIR}/${name}.webp`);
  console.log(`${DIR}/${name}.webp: ${info.width}x${info.pageHeight}, ${Math.round(info.size / 1024)}KB`);
}
