#!/usr/bin/env bash
set -euo pipefail

required=(
  "package.json"
  "next.config.mjs"
  "tsconfig.json"
  "tailwind.config.ts"
  "postcss.config.js"
  ".env.example"
  "README.md"
  "src/app"
  "src/components"
  "src/lib"
)

for p in "${required[@]}"; do
  if [ ! -e "$p" ]; then
    echo "MISSING: $p"
    exit 1
  fi
  echo "OK: $p"
done

echo "All required project files/folders exist."
