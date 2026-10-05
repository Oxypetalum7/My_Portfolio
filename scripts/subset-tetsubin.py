"""鉄瓶ゴシックを、BiographyPersonal の Now セクションで使う文字だけに絞った woff2 に変換する。

フォント本体(約6MB)はリポジトリに含めず、配布元(フロップデザイン / BOOTH)から入手した .otf を渡す。
Nowの文章を書き換えて新しい文字が増えたら、このスクリプトを実行し直す。

    pip install fonttools brotli
    python3 scripts/subset-tetsubin.py ~/Downloads/tetsubin-gothic/07鉄瓶ゴシック.otf
"""

import re
import sys
from pathlib import Path

from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent
COMPONENT = ROOT / "src/components/BiographyPersonal.astro"
OUTPUT = ROOT / "src/assets/fonts/tetsubin-gothic/tetsubin-gothic-now.woff2"


def now_section_text() -> str:
    source = COMPONENT.read_text(encoding="utf-8")
    start = source.index('class="section now-paper"')
    end = source.index("</section>", start)
    text = re.sub(r"<[^>]+>", "", source[start:end])
    # 英数字・記号は今後の書き換えに備えて一式入れておく
    return text + "".join(chr(c) for c in range(0x20, 0x7F))


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    options = subset.Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]
    options.name_IDs = ["*"]
    font = subset.load_font(sys.argv[1], options)
    subsetter = subset.Subsetter(options)
    subsetter.populate(text=now_section_text())
    subsetter.subset(font)
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    subset.save_font(font, str(OUTPUT), options)
    print(f"{OUTPUT.relative_to(ROOT)}: {OUTPUT.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
