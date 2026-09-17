export type JobCategory = "Android" | "iOS" | "Firebase" | "AI Driven Dev";

export interface JobActivity {
  period: string;
  title: string;
  categories: JobCategory[];
  /** 段落ごとの本文。配列要素間は段落間隔、要素内の\nは改行 */
  paragraphs: string[];
  /** 「担当」リスト。空なら見出しごと非表示 */
  roles: string[];
}

export const jobActivityGroups = [
  {
    company: "@フェンリル株式会社 2023 - 2026",
    activities: [
      {
        period: "2023 – 2024",
        title: "航空会社向けアプリ開発",
        categories: ["Android"],
        paragraphs: [
          "新卒入社後、最初に参画したモバイルアプリ開発プロジェクト。\nAndroidエンジニアとして開発に参加。\nJetPackComposeを学習しながら、アジャイル開発プロセスの現場に参加。",
          "モバイルアクセシビリティ実装対応\n(TalkBack対応、テキストサイズ対応、UI拡大・表示調整対応)\n外部SDK実装対応\n(アナリティクス、DeepLink)、他言語対応の実装(日・英)\nを経験済み。",
        ],
        roles: ["Androidアプリ開発", "チームによる大規模モバイルプロダクト開発"],
      },
      {
        period: "2023",
        title: "自社ブランディング用挨拶状アプリ開発",
        categories: ["Android"],
        paragraphs: [
          "スマートフォンを傾けたり、振るなどの操作を通して、複数の世界観を体験する、\nインタラクティブな挨拶状アプリ。",
          "Androidエンジニアとして開発に参加。\nJetPackComposeのアニメーション実装の一部、アニメーションの主軸となるジャイロシステムの調査、\n設計、および実装、他言語対応の実装(日・英・中)の一部を担当。",
          "デザイン主導のプロジェクトに伴走し、\nデザイン提案プロセスへの参加、\nプロトタイプを作っては手触りをデザインチームに確かめてもらいフィードバックを繰り返す、\n反復的なデザイン開発プロセスなどを経験。",
        ],
        roles: ["Androidアプリ開発", "チームによる大規模モバイルプロダクト開発"],
      },
      {
        period: "2025 - 2026",
        title: "スポーツエンターテイメント系アプリ開発",
        categories: ["Android", "iOS", "Firebase", "AI Driven Dev"],
        paragraphs: [
          "初期開発フェーズから初めて携わったプロジェクト。\n初期はAndroidアプリエンジニアとして参画。",
          "Kotlin MultiPlatformを基盤とした、\n「ビジネスロジック層を共通化し、UI層をネイティブで書き分ける」\nアーキテクチャコンセプトのアプリ開発を経験。",
          "Firebase Analytics, Crashlytics, DeepLink, Firebase Cloud Messaging, Push通知等の設計/実装を担当。モバイルアプリ共通基盤のミニチームのリードを経験。\nAndroidだけでなく、iOSの実装も経験。",
          "エンハンスフェーズでの保守・機能拡充では、AI駆動の開発にも意欲的に取り組み、\n「AIが作ったものを人間が監査する」という思想のもと、\n設計・開発・レビューの諸所でAI利用について試行錯誤し、\n「エンジニアとしていかに品質担保ができるか」という課題に向き合った。",
          "また、クライアントから提示された要望に対して、\nエンジニア観点(フィジビリティ・アクセシビリティなど)とデザイン観点(アプリ体験・プロダクトバリューなど)\nの双方を考慮した提案を行い、Figmaによるプロトタイプ等を用いて、\n自社デザイナーへ向けてアイデア提案にも挑戦した。",
        ],
        roles: ["Androidアプリ開発", "チームによる大規模モバイルプロダクト開発"],
      },
      {
        period: "2026",
        title: "Mobile Act",
        categories: [],
        paragraphs: [
          "当時の自社が主催する勉強会「Mobile Act」の運営に参画。",
          "ブランディング方針策定への参加、運営フローのドキュメント整備や、\nイベント毎の定常作業に関する定常作業のシステム化・運用化など、\nサスティナブルなイベントコミュニティを作るための活用に寄与。",
          "イベント事前準備・スタッフ対応についても一部担当。\nMobile Act OSAKA 19にてLT登壇。",
        ],
        roles: [],
      },
    ] satisfies JobActivity[],
  },
];

export const categoryColors: Record<JobCategory, string> = {
  Android: "#00cd6a",
  iOS: "#3fcedd",
  Firebase: "#ef8c35",
  "AI Driven Dev": "#6b42dd",
};
