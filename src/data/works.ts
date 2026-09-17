import type { ImageMetadata } from "astro";

import bromidi from "../assets/works/bromidi.png";
import discordBot from "../assets/works/discord-processing-bot.jpg";
import repairIt from "../assets/works/repair-it.png";
import amabieApp from "../assets/works/amabie-app.png";
import amabieChara from "../assets/works/amabie-chara.gif";
import funOnline from "../assets/works/fun-online.png";
import didIt from "../assets/works/did-it.png";
import ralaf from "../assets/works/ralaf.png";
import shougekiLogo from "../assets/works/shougeki-logo.png";
import shougekiPanel from "../assets/works/shougeki-panel.png";

export type WorkCategory =
  | "Android"
  | "Processing"
  | "Python"
  | "Design"
  | "Music"
  | "Live2D"
  | "Docker"
  | "Vue.js"
  | "Movie"
  | "Unity"
  | "Scrum"
  | "Go";

export const workCategoryColors: Record<WorkCategory, string> = {
  Android: "#00cd6a",
  Processing: "#2b41d1",
  Python: "#77602b",
  Design: "#8f11f7",
  Music: "#226aa9",
  Live2D: "#f09800",
  Docker: "#3a94fc",
  "Vue.js": "#059900",
  Movie: "#2700d7",
  Unity: "#f9c20a",
  Scrum: "#927a3f",
  Go: "#3fcfd9",
};

export interface WorkImage {
  image: ImageMetadata;
  alt: string;
  /** 表示上の最大幅(px)。省略時は468 */
  width?: number;
  /** 再生アイコンのオーバーレイを重ねるか */
  playOverlay?: boolean;
  /** ポラロイド風の影なし素通し画像(キャラ画像など) */
  plain?: boolean;
}

export interface WorkLink {
  label: string;
  /** TODO: null のリンクはURL未定。埋まるまで無効ボタンとして表示 */
  url: string | null;
}

export interface Work {
  period: string;
  /** タイトル上に小さく表示する冠テキスト */
  titleKicker?: string;
  title: string;
  /** 出典・提出先など(改行区切り) */
  credit: string[];
  categories: WorkCategory[];
  /** キャッチコピー(24px太字)。\nで改行 */
  summary: string;
  /** Commentセクションの段落群。\nで改行 */
  comments: string[];
  images: WorkImage[];
  links: WorkLink[];
  /** SoundCloud等の埋め込みプレイヤーURL(未定はnull、非対象はundefined) */
  soundcloudEmbed?: string | null;
}

export const worksGroups: { affiliation: string; works: Work[] }[] = [
  {
    affiliation: "@公立はこだて未来大学 2019 - 2022",
    works: [
      {
        period: "2019",
        title: "BROMIDI",
        credit: ["未来大 学部1年 必修科目「情報表現入門」提出作品"],
        categories: ["Processing"],
        summary:
          "「オリジナルブロック崩しを作成する」\nという課題に向き合った作品。\nMIDIファイルを読み込むと、ピアノロールが展開され、\n譜面を崩れる足場にしながらボールを完走させる\n「音楽鑑賞型ブロック崩し」に昇華させました。",
        comments: [
          "大学入学までプログラミング経験が無く、Processingが初めてのプログラミング体験でした。\nオリジナルのブロック崩しという課題設定に対して、\n「自分のアイデンティティであるDTMやMIDIの知識を活かす」事で、\n自分らしいブロック崩しの構築を試みました。",
          "プログラミングの得意な友人にProcessingのラッパーであるJavaのドキュメントの読み方を聞いたり、\n難しい処理のアルゴリズムを大学の先輩に訊いたりしつつ、\nオブジェクト指向やクラスについても理解しようと手を伸ばしました。\nちょっと背伸びして作った、想い入れのある作品です。",
        ],
        images: [{ image: bromidi, alt: "BROMIDIのプレイ画面" }],
        links: [{ label: "Github", url: "https://github.com/Oxypetalum7/Block-Game" }],
      },
      {
        period: "2020",
        title: "Discord-Processing Bot",
        credit: ["未来大 学部1年 必修科目「情報表現入門」提出作品"],
        categories: ["Python", "Processing"],
        summary:
          "DiscordチャンネルにProcessingコードを書くと、\nBotがコードをビジュアライズ。\nジェネラティブコードによる、\n新感覚コミュニケーションを狙いました。",
        comments: [
          "情報表現入門にてProcessingを習得した後に\n「折角覚えたProcessingを何か面白い事に使いたい」と思っていた所、\nTwitter(現X)で見かけた「シェル芸Bot※1」を思い出し、\n「Processingでもシェル芸のようなコミュニケーション表現が出来ると面白いのではないか?」\nという着想を得て制作しました。\n初めてのPythonに挑戦して、初めて学校以外の場所で、自分のプロダクトをカタチにした作品です。",
          "※1 ... Twitter(現X)へ特定タグを付けて投稿されたシェルスクリプトを実行し、\nその結果をポストするbotアカウント ([Link](https://twitter.com/minyoruminyon))",
        ],
        images: [
          { image: discordBot, alt: "Discord-Processing Botのデモ", playOverlay: true },
        ],
        links: [
          { label: "Github", url: "https://github.com/Oxypetalum7/Discord-Processngbot" },
        ],
      },
      {
        period: "2020",
        title: "Repair It!",
        credit: ["GlobalGameJam 2020 Hakodate 参加作品"],
        categories: ["Processing", "Design", "Music"],
        summary: "ひたすら、「なおせ」！\n軽快なテンポで進む、ミニゲームバラエティです。",
        comments: [
          "「Global Game Jam」という、世界中で同時開催されるゲーム開発ハッカソンに、函館から参加した時の作品です。\n大学の友人達と二人と、チーム「ぬまるきー」として、トリオ参加しました。\nテーマ「Repair」にちなんで、覚えたてのProcessingを駆使し、\n「なおす」に因んだミニゲームを次々とこなす、バラエティゲームを作り上げました。",
          "自身はゲームタイトル画面を担当し、タイトルロゴをはじめとするアセット制作とコーディングを担当しました。\nまた、「ゲームなら音楽が欲しい！」という自身のこだわりから、タイトル画面からゲーム中まで馴染むような、\n8bit調の軽快なメインテーマ楽曲を制作、提供しました。",
        ],
        images: [{ image: repairIt, alt: "Repair It! のタイトル画面" }],
        links: [{ label: "Github", url: "https://github.com/Oxypetalum7/Repair-it-" }],
        soundcloudEmbed: null,
      },
      {
        period: "2020",
        title: "Amabie Project",
        credit: ["公立はこだて未来大学 学内ハッカソン「Funlocks」参加作品"],
        categories: ["Live2D", "Android"],
        summary: "コロナ禍ハッカソンの作品。\nぬるぬる動くアマビエ様が、\n「密」を予言してくれます。",
        comments: [
          "学生主催のコロナ禍に向き合ったプロダクト開発ハッカソン「Funlocks」での制作作品です。",
          "「コロナ禍に屋外で使いたいプロダクト」というテーマに向き合った結果、\n「世間で警戒される“密”を、もう少しカジュアルに知れたら...」という願望へ転換したのがこの作品の始まりです。",
          "疫病対策のシンボルとして注目される「アマビエ」を「密」を知らせる魅力的なキャラにすべく、\nハッカソン期間中にLive2Dの知識を詰め込んで動かしました。",
          "チームメンバーが構築したAltBeaconライブラリによる密検知トリガーに応じて、\nぬるぬるとアマビエが滑らかに動いて「密」をお知らせしてくれます。",
        ],
        images: [
          { image: amabieApp, alt: "Amabie Projectのアプリ画面", width: 136 },
          { image: amabieChara, alt: "アマビエ様のキャラクター", width: 260, plain: true },
        ],
        links: [{ label: "Github", url: "https://github.com/FunLocks/team2003" }],
      },
      {
        period: "2021",
        title: "FUN Online\nInteractive Platform",
        credit: ["公立はこだて未来大学 高度ICT演習"],
        categories: ["Scrum", "Design"],
        summary: "コロナ禍から始まった\n「未来大の体験を拡張する」プロジェクト",
        comments: [
          "公立はこだて未来大学で実施されている、有志参加型の演習活動「高度ICT演習」に参加した際の取り組みです。\n本プロジェクトは2021年に発足し、「コロナ禍における学生間コミュニケーションの減少」を\n自分達学生の解決課題として置くところから始まりました。",
          "アジャイル開発のプラクティスを駆使しながら、解決手法を自らに問い続けた結果、\n「オンライン化でも“未来大”を感じられる、新しいコミュニケーションプラットフォームを自分達で造ろう」\nというビジョンが立ち上がり、プロトタイピングやプロジェクト管理について模索しながら進む初年となりました。\n初年度に所属した際は、Figmaを用いたプロトタイピングデザインを制作し、\n「何をカタチにすべきか」のイメージを可視化する役割を担いました。",
          "コロナ禍を越えた今でもプロジェクトは現存しており、\n「“未来大らしさ”を抽出し、未来大の体験向上を問うプロジェクト」として、血筋が受け継がれている様です。",
        ],
        images: [{ image: funOnline, alt: "FUN Online Interactive Platformのプロトタイプ" }],
        links: [
          {
            label: "高度ICT演習 Webサイト (Archive)",
            url: "https://web.archive.org/web/20240407030057/https://www.fun.ac.jp/advanced-ict",
          },
        ],
      },
      {
        period: "2022",
        title: "DID IT",
        credit: [
          "プロジェクト学習",
          "「使ってもらって学ぶフィールドシステムデザイン2021」開発プロダクト",
          "防災学習レクリエーションゲーム",
        ],
        categories: ["Scrum", "Android", "Go", "Vue.js", "Docker", "Design"],
        summary: "防災学習を、学校体験と紐付ける。\n実際に使ってもらって、さらに磨く。",
        comments: [
          "とても思い入れのあるプロダクトです。未来大の「プロジェクト学習」にて、\n1年間かけて課題設定からプロダクト開発、実地運用まで取り組みました。",
          "フィールドワークと地域の方々へのヒアリングを重ねる中で、大火・活火山・津波の記憶を持つ函館でさえ\n「防災意識が世代交代とともに薄れている」という問題に出会いました。",
          "Androidアプリで、学校に隠された日用品のQRコードを読み取ると防災クイズが出現するゲーミフィケーション体験を通し、「身近な物に防災のヒントがある」という気づきを届けることを狙いました。",
          "スクラムマスターとしてチームの調律に挑みつつ、AltBeaconによるアプリ実装、Go/Vue.js/Dockerでの進行監視CMS「DID IT Observer」とAPI開発、Figmaでのアセット制作まで幅広く手を動かしました。",
          "えさん小学校の教頭先生とのスプリントレビューを重ね、2回の実地試験を実現。\n慣れ親しんだ学校を楽しそうに探索する子供達の姿は今も心に残っており、\n「良いものには技術だけでなく良いデザインが必要」という自身のプロダクト哲学が芽生えた原点です。",
        ],
        images: [{ image: didIt, alt: "DID ITのアプリ画面", width: 200 }],
        links: [{ label: "プロジェクトWebサイト", url: null }],
      },
      {
        period: "2022",
        title: "RALAF",
        credit: ["着席管理QRコードの読み取り支援アプリ"],
        categories: ["Scrum", "Android", "Go", "Vue.js", "Docker", "Design"],
        summary: "コロナ禍の大学システムのUXを改善する、\n実運用実績ありのアプリケーション。",
        comments: [
          "コロナ禍であった当時、公立はこだて未来大学では、\n教室の離着席の経歴を学籍番号ベースで管理する運用が取られていました。\nその際、各座席についたQRコードを読み、追跡用アンケートに各種情報を入力する必要があったのですが、\n席移動の旅に入力するのが、これまた「面倒くさい」。",
          "そこで、当時の大学の友人が、大学側へ\n「QRコード読み取り機能/学籍番号を保持し、アンケートに入力する機能を備えたPWAサービス」\nを提案し、公認の融資プロジェクトとなったのが、RALAFの始まりです。",
          "自身もこちらのプロジェクトに参画させてもらい、Vue.jsによるローカライゼーション対応やメンテナンス、\nサポーターズ社主催の「技育展2021」への出展時プロモーションビデオ、キービジュアル制作を担当しました。",
        ],
        images: [{ image: ralaf, alt: "RALAFのフライヤー" }],
        links: [{ label: "Youtube - 紹介動画", url: null }],
      },
      {
        period: "2022, 2025",
        titleKicker: "表情トレーニングゲーム",
        title: "笑撃",
        credit: [
          "Open Hack U 2021 Online Vol.4「Happy Hacking賞」受賞作品",
          "NT函館2025 出品作品",
        ],
        categories: ["Unity", "Python", "Music", "Movie", "Design"],
        summary: "表情のチカラで戦う、新感覚顔バトル！\n楽しく「顔力」が鍛えられます。",
        comments: [
          "Yahoo!社(現LINEヤフー社)が主催する「Open Hack U」ハッカソン出場時の作品です。",
          "課題設定を話し合う中で「表情が硬くて写真写りが悪いことにコンプレックスがある」\nと、メンバーが吐露したことが、このプロダクトの始まりでした。",
          "ゲームは、「プレイヤーの顔」と、表情の力をカード化した「表情デッキ」を用いて、\n一対一のリアルタイムバトル形式で進行します。\n自身の画面に表示される「表情のお題」に沿って、プレイヤーは笑顔、泣き顔、怒り顔...を次々繰り出し、\nお題と表情が合致すると対戦相手にアタックを行います。\nアタックを繰り返し、先に相手の体力ゲージを削り切った方が勝利です。\n「表情デッキ」のカード効果を用いて、体力を回復したり、攻撃力を上げたり、お題表情を固定したり、\nと、ちょっとした戦略も楽しめます。\n対戦を繰り返すことで「スMile」というゲーム内通貨が貯まり、\n新しい表情カードを購入することも可能です。",
          "この作品では、Pythonを用いた、カメラ画像からリアルタイムに表情の判定を行い、\nUnityに送信するパイプラインシステム構築、対戦画面のバトル演出実装、のゲーム中BGM(2曲)の制作、\n一部表情カードの制作、プレゼンテーションムービー制作、タイトルロゴの制作を担当しました。",
          "また、この作品はモノづくり系イベント「NT函館 2025」にて、アップデート版の出品を行いました。\nBGMブラッシュアップ、Mac OS対応、紹介パネルデザインなどを担当しました。",
        ],
        images: [
          { image: shougekiLogo, alt: "笑撃のタイトルロゴ", width: 256 },
          { image: shougekiPanel, alt: "笑撃の紹介パネル", width: 240, plain: true },
        ],
        links: [
          { label: "Open Hack U 2021 - Youtube", url: null },
          { label: "X - post", url: null },
        ],
      },
    ],
  },
];
