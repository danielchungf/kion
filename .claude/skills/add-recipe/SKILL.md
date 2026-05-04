---
name: add-recipe
description: Create a new recipe in content/recipes/ — generates the markdown file with bilingual frontmatter and body (EN + ES), registers any new ingredients in lib/ingredients.ts, and converts any uploaded PNG ingredient images to WebP
allowed-tools: [Bash, Glob, Grep, Read, Edit, Write]
---

# Task: Add a new recipe

Create a recipe markdown file from the user's recipe text, register any missing ingredients, convert any uploaded ingredient PNGs, and produce a translation in the other language.

## Inputs

The user provides:
- A recipe title (in either English or Spanish — keep it as given; titles do not get translated)
- An ingredient list (in either English or Spanish)
- Preparation steps (numbered or as paragraphs, in the same language as the ingredients)
- A reference image showing the ingredients laid out left-to-right in the order they should appear in `ingredientImages` (the user always provides this)
- Optionally, PNG ingredient images dropped into `public/ingredients/`

If anything is missing, ask before proceeding — including the ordering reference image.

## Steps

### 1. Determine slug, id, and original language

- Slug: kebab-case of the title (e.g. "Big Steak Pepper Rice" → `big-steak-pepper-rice`, "Pollo Asado de la Abuelita" → `pollo-asado-de-la-abuelita`). The slug stays in the original language.
- Recipe id: highest existing `id:` in `content/recipes/*.md` + 1. Find it with:
  `grep -h '^id:' content/recipes/*.md | sort -t'"' -k2 -n | tail -1`
- Original language: detect from the user's text. If ambiguous, ask. Use `"en"` or `"es"` exactly.

### 2. Reconcile ingredients with lib/ingredients.ts

Read `lib/ingredients.ts`. For every recipe ingredient, find a matching entry by name (case-insensitive, ignore quantity/prep words like "thinly sliced", "1 cup", etc.). Match across languages — e.g. "cebolla amarilla" maps to the existing "Yellow Onion" entry.

For ingredients **without** a match:
- Check `public/ingredients/` for a related PNG or WebP the user may have uploaded (e.g. user upload `corn.png` covers "1 cup sweet corn" or "1 taza de maíz").
- If a PNG exists, convert it: `cwebp -q 80 <name>.png -o <name>.webp`, then delete the PNG.
- Add a new entry to `lib/ingredients.ts`:
  - `id`: next unused integer (highest existing + 1, then increment per new ingredient)
  - `name`: human-readable form in English, Title Case (the ingredients library is English-only)
  - `category`: one of `Fruits`, `Vegetables`, `Aromatics`, `Proteins`, `Dairy`, `Grains`, `Pantry` — infer from the ingredient; ask the user only if genuinely ambiguous. Aromatics covers alliums (onion, garlic, scallion), fresh herbs, and chilies. Pantry covers stocks, oils, vinegars, sauces, sweeteners, and shelf-stable cans/jars (e.g. San Marzano Tomatoes).
  - `image`: `/ingredients/<filename>.webp` (must match the actual file on disk)
- Insert the entry so the array stays alphabetically sorted by `name`.

If any ingredient has no existing image and no uploaded PNG, list those for the user and ask whether to skip them or wait. Do not invent image paths.

### 3. Translate the recipe

The user's recipe text is the **source of truth in the original language** — keep it exactly as provided, do not paraphrase it. Then produce a translation in the other language yourself:

- Translate every ingredient line, including quantities (convert units idiomatically: "tablespoons" ↔ "cucharadas", "lb" ↔ "g/kg" only when natural — keep familiar units when reasonable).
- Translate every step paragraph. Preserve paragraph breaks 1:1 — each source paragraph maps to one translated paragraph.
- Keep proper nouns and brand names as-is (e.g. "San Marzano", "Golden Curry", "Worcestershire", "Ajinomoto", "ají panca", "queso fresco", "loche").
- Title is **not** translated. The recipe page renders the same title regardless of selected language.

### 4. Write the recipe markdown

Path: `content/recipes/<slug>.md`. Use this exact frontmatter shape:

```yaml
---
title: "<Title in original language>"
slug: "<slug>"
id: "<next id>"
category: ""
servings: 0
prepTime: ""
cookTime: ""
author: "<author-id>"
originalLanguage: "<en|es>"
ingredientImages:
  - /ingredients/<file>.webp
  ...
---
```

Body — include all four language-tagged sections. Order: original language first, then translated language.

```markdown
## Ingredients (<original lang>)

- <line 1 in original lang>
- <line 2 in original lang>
...

## Ingredients (<other lang>)

- <line 1 translated>
- <line 2 translated>
...

## Steps (<original lang>)

<paragraph 1 in original lang>

<paragraph 2 in original lang>
...

## Steps (<other lang>)

<paragraph 1 translated>

<paragraph 2 translated>
...
```

Notes:
- Section heading language tag is lowercase: `(en)` or `(es)`.
- `ingredientImages` lists every webp that exists for ingredients in this recipe (including ones used only in prep, like butter or oil). **Order must match the user's reference image, left-to-right.** Read the reference image, identify each ingredient, and emit the array in that exact order. Do not reorder by recipe flow or alphabetically.
- Ingredients sections use `- ` bullets with quantities. Use unicode fractions (½, ¾) to match existing recipes.
- Steps are paragraphs separated by blank lines, not numbered. Convert numbered prep steps from the user into prose paragraphs.

### 5. Verify and report

- Confirm no `*.png` files remain in `public/ingredients/`
- Run `git status` to confirm the expected files
- Report: recipe path, originalLanguage, new ingredient entries added (name + id + image), any ingredients skipped due to missing images

## Reference recipes

Look at `content/recipes/katsu-curry.md` (originalLanguage `en`) and `content/recipes/shakshuka.md` (originalLanguage `es`) for the canonical bilingual format.
