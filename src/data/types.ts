export type Locale = "en" | "ru";
export type Theme = "light" | "dark";

export type ProjectId =
  | "15-minute-city"
  | "social-indicators-data-explorer"
  | "traffic-accident-fatalities"
  | "cost-of-living-calculator"
  | "c-level-dashboards-slides";

export type CardVisual =
  | "traffic"
  | "alluvial"
  | "map"
  | "vector"
  | "histogram";

export type HomeSlot = "traffic" | "dashboards" | "city" | "social" | "cost";

export interface SiteCopy {
  name: string;
  title: string;
  tagline: string;
  email: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption: string;
  type?: string;
}

export interface ProjectStep {
  id: string;
  title: string;
  body: string;
  images: ProjectImage[];
}

export interface ProjectMeta {
  title: string;
  cardDescription: string;
  description: string;
  cardTags: string[];
  client?: string;
  clients?: string[];
  team?: string[];
  role: string;
  years: string;
  stack: string[];
  product?: string;
  links: ProjectLink[];
}

export interface ProjectBlocks {
  problem?: { text: string };
  summary?: { items: string[] };
  beforeAfter?: { before: string; after: string };
  approach?: { steps: ProjectStep[] };
  process?: { steps: ProjectStep[] };
  result?: { text: string };
}

export interface Project {
  meta: ProjectMeta;
  blocks: ProjectBlocks;
}

export interface HomeCardConfig {
  id: ProjectId;
  slot: HomeSlot;
  visual: CardVisual;
  visualPosition: "bottom" | "top";
}
