import { Link } from "react-router-dom";
import { useLocale } from "../../context/LocaleContext";
import { getAboutParagraphs, getSite } from "../../data/content";
import { ui } from "../../data/ui";
import styles from "./AboutPage.module.css";

export function AboutPage() {
  const { locale } = useLocale();
  const site = getSite(locale);
  const paragraphs = getAboutParagraphs(locale);

  return (
    <section className={styles.page}>
      <article className={styles.card}>
        <div className={styles.body}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
        <a className={styles.email} href={`mailto:${site.email}`}>
          <span className={styles.mailBox}>
            <span className={styles.mailIcon} />
          </span>
          <span className={styles.emailText}>{site.email}</span>
        </a>
      </article>
      <Link className={styles.close} to="/" aria-label={ui[locale].close} />
    </section>
  );
}
