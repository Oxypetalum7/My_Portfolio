// Rootsの草の影(grass_1/grass_2.svg)を、CSSマスク用のWebPに焼き付ける。草のSVGを変えたら作り直す。
//
// 使い方: `node scripts/render-grass-masks.mjs`
// SVGのままマスクにすると、細かなパスを画面の高さいっぱい×高解像度でGPUが描き直すことになり、
// 夜に入る瞬間に引っかかる。表示は最大720px×Retina(2.25倍)程度なので、高さ1600pxで焼く
import sharp from "sharp";

const DIR = "src/assets/biography/grass";
const HEIGHT = 1600;

for (const name of ["grass_1", "grass_2"]) {
  const src = `${DIR}/${name}.svg`;
  const { height } = await sharp(src).metadata();
  const info = await sharp(src, { density: (72 * HEIGHT) / height })
    .resize({ height: HEIGHT })
    .webp({ lossless: true, effort: 6 })
    .toFile(`${DIR}/${name}.webp`);
  console.log(`${DIR}/${name}.webp: ${info.width}x${info.height}, ${Math.round(info.size / 1024)}KB`);
}
