// 狼マーク(src/assets/brand/wolf-mark.svg)から favicon 一式を作る。狼マークを変えたら作り直す。
//
// 使い方: `node scripts/build-favicon.mjs`
// 出力: public/favicon.svg / public/favicon.ico(16・32・48px) / public/apple-touch-icon.png(180px)
// 原画の線は細く、タブの16〜32pxでは消えてしまうので、線を太らせて背景色のタイルに載せる
import { readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const BACKGROUND = "#292927"; // --color-background-default
const STROKE = 4; // 狼マークのviewBox単位での線の太らせ幅

const wolf = readFileSync("src/assets/brand/wolf-mark.svg", "utf8");
const inner = wolf
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/ stroke-width="[0-9.]*"/g, "");

const icon = (radius) => `<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="256" height="256" rx="${radius}" fill="${BACKGROUND}"/>
<svg x="36" y="18" width="184" height="220" viewBox="0 0 172 198" fill="none">
<g stroke="white" stroke-width="${STROKE}" stroke-linejoin="round">${inner}</g>
</svg>
</svg>
`;

writeFileSync("public/favicon.svg", icon(56));

// iOSは角を自前で丸めるので、apple-touch-iconは角なしの正方形にする
await sharp(Buffer.from(icon(0))).resize(180, 180).png().toFile("public/apple-touch-icon.png");

// ICOはPNGをそのまま格納する形式(Vista以降の全ブラウザが対応)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((px) => sharp(Buffer.from(icon(56))).resize(px, px).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((px, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(px, entry);
  header.writeUInt8(px, entry + 1);
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(pngs[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += pngs[i].length;
});
writeFileSync("public/favicon.ico", Buffer.concat([header, ...pngs]));
