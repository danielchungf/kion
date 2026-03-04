# Kion

A curated recipe collection for family and friends. View and browse through a collection of curated recipes.

## Features

- 📖 Browse a curated list of recipes
- 🔍 View detailed recipe information including ingredients and instructions
- 🎨 Beautiful, modern UI built with Tailwind CSS
- 📱 Responsive design that works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Project Structure

```
kion/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Recipe list page
│   ├── globals.css         # Global styles
│   └── recipe/
│       └── [id]/
│           └── page.tsx    # Individual recipe page
├── data/
│   └── recipes.ts          # Recipe data
└── public/                 # Static assets
```

## Adding Recipes

To add new recipes, edit the `data/recipes.ts` file and add new recipe objects to the `recipes` array. Each recipe should follow this structure:

```typescript
{
  id: string;
  title: string;
  description: string;
  image?: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}
```

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## Build for Production

```bash
npm run build
npm start
```

## License

Private project for family and friends.

