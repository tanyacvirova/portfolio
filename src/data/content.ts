import portfolio from "../../portfolio.json";
import type {
  HomeCardConfig,
  Locale,
  Project,
  ProjectId,
  SiteCopy,
} from "./types";

interface LocaleBundle {
  site: SiteCopy;
  about: { text: string };
  projects: Record<string, Project>;
}

const bundles = portfolio as Record<Locale, LocaleBundle>;

export const homeCards: HomeCardConfig[] = [
  {
    id: "traffic-accident-fatalities",
    slot: "traffic",
    visual: "traffic",
    visualPosition: "bottom",
  },
  {
    id: "c-level-dashboards-slides",
    slot: "dashboards",
    visual: "alluvial",
    visualPosition: "bottom",
  },
  {
    id: "15-minute-city",
    slot: "city",
    visual: "map",
    visualPosition: "bottom",
  },
  {
    id: "social-indicators-data-explorer",
    slot: "social",
    visual: "vector",
    visualPosition: "bottom",
  },
  {
    id: "cost-of-living-calculator",
    slot: "cost",
    visual: "histogram",
    visualPosition: "top",
  },
];

const PROJECT_IDS = new Set(homeCards.map((card) => card.id));

export function getSite(locale: Locale): SiteCopy {
  return bundles[locale].site;
}

export function getAboutParagraphs(locale: Locale): string[] {
  return bundles[locale].about.text
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0 && !paragraph.includes("@"));
}

export function getProjectMeta(locale: Locale, id: ProjectId) {
  return bundles[locale].projects[id].meta;
}

export function getProject(locale: Locale, id: ProjectId): Project {
  return bundles[locale].projects[id];
}

export function isProjectId(value: string): value is ProjectId {
  return PROJECT_IDS.has(value as ProjectId);
}

export function caseMediaUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function caseMediaPaths(): string[] {
  const paths = new Set<string>();

  for (const bundle of Object.values(bundles)) {
    for (const project of Object.values(bundle.projects)) {
      const steps = [
        ...(project.blocks.approach?.steps ?? []),
        ...(project.blocks.process?.steps ?? []),
      ];

      for (const step of steps) {
        for (const image of step.images) {
          paths.add(image.src);
        }
      }
    }
  }

  return [...paths];
}
