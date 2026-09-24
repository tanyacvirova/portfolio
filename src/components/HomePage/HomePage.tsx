import cn from "classnames";
import { useLocale } from "../../context/LocaleContext";
import { getSite, homeCards } from "../../data/content";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import styles from "./HomePage.module.css";

const SLOT_CLASS = {
  traffic: styles.traffic,
  dashboards: styles.dashboards,
  city: styles.city,
  social: styles.social,
  cost: styles.cost,
} as const;

export function HomePage() {
  const { locale } = useLocale();
  const site = getSite(locale);

  return (
    <div className={styles.mosaic}>
      <section className={styles.intro}>
        <div className={styles.introCopy}>
          <p className={styles.name}>{site.name}</p>
          <h1 className={styles.role}>{site.title}</h1>
          <p className={styles.tagline}>{site.tagline}</p>
        </div>
        <a className={styles.email} href={`mailto:${site.email}`}>
          <span className={styles.mailBox}>
            <span className={styles.mailIcon} />
          </span>
          <span className={styles.emailText}>{site.email}</span>
        </a>
      </section>
      {homeCards.map((card) => (
        <div key={card.id} className={cn(styles.slot, SLOT_CLASS[card.slot])}>
          <ProjectCard config={card} locale={locale} />
        </div>
      ))}
    </div>
  );
}
