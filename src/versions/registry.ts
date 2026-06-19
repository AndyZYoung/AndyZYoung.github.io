import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export type VersionMeta = {
  slug: string
  num: string
  name: string
  tagline: string
  inspiration: string
  swatches: string[]
  component: LazyExoticComponent<ComponentType>
}

export const versions: VersionMeta[] = [
  {
    slug: 'v1',
    num: '01',
    name: 'Editorial Noir',
    tagline: 'Dark editorial storytelling with a scroll counter and serif display.',
    inspiration: 'Equator',
    swatches: ['#14130f', '#f3ede1', '#b5462f'],
    component: lazy(() => import('./V1EditorialNoir')),
  },
  {
    slug: 'v2',
    num: '02',
    name: 'Swiss Grid Quant',
    tagline: 'White, hairline grid, folio numerals, International Orange.',
    inspiration: 'Swiss',
    swatches: ['#f7f7f8', '#111111', '#ff4f00'],
    component: lazy(() => import('./V2SwissGrid')),
  },
  {
    slug: 'v3',
    num: '03',
    name: 'Industrial Terminal',
    tagline: 'Warm-black, monospace, acid-lime signal, decrypt reveals.',
    inspiration: 'Industrial',
    swatches: ['#0b0c0a', '#c6ff4a', '#8a8f85'],
    component: lazy(() => import('./V3IndustrialTerminal')),
  },
  {
    slug: 'v4',
    num: '04',
    name: 'Aurora Mesh',
    tagline: 'Violet to cyan mesh gradient, oversized type, neon glow.',
    inspiration: 'Aurora',
    swatches: ['#0b0420', '#7b2ff7', '#00f0ff'],
    component: lazy(() => import('./V4AuroraMesh')),
  },
  {
    slug: 'v5',
    num: '05',
    name: 'Kinetic',
    tagline: 'Word-by-word scroll reveals and a pinned step narrative.',
    inspiration: 'heyparker.ai',
    swatches: ['#f4f1ea', '#0a0a0a', '#3b2fe0'],
    component: lazy(() => import('./V5Kinetic')),
  },
  {
    slug: 'v6',
    num: '06',
    name: 'Serif Portfolio',
    tagline: 'Bone-cream, elegant serif, horizontal marquees, timeline.',
    inspiration: 'Isa de Burgh',
    swatches: ['#efe9df', '#1a1a18', '#7c6a52'],
    component: lazy(() => import('./V6SerifPortfolio')),
  },
  {
    slug: 'v7',
    num: '07',
    name: 'Organic Warm',
    tagline: 'Earth tones, humanist serif, grain, gentle breathing motion.',
    inspiration: 'Organic',
    swatches: ['#2f3328', '#c66b3d', '#d4b895'],
    component: lazy(() => import('./V7OrganicWarm')),
  },
  {
    slug: 'v8',
    num: '08',
    name: 'Monochrome Interactive',
    tagline: 'Black & white, oversized type, magnetic cursor, hover media.',
    inspiration: 'Killian Herzer',
    swatches: ['#0a0a0a', '#ffffff', '#888888'],
    component: lazy(() => import('./V8Monochrome')),
  },
  {
    slug: 'v9',
    num: '09',
    name: 'Bauhaus Geometric',
    tagline: 'Off-white with primary color-blocks sliding in on scroll.',
    inspiration: 'Bauhaus',
    swatches: ['#f0ead6', '#0033cc', '#e63912'],
    component: lazy(() => import('./V9Bauhaus')),
  },
  {
    slug: 'v10',
    num: '10',
    name: 'Deep-Space Glass',
    tagline: 'Navy gradient, frosted glass cards, starfield, parallax depth.',
    inspiration: 'Fintech',
    swatches: ['#070b1a', '#4f7cff', '#9fb4ff'],
    component: lazy(() => import('./V10DeepSpaceGlass')),
  },
]

export const versionMap = Object.fromEntries(versions.map((v) => [v.slug, v]))
