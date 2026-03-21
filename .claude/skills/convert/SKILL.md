---
name: convert
description: Find PNG files under public/ingredients and convert them to WebP using cwebp
allowed-tools: [Bash, Glob, Read, Edit]
---

# Task: Convert PNGs to WebP

Find all PNG files in `public/ingredients/` and convert them to optimized WebP format, then add them to the ingredients page.

## Instructions

1. Use Glob to find all `*.png` files under `public/ingredients/`
2. For each PNG, run: `cwebp -q 80 <input.png> -o <output.webp>`
3. After successful conversion, delete the original PNG file
4. Read `lib/ingredients.ts` and add new entries for each converted file:
   - Derive the ingredient name from the filename (e.g. `chicken-breast.png` → `"Chicken Breast"`)
   - Assign the next available numeric `id`
   - Ask the user what `category` to assign (one of: Fruits, Veggies, Protein, Grains, Dairy, Oils, Condiments, Spices)
   - Set `image` to `/ingredients/<filename>.webp`
5. Sort the full `ingredients` array alphabetically by `name`
6. Report which files were converted and added
