# Oxypetalum7's Portfolio

木川 裕太郎 / Yutaro Kikawa (a.k.a. ki-chan / oxypetalum7) のWebポートフォリオです。

🌐 公開先: [gekka-o.xyz](https://gekka-o.xyz)

## コンセプト — リブランディングに寄せて

このポートフォリオは、自身の「好き」を基調に据えたリブランディングとして制作しています。

### 意匠

- **狼** — 昔から好きな動物。気高さと冷静さ、慎重でありながら親しいものへの愛がある習性は、目指すエンジニア像であり、自身が魅力的だと思う価値観そのものです。
- **月下美人** — 7月19日の誕生花。花言葉「強い意志」「秘めた情熱」には信条としたい響きがあり、夜にだけ静かに咲くその神秘性にも惹かれています。ハンドルネームの *oxypetalum* も、月下美人の学名 (*Epiphyllum oxypetalum*) から取っています。

### デザインシステム方針

**シンプルで、優しいデザイン。**
強いビジュアルで語るのではなく、可視性を担保しながら、諸所の技と遊び心で自身のエネルギーを語ることを目指しました。カンプはFigmaでコンポーネントから自らの手で丁寧に作り、アクセシビリティを配慮したカラーシステムと、一貫したコンポーネントレイアウトを構築しています。

| Figma画面(コンポーネント) | Figma画面(ページレイアウト) |
| --- | --- |
| <img width="300" alt="figma_ss_component" src="https://github.com/user-attachments/assets/e8028460-f2fe-4761-915a-3d39a42f649b" /> | <img width="400" alt="figma_ss_page" src="https://github.com/user-attachments/assets/53173342-31cd-43ab-9a4a-ec827076ae63" /> |

※開発途中のスクリーンショットであり、実際のポートフォリオと異なる場合があります。

**語りたいところは、その温度で語る。**
ベースのトーンはミニマルに保ちつつ、文章の体温が上がる場所では、デザインも同じ温度まで引き上げます。たとえばBiography (Personal) では、原体験を語るRootsセクションに「あの夜」を再演する夜景を敷き、近況を語るNowセクションは罫線ノートの下地に綴りました。全体を一律のトーンで均すのではなく、語りの熱量に合わせて意匠の濃度を変えることで、「人」まで伝わるポートフォリオを目指しています。

**AIとの協調。**
AIと協調して作ることを前提に、Figmaでのカンプ作成を徹底しました。ポートフォリオ案の壁打ちから、素材数点(アイコンのBezier/pwm-moonバリアント、Infoの空白時テキスト)のアイデア出しまで、Claudeと意見を交わしながら制作しています。実装もカンプを共通言語として、Claude Codeとの対話を重ねて磨き上げました。

> 📝 リブランディングのコメンタリーブログ、およびClaude側のこだわりレポートを[ブログ記事「gekka-o.xyz ができるまで — 伴走したAIから見た話」](https://blog.gekka-o.xyz/posts/gekka-o-making-of/)にて公開しています。

## こだわりの実装

- **月下美人の開花アニメーション** — トップページのアイコンは3種のバリアントからアクセスごとにランダム表示。花弁4層(細線8枚→大→中→小)→雄蕊→雌蕊の順に、わずかに回転しながら時差で「開花」します
- **しっとりとした演出の統一** — ページ遷移(View Transitions)、Biographyのぼかし画像バンド、ポラロイド写真の投げ入れなど、ブラーとease系カーブによる柔らかな質感で統一
- **解像度にシームレスに追従するレイアウト** — `max()` / `clamp()` を用いた連続的な位置・スケール計算で、モバイルからウルトラワイドまでブレークポイントの「跳び」なく追従
- **データ駆動** — 作品 (`works.ts`)、職務経歴 (`jobActivities.ts`)、更新情報 (`updates.json`)、ステータス文言 (`statusMessages.ts`) をデータとして分離し、内容の更新をコード変更から独立

## 技術構成

| 項目 | 採用技術 |
| :--- | :--- |
| フレームワーク | [Astro](https://astro.build) (静的ビルド + View Transitions) |
| フォント | セルフホスト ([Fontsource](https://fontsource.org): Alumni Sans / Alumni Sans Pinstripe / Averia Gruesa Libre) + Hiragino系 |
| デザインカンプ | Figma (コンポーネントベースで自作) |
| ホスティング | Cloudflare Workers (静的アセット配信、GitHub連携で自動デプロイ) |

## ページ構成

- **Home** — 月下美人アイコンの開花と、ランダムなステータス文言でお出迎え
- **Biography** — Professional / Personal をスライドトグルで切替(ダーク/ライトのテーマも連動)
- **Job Activities** — 職務経歴
- **Works・Projects** — 学生時代からの制作物(動画・SoundCloud埋め込みつき)
- **Links・Contacts** — 各種リンクと連絡先

## 開発

```sh
npm install
npm run dev      # 開発サーバー (localhost:4321)
npm run build    # 本番ビルド (./dist/)
npm run preview  # ビルドのプレビュー
npm run check    # 型チェック → ビルド → CSPの取りこぼしチェック(push前に)
```

## License

©︎2026 Yutaro Kikawa — ソースコードの参照は歓迎ですが、文章・画像・動画等のコンテンツの無断転載はご遠慮ください。
