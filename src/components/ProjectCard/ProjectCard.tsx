import cn from "classnames";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getProjectMeta } from "../../data/content";
import type { HomeCardConfig, Locale } from "../../data/types";
import { CardVisual } from "../charts/CardVisual";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  config: HomeCardConfig;
  locale: Locale;
}

export function ProjectCard({ config, locale }: ProjectCardProps) {
  const meta = getProjectMeta(locale, config.id);
  const compact = config.slot === "social" || config.slot === "cost";
  const [replayKey, setReplayKey] = useState(0);

  return (
    <Link
      className={styles.cardLink}
      to={`/work/${config.id}`}
      onMouseEnter={() => setReplayKey((current) => current + 1)}
    >
      <article
        className={cn(styles.card, {
          [styles.cardGap8]: config.slot === "traffic",
          [styles.cardGap4]: compact,
          [styles.cardSpread]:
            config.slot === "dashboards" || config.slot === "city",
        })}
      >
        {config.visualPosition === "top" && (
          <div className={styles.visual}>
            <CardVisual type={config.visual} replayKey={replayKey} />
          </div>
        )}
        <div className={styles.copy}>
          <div className={styles.titleRow}>
            <h2 className={styles.title}>{meta.title}</h2>
          </div>
          <p className={styles.description}>{meta.cardDescription}</p>
        </div>
        {config.visualPosition === "bottom" && (
          <div
            className={cn(styles.visual, {
              [styles.visualBottom]: config.slot === "dashboards",
            })}
          >
            <CardVisual type={config.visual} replayKey={replayKey} />
          </div>
        )}
        <p className={styles.tags}>
          {meta.cardTags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </p>
      </article>
    </Link>
  );
}
