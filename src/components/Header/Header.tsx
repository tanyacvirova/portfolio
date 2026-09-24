import cn from "classnames";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useLocale } from "../../context/LocaleContext";
import { useTheme } from "../../context/ThemeContext";
import { getSite } from "../../data/content";
import type { Locale } from "../../data/types";
import { ui } from "../../data/ui";
import styles from "./Header.module.css";

const LOCALES: Locale[] = ["en", "ru"];

export function Header() {
  const { locale, setLocale } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const copy = ui[locale];
  const site = getSite(locale);
  const showClose = pathname !== "/";

  return (
    <header className={styles.header}>
      <Link className={styles.name} to="/">
        {site.name}
      </Link>
      <div className={styles.actions}>
        <NavLink
          className={({ isActive }) =>
            cn(styles.link, { [styles.linkActive]: isActive })
          }
          to="/about"
        >
          {copy.about}
        </NavLink>
        <button
          className={styles.themeButton}
          type="button"
          onClick={toggleTheme}
          aria-label={copy.toggleTheme}
        >
          <span
            className={cn(styles.themeIcon, {
              [styles.themeMoon]: theme === "light",
              [styles.themeSun]: theme === "dark",
            })}
          />
        </button>
        <fieldset className={styles.langSwitch}>
          <legend className={styles.langLegend}>{copy.language}</legend>
          {LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              className={cn(styles.langOption, {
                [styles.langOptionActive]: locale === code,
              })}
              onClick={() => setLocale(code)}
            >
              {code}
            </button>
          ))}
        </fieldset>
        {showClose ? (
          <Link className={styles.close} to="/" aria-label={copy.close} />
        ) : null}
      </div>
    </header>
  );
}
