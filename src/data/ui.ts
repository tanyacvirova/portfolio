import type { Locale } from "./types";

export const ui = {
  en: {
    about: "about",
    close: "Close",
    toggleTheme: "Switch theme",
    language: "Language",
    lastUpdated: (date: string) => `Last updated on ${date}.`,
    product: "product",
    beforeAfter: "before → after",
    link: "link",
    client: "client",
    clients: "clients",
    team: "team",
    role: "role",
    years: "years",
    stack: "stack",
    problem: "Problem",
    summary: "Summary",
    process: "Process",
    approach: "Approach",
    result: "Result",
  },
  ru: {
    about: "о себе",
    close: "Закрыть",
    toggleTheme: "Переключить тему",
    language: "Язык",
    lastUpdated: (date: string) => `Обновлено ${date}.`,
    product: "продукт",
    beforeAfter: "было → стало",
    link: "ссылка",
    client: "клиент",
    clients: "клиенты",
    team: "команда",
    role: "роль",
    years: "годы",
    stack: "стек",
    problem: "Задача",
    summary: "Кратко",
    process: "Процесс",
    approach: "Подход",
    result: "Результат",
  },
} as const satisfies Record<
  Locale,
  {
    about: string;
    close: string;
    toggleTheme: string;
    language: string;
    lastUpdated: (date: string) => string;
    product: string;
    beforeAfter: string;
    link: string;
    client: string;
    clients: string;
    team: string;
    role: string;
    years: string;
    stack: string;
    problem: string;
    summary: string;
    process: string;
    approach: string;
    result: string;
  }
>;
