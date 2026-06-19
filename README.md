# Yang Zhang - Personal Website

Vite + React + TypeScript. The live site uses the **Bauhaus Geometric** style.
The 10 original style explorations are kept in the repo for reference.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
```

- `/` - the full personal website (Bauhaus Geometric)
- `/#/gallery` - the 10 style explorations
- `/#/v1` ... `/#/v10` - individual style previews (routing uses hashes so it
  works on GitHub Pages without server config)

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # serve the production build locally
```

## Deploy to AndyZYoung.github.io

This is a GitHub Pages user site (served from the repo root, base `/`).

1. Push the contents of this `site/` folder to the root of the
   `AndyZYoung/AndyZYoung.github.io` repository on the `main` branch.
2. In the repo: Settings -> Pages -> Build and deployment -> Source =
   "GitHub Actions".
3. The workflow in `.github/workflows/deploy.yml` builds and deploys on every
   push to `main`.

## Content

All copy, education, courses, projects, and links live in
`src/content/data.ts`. Public assets (resume PDF, model figure, MindSpore
positional-encoding slide, project diagrams) live in `public/`.

## Style versions

| # | Name | Inspiration |
|---|------|-------------|
| 01 | Editorial Noir | Equator |
| 02 | Swiss Grid Quant | Swiss |
| 03 | Industrial Terminal | Industrial |
| 04 | Aurora Mesh | Aurora |
| 05 | Kinetic | heyparker.ai |
| 06 | Serif Portfolio | Isa de Burgh |
| 07 | Organic Warm | Organic |
| 08 | Monochrome Interactive | Killian Herzer |
| 09 | Bauhaus Geometric | Bauhaus |
| 10 | Deep-Space Glass | Fintech |
