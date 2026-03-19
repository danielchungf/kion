---
name: convert
description: Find PNG files under public/ingredients and convert them to WebP using cwebp
allowed-tools: [Bash, Glob]
---

# Task: Convert PNGs to WebP

Find all PNG files in `public/ingredients/` and convert them to optimized WebP format.

## Instructions

1. Use Glob to find all `*.png` files under `public/ingredients/`
2. For each PNG, run: `cwebp -q 80 <input.png> -o <output.webp>`
3. After successful conversion, delete the original PNG file
4. Report which files were converted
