import cn from "classnames";
import { Outlet, useLocation } from "react-router-dom";
import { useLocale } from "../../context/LocaleContext";
import { formatUpdatedDate } from "../../data/lastUpdated";
import { ui } from "../../data/ui";
import { Header } from "../Header/Header";
import styles from "./Layout.module.css";

export function Layout() {
  const { locale } = useLocale();
  const { pathname } = useLocation();
  const scrollable = pathname.startsWith("/work");

  return (
    <div className={cn(styles.shell, { [styles.shellScroll]: scrollable })}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
      <p className={styles.updated}>
        {ui[locale].lastUpdated(formatUpdatedDate(locale))}
      </p>
    </div>
  );
}
