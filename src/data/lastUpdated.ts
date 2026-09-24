import type { Locale } from "./types";

const DATE_LOCALES: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
};

function parseUpdatedDate(): Date {
  const raw = import.meta.env.VITE_LAST_UPDATED;
  const parsed = raw ? new Date(raw) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
}

const updatedAt = parseUpdatedDate();

export function formatUpdatedDate(locale: Locale): string {
  const formatted = new Intl.DateTimeFormat(DATE_LOCALES[locale], {
    month: locale === "ru" ? "long" : "short",
    day: "numeric",
    year: "numeric",
  }).format(updatedAt);

  return locale === "en"
    ? formatted.replace(",", "")
    : formatted.replace(/\sг\.?$/, "");
}
