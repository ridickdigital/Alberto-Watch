# How we work

Simple rules so 5 people can build one site without conflicts.

## The golden rule

**One page = one owner = one branch.** You only edit `src/pages/<YourPage>.jsx` and `src/pages/<YourPage>.css`.

Everything else (`src/components`, `src/lib`, `src/styles`, `App.jsx`, `routes.js`, `public/data`, `package.json`) is **shared**. If you need a change there, such as a new data field, a new shared class or a fix in a component, open an issue or ask the lead. Don't change it on your page branch.

## Workflow

```bash
# 1. start from the latest main
git checkout main
git pull

# 2. create your branch (name from docs/TASKS.md)
git checkout -b feature/gallery

# 3. work, then format + build
npm run format
npm run build

# 4. commit small, clear steps
git add src/pages/Gallery.jsx src/pages/Gallery.css
git commit -m "gallery: add lightbox with keyboard arrows"

# 5. push and open a Pull Request into main on GitHub
git push -u origin feature/gallery
```

Keep your branch fresh while you work, at least daily:

```bash
git checkout main && git pull
git checkout feature/gallery && git merge main
```

## Commit messages

`<page>: <what changed>`, in the present tense and short:

- `products: filter watches by line-up`
- `contact: validate email and phone`
- `prices: mobile card layout`

## Pull requests

- Fill in the PR template checklist (dark + light, 4 widths, no console errors).
- GitHub runs **Build** automatically (format check + build). It must be green.
- The lead reviews and merges. Don't merge your own PR.
- One page per PR. Smaller PRs get merged faster.

## Code style

- Prettier formats everything (`npm run format`; VS Code formats on save with the recommended extension).
- Function components and hooks only. No class components.
- Read text from `public/data/*.json` with `useData()`. Don't type copy into the JSX.
- Colours, fonts and spacing come from `src/styles/tokens.css` variables.
- Prefix your CSS classes with your page name (`.gallery__grid`, `.store-card`) so they never clash with other pages.
- Images: `asset(path)`, a real `alt` text, and `loading="lazy"` below the fold.
- Accessibility: buttons are `<button>`, links are `<a>`, everything works with the keyboard.

## Need help?

Ask in the team chat with your branch name and a screenshot of the error. Then check the README troubleshooting table.
