import { animated, useSpring } from "@react-spring/web";
import { scaleLinear } from "d3";
import { useMemo } from "react";
import styles from "./charts.module.css";
import { useChartSize } from "./useChartSize";

interface TrafficRow {
  id: string;
  barStart: number;
  barEnd: number;
  tickDark: number;
  tickAccent: number;
}

/** How long one hover replay takes, in milliseconds. */
const ANIMATION_DURATION_MS = 600;

const INITIAL_ROWS: TrafficRow[] = [
  {
    id: "fatal",
    barStart: 37.92,
    barEnd: 64.7,
    tickDark: 46.3,
    tickAccent: 51.31,
  },
  {
    id: "severe",
    barStart: 26.64,
    barEnd: 53.43,
    tickDark: 36.92,
    tickAccent: 40.04,
  },
  {
    id: "moderate",
    barStart: 23.21,
    barEnd: 50,
    tickDark: 26.94,
    tickAccent: 36.61,
  },
  {
    id: "minor",
    barStart: 63.43,
    barEnd: 89.43,
    tickDark: 13.68,
    tickAccent: 76.43,
  },
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createRandomRows(): TrafficRow[] {
  return INITIAL_ROWS.map((row) => {
    const barStart = randomBetween(12, 66);
    const barEnd = Math.min(96, barStart + randomBetween(18, 34));

    return {
      id: row.id,
      barStart,
      barEnd,
      tickDark: randomBetween(8, 92),
      tickAccent: (barStart + barEnd) / 2,
    };
  });
}

function interpolate(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

export function TrafficChart() {
  const { ref, width, height } = useChartSize();
  const targetRows = useMemo(createRandomRows, []);
  const spring = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    config: {
      duration: ANIMATION_DURATION_MS,
      mass: 1,
      tension: 170,
      friction: 26,
    },
  });

  const rowHeight = height / INITIAL_ROWS.length;
  const barHeight = rowHeight * 0.8;
  const barY = rowHeight * 0.1;
  const x = scaleLinear().domain([0, 100]).range([0, width]);

  return (
    <div ref={ref} className={styles.frame}>
      {width > 0 && height > 0 && (
        <svg
          className={styles.svg}
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden="true"
        >
          {INITIAL_ROWS.map((row, index) => {
            const target = targetRows[index];
            const y = index * rowHeight + barY;

            return (
              <g key={row.id}>
                <animated.rect
                  x={spring.t.to((t) =>
                    x(interpolate(row.barStart, target.barStart, t)),
                  )}
                  y={y}
                  width={spring.t.to((t) => {
                    const start = interpolate(row.barStart, target.barStart, t);
                    const end = interpolate(row.barEnd, target.barEnd, t);
                    return x(end) - x(start);
                  })}
                  height={barHeight}
                  fill="var(--chart-fill)"
                />
                <animated.line
                  x1={spring.t.to((t) =>
                    x(interpolate(row.tickDark, target.tickDark, t)),
                  )}
                  x2={spring.t.to((t) =>
                    x(interpolate(row.tickDark, target.tickDark, t)),
                  )}
                  y1={y}
                  y2={y + barHeight}
                  stroke="var(--chart-marker)"
                  strokeWidth={2}
                />
                <animated.line
                  x1={spring.t.to((t) =>
                    x(interpolate(row.tickAccent, target.tickAccent, t)),
                  )}
                  x2={spring.t.to((t) =>
                    x(interpolate(row.tickAccent, target.tickAccent, t)),
                  )}
                  y1={y}
                  y2={y + barHeight}
                  stroke="var(--chart-accent)"
                  strokeWidth={2}
                />
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}
