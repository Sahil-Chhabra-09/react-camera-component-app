# react-camera-component — Demo & Docs Site

> Live demo and documentation site for the [react-camera-component](https://www.npmjs.com/package/react-camera-component) npm package.

**Live URL:** [react-camera-component.vercel.app](https://react-camera-component.vercel.app)

## What's Inside

- **Live Interactive Playground** — Test every prop in real time with a working camera
- **Captured Media Gallery** — Photos and videos you capture appear in a gallery with download
- **Props Reference** — Full table of all 14 props with types, defaults, and descriptions
- **Ref Methods Docs** — All 7 imperative methods explained with signatures
- **Code Examples** — 6 ready-to-copy snippets covering common use cases
- **Browser Compatibility** — Support table for all Web APIs used

## Tech Stack

- **Vite** + **React** + **TypeScript**
- **Vanilla CSS** (custom design system, dark theme)
- **react-camera-component** (the package being demoed)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deploy to Vercel

```bash
npm run build
vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deployments.

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx       ← Fixed nav with links
│   ├── Hero.tsx         ← Landing section with install command
│   ├── LiveDemo.tsx     ← Interactive camera playground
│   ├── PropsTable.tsx   ← All props documented in a table
│   ├── ApiReference.tsx ← Ref methods reference
│   ├── CodeExamples.tsx ← 6 tabbed code snippets
│   ├── BrowserCompat.tsx← Browser support table
│   └── Footer.tsx       ← Footer with links
└── utils/
    └── codeSnippets.ts  ← All code example strings
```
