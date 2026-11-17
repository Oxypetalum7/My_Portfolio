// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // 本番の正規URL。canonical・サイトマップの絶対URLはここから作る(wwwではなくapexを正とする)
  site: 'https://gekka-o.xyz',
  // 配信は /biography/index.html の形なので、本番は /biography を /biography/ へ307で転送する。
  // 内部リンクを末尾スラッシュ付きに揃え、Search Consoleで「リダイレクトあり」として数えられないようにする
  trailingSlash: 'always',
});
