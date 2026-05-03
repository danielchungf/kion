---
name: add-recipe
description: Create a new recipe in content/recipes/ — generates the markdown file with frontmatter, registers any new ingredients in lib/ingredients.ts, and converts any uploaded PNG ingredient images to WebP
allowed-tools: [Bash, Glob, Grep, Read, Edit, Write]
---

# Task: Add a new recipe

Create a recipe markdown file from the user's recipe text, register any missing ingredients, and convert any uploaded ingredient PNGs.

## Inputs

The user provides:
- A recipe title
- An ingredient list
- Preparation steps (numbered or as paragraphs)
- A reference image showing the ingredients laid out left-to-right in the order they should appear in `ingredientImages` (the user always provides this)
- Optionally, PNG ingredient images dropped into `public/ingredients/`

If anything is missing, ask before proceeding — including the ordering reference image.

## Steps

### 1. Determine slug and id

- Slug: kebab-case of the title (e.g. "Big Steak Pepper Rice" → `big-steak-pepper-rice`)
- Recipe id: highest existing `id:` in `content/recipes/*.md` + 1. Find it with:
  `grep -h '^id:' content/recipes/*.md | sort -t'"' -k2 -n | tail -1`

### 2. Reconcile ingredients with lib/ingredients.ts

Read `lib/ingredients.ts`. For every recipe ingredient, find a matching entry by name (case-insensitive, ignore quantity/prep words like "thinly sliced", "1 cup", etc.).

For ingredients **without** a match:
- Check `public/ingredients/` for a related PNG or WebP the user may have uploaded (e.g. user upload `corn.png` covers "1 cup sweet corn").
- If a PNG exists, convert it: `cwebp -q 80 <name>.png -o <name>.webp`, then delete the PNG.
- Add a new entry to `lib/ingredients.ts`:
  - `id`: next unused integer (highest existing + 1, then increment per new ingredient)
  - `name`: human-readable form (Title Case)
  - `category`: one of `Fruits`, `Vegetables`, `Aromatics`, `Proteins`, `Dairy`, `Grains`, `Pantry` — infer from the ingredient; ask the user only if genuinely ambiguous. Aromatics covers alliums (onion, garlic, scallion), fresh herbs, and chilies. Pantry covers stocks, oils, vinegars, sauces, sweeteners, and shelf-stable cans/jars (e.g. San Marzano Tomatoes).
  - `image`: `/ingredients/<filename>.webp` (must match the actual file on disk)
- Insert the entry so the array stays alphabetically sorted by `name`.

If any ingredient has no existing image and no uploaded PNG, list those for the user and ask whether to skip them or wait. Do not invent image paths.

### 3. Write the recipe markdown

Path: `content/recipes/<slug>.md`. Use this exact frontmatter shape (matches existing recipes):

```yaml
---
title: "<Title>"
slug: "<slug>"
id: "<next id>"
category: ""
servings: 0
prepTime: ""
cookTime: ""
ingredientImages:
  - /ingredients/<file>.webp
  ...
---
```

Body:

```markdown
## Ingredients

- <ingredient line 1>
- <ingredient line 2>
...

## Steps

<paragraph 1>

<paragraph 2>
...
```

Notes:
- `ingredientImages` lists every webp that exists for ingredients in this recipe (including ones used only in prep, like butter or oil). **Order must match the user's reference image, left-to-right.** Read the reference image, identify each ingredient, and emit the array in that exact order. Do not reorder by recipe flow or alphabetically.
- Ingredients section uses `- ` bullets with quantities. Use unicode fractions (½, ¾) to match existing recipes.
- Steps are paragraphs separated by blank lines, not numbered. Convert numbered prep steps from the user into prose paragraphs.

### 4. Verify and report

- Confirm no `*.png` files remain in `public/ingredients/`
- Run `git status` to confirm the expected files
- Report: recipe path, new ingredient entries added (name + id + image), any ingredients skipped due to missing images

## Reference recipes

Look at `content/recipes/katsu-curry.md` and `content/recipes/shakshuka.md` for the canonical format.
