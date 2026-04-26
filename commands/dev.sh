#!/usr/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR"

refrescador \
  -w "$(pwd)/.." \
  -i "**/dist/libs-compiler.js" \
  -i "**.dist.*" \
  -i "**/dist.*" \
  -i "**/*.dist.*" \
  -e "sh" \
  -e "ts" \
  -e "tsx" \
  -e "js" \
  -e "json" \
  -e "css" \
  -e "html" \
  -x "node $(pwd)/build.js @{refrescador.file}" \
  -x "node $(pwd)/test.js @{refrescador.file}" \