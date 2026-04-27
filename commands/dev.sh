#!/usr/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$DIR"

refrescador \
  -w "$(pwd)/.." \
  -s "$(pwd)/../dist/app/web" \
  -i "**.dist.*" \
  -i "**/dist.*" \
  -i "**/*.dist.*" \
  -i "$(pwd)/../src/modules/settings.json" \
  -i "$(pwd)/../tsconfig.json" \
  -e "sh" \
  -e "ts" \
  -e "tsx" \
  -e "js" \
  -e "json" \
  -e "css" \
  -e "html" \
  -x "node $(pwd)/build.js @{refrescador.file}" \
  -x "node $(pwd)/test.js @{refrescador.file}" \