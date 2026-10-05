// Biography(Personal)のRootsで、ページ本体と森の原画(RootsArtwork)が共有する値

// ビルドごとに形・配置が変わらないよう、固定シードの擬似乱数(0〜1)を使う
export const hash = (a: number, b: number) => {
  const v = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

// 月が昇り沈む縦の通り道(森のviewBox上の x)。森の各層はここに木を置かない
export const MOON_LANE_X = 360;

// 画像に焼き付ける原画の層。viewBoxとpreserveAspectRatioは、ページ側で画像を
// 同じ見え方に置くためにも使う。
// band は森の各層で木が描かれている縦の帯(viewBox上の y の範囲)。帯の外は透明なので、
// 焼き付け時にこの帯だけを切り出し、デコード・描画する画素を減らす(ページ側は帯の位置に置き直す)
export const ROOTS_LAYERS = {
  "forest-far": { viewBox: [600, 1300], preserveAspectRatio: "xMaxYMid meet", band: [56, 483] },
  "forest-mid": { viewBox: [600, 1300], preserveAspectRatio: "xMaxYMid meet", band: [440, 914] },
  "forest-near": { viewBox: [600, 1300], preserveAspectRatio: "xMaxYMid meet", band: [846, 1300] },
  "mist-far": { viewBox: [760, 1400], preserveAspectRatio: "none" },
  "mist-mid": { viewBox: [760, 1400], preserveAspectRatio: "none" },
  "sky-mottle": { viewBox: [1600, 1400], preserveAspectRatio: "none" },
  "sky-nebula": { viewBox: [1600, 1400], preserveAspectRatio: "none" },
} as const;

export type RootsLayer = keyof typeof ROOTS_LAYERS;
