# Task: Convert PNGs to WebP

Convert PNG images in `public/` to WebP format using Sharp.

## Settings

- Format: WebP
- Quality: 65
- Effort: 5

## Command

```bash
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = process.argv[1];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
Promise.all(files.map(f =>
  sharp(path.join(dir, f))
    .webp({ quality: 65, effort: 5 })
    .toFile(path.join(dir, f.replace('.png', '.webp')))
    .then(() => console.log('Converted:', f))
)).then(() => console.log('Done'));
" public/
```
