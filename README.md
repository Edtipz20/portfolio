# CodeCraft — Developer Portfolio

A pixel-close recreation of the CodeCraft portfolio design, built with:

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **shadcn/ui**-style `Button` component
- **lucide-react** icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Note: `next/font/google` needs internet access to fetch Inter & Sora the
> first time you build/run. If you're on a fully offline machine, swap the
> imports in `src/app/layout.tsx` for `next/font/local` with downloaded font
> files.

## Editing content (today)

Every section reads its copy from JSON "collections" in `src/content/`,
loaded through the typed helpers in `src/lib/content.ts`. Nothing is
hardcoded in the components — edit the JSON and the site updates:

| File | Powers |
|---|---|
| `content/site.json` | Brand, nav links, hero copy, about copy, contact copy, social links, footer |
| `content/stats.json` | The 4 stat cards in the About section |
| `content/skills.json` | The skill bars in the Skills section |
| `content/tech-stack.json` | The tech icon row in the Hero |
| `content/projects.json` | The Featured Projects cards |
| `content/testimonial.json` | The testimonial quote |

Add a new project by adding a new object to `content/projects.json` — no
code changes needed. Project card colors come from the `gradient` field
(a Tailwind gradient class string), and `tag` is the small pill label.

## Plugging in a real CMS later

`src/lib/content.ts` is the single seam between your data source and the
UI. Every component imports from here, never from the JSON files directly.
To connect Sanity, Contentful, Payload, Notion, etc.:

1. Keep the exported function names (`getProjects`, `getSkills`, …) and
   TypeScript interfaces the same.
2. Replace each function body with a `fetch()`/SDK call to your CMS that
   returns data shaped like the matching interface.
3. If your CMS needs data at request time instead of build time, mark the
   relevant Server Components `async` and `await` the content calls (they
   already run on the server in `src/app/page.tsx`).

No component code needs to change — they only care about the shape defined
in `lib/content.ts`, not where the data physically comes from.

## Replacing the placeholder photo

The hero currently uses a placeholder silhouette in
`src/components/hero.tsx` (the `<User />` icon block). Swap that block for
a Next.js `<Image />` pointing at your own photo in `public/`.

## Structure

```
src/
├─ app/
│  ├─ layout.tsx        # Fonts, metadata
│  ├─ page.tsx           # Composes all sections
│  └─ globals.css         # Theme tokens (colors, gradients)
├─ components/
│  ├─ navbar.tsx
│  ├─ hero.tsx
│  ├─ about.tsx
│  ├─ skills-section.tsx
│  ├─ projects-section.tsx
│  ├─ contact-section.tsx
│  ├─ footer.tsx
│  ├─ tech-icon.tsx      # Inline brand icons (HTML5, React, Node, etc.)
│  ├─ social-icon.tsx    # Inline social icons (GitHub, LinkedIn, etc.)
│  └─ ui/button.tsx       # shadcn-style Button
├─ content/*.json          # Editable "CMS" data
└─ lib/
   ├─ content.ts           # Typed content loaders (the CMS seam)
   └─ utils.ts              # `cn()` class helper
```
