import cn from "classnames";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useLocale } from "../../context/LocaleContext";
import { caseMediaUrl, getProject, isProjectId } from "../../data/content";
import type { ProjectImage } from "../../data/types";
import { ui } from "../../data/ui";
import styles from "./CasePage.module.css";

function outIconClass(url: string) {
  try {
    const host = new URL(url).hostname;

    if (host.endsWith("tochno.st")) {
      return styles.outIconTbp;
    }

    if (host.endsWith("compass.2gis.ru")) {
      return styles.outIconCompass;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

function CaseMedia({ image }: { image: ProjectImage }) {
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return null;
  }

  return (
    <figure className={styles.figure}>
      {image.type === "video" ? (
        <video
          className={styles.media}
          src={caseMediaUrl(image.src)}
          controls
          onError={() => setHidden(true)}
        >
          <track kind="captions" />
        </video>
      ) : (
        <img
          className={styles.media}
          src={caseMediaUrl(image.src)}
          alt={image.alt}
          onError={() => setHidden(true)}
        />
      )}
      {image.caption ? (
        <figcaption className={styles.caption}>{image.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function CasePage() {
  const { projectId } = useParams();
  const { locale } = useLocale();

  if (!projectId || !isProjectId(projectId)) {
    return <Navigate to="/" replace />;
  }

  const project = getProject(locale, projectId);
  const copy = ui[locale];
  const { meta, blocks } = project;
  const steps = blocks.approach?.steps ?? blocks.process?.steps ?? [];
  const stepLabel = blocks.approach ? copy.approach : copy.process;

  return (
    <article className={styles.page}>
      <aside className={styles.sidebar}>
        <div>
          <h1 className={styles.title}>{meta.title}</h1>
          <p className={styles.lede}>{meta.description}</p>
        </div>
        {meta.product ? (
          <div className={styles.field}>
            <p className={styles.label}>{copy.product}</p>
            <p className={styles.value}>{meta.product}</p>
          </div>
        ) : null}
        {blocks.beforeAfter ? (
          <div className={styles.field}>
            <p className={styles.label}>{copy.beforeAfter}</p>
            <p className={styles.value}>
              {blocks.beforeAfter.before} → {blocks.beforeAfter.after}
            </p>
          </div>
        ) : null}
        {meta.links.length > 0 ? (
          <div className={styles.field}>
            <p className={styles.label}>{copy.link}</p>
            <div className={styles.links}>
              {meta.links.map((item) => (
                <a
                  key={item.url}
                  className={styles.outLink}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span
                    className={cn(styles.outIcon, outIconClass(item.url))}
                  />
                  <span className={styles.outLabel}>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
        {meta.clients && meta.clients.length > 0 ? (
          <div className={styles.field}>
            <p className={styles.label}>{copy.clients}</p>
            <ul className={styles.list}>
              {meta.clients.map((client) => (
                <li key={client} className={styles.listItem}>
                  {client}
                </li>
              ))}
            </ul>
          </div>
        ) : meta.client ? (
          <div className={styles.field}>
            <p className={styles.label}>{copy.client}</p>
            <p className={styles.value}>{meta.client}</p>
          </div>
        ) : null}
        {meta.team ? (
          <div className={styles.field}>
            <p className={styles.label}>{copy.team}</p>
            <p className={styles.value}>{meta.team.join(", ")}</p>
          </div>
        ) : null}
        <div className={styles.field}>
          <p className={styles.label}>{copy.role}</p>
          <p className={styles.value}>{meta.role}</p>
        </div>
        <div className={styles.field}>
          <p className={styles.label}>{copy.years}</p>
          <p className={styles.value}>{meta.years}</p>
        </div>
        <div className={styles.field}>
          <p className={styles.label}>{copy.stack}</p>
          <p className={styles.value}>{meta.stack.join(", ")}</p>
        </div>
      </aside>
      <div className={styles.story}>
        {blocks.problem ? (
          <section>
            <h2 className={styles.sectionTitle}>{copy.problem}</h2>
            <p className={styles.value}>{blocks.problem.text}</p>
          </section>
        ) : null}
        {blocks.summary ? (
          <section>
            <h2 className={styles.sectionTitle}>{copy.summary}</h2>
            <ul className={styles.list}>
              {blocks.summary.items.map((item) => (
                <li key={item} className={styles.listItem}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        {steps.length > 0 ? (
          <section className={styles.steps}>
            <h2 className={styles.sectionTitle}>{stepLabel}</h2>
            {steps.map((step) => (
              <div key={step.id}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.value}>{step.body}</p>
                {step.images.map((image) => (
                  <CaseMedia key={image.src} image={image} />
                ))}
              </div>
            ))}
          </section>
        ) : null}
        {blocks.result ? (
          <section>
            <h2 className={styles.sectionTitle}>{copy.result}</h2>
            <p className={styles.value}>{blocks.result.text}</p>
          </section>
        ) : null}
      </div>
      <Link className={styles.close} to="/" aria-label={copy.close} />
    </article>
  );
}
