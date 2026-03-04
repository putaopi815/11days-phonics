#!/usr/bin/env bash
# 将 public/word-audio/*.aiff 转为 .m4a，便于浏览器播放
# 需在项目根目录执行：bash scripts/word-audio-aiff-to-m4a.sh

set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)"
AUDIO_DIR="$DIR/public/word-audio"
cd "$AUDIO_DIR"

for f in *.aiff; do
  [ -f "$f" ] || continue
  out="${f%.aiff}.m4a"
  if [ -f "$out" ] && [ "$out" -nt "$f" ]; then
    echo "skip (newer): $out"
  else
    echo "convert: $f -> $out"
    afconvert -f m4af -d aac -q 127 "$f" "$out"
  fi
done
echo "done."
