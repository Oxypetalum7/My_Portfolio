/** トップページ Info ブロックに表示するステータス文言。アクセスごとにランダムで1つ選ばれる */
export interface StatusMessage {
  en: string;
  ja: string;
}

export const statusMessages: StatusMessage[] = [
  { en: "Slowly getting ready.", ja: "まったり準備中。" },
  { en: "Nothing here yet.", ja: "今はなし。" },
  { en: "Taking it easy.", ja: "のんびり進行中。" },
  { en: "All quiet.", ja: "静かに頑張ってます。" },
  { en: "Nothing for now.", ja: "今のところなし。" },
  { en: "Something coming.", ja: "何か作ってます。" },
  { en: "Waiting for news.", ja: "お知らせ待機中。" },
  { en: "In progress.", ja: "準備の真っ最中。" },
  { en: "No news.", ja: "元気です。" },
  { en: "Recharging.", ja: "チャージ中。" },
  { en: "Quiet mode.", ja: "静かに。" },
  { en: "Still brewing.", ja: "まだ煮詰め中。" },
  { en: "On the stove.", ja: "火にかけてます。" },
  { en: "Working on it.", ja: "作業中です。" },
  { en: "Baking something.", ja: "焼いてます。" },
  { en: "In the oven.", ja: "オーブンの中。" },
  { en: "Under construction.", ja: "工事中。" },
  { en: "Still mixing.", ja: "ぐるぐる中。" },
  { en: "Hammering away.", ja: "トントン作ってます。" },
  { en: "Workshop mode.", ja: "工房稼働中。" },
  { en: "Getting warmer.", ja: "だんだん近づいてる。" },
  { en: "Slow and steady.", ja: "ゆっくりコツコツ。" },
  { en: "In the works.", ja: "進行形です。" },
  { en: "Taking shape.", ja: "形になってきた。" },
  { en: "Percolating.", ja: "しみこみ中。" },
  { en: "Marinating.", ja: "漬け込み中。" },
  { en: "Let it rest.", ja: "寝かせてます。" },
];
