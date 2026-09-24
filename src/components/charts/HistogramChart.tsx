import { animated, easings, useSpring } from "@react-spring/web";
import { scaleBand, scaleLinear } from "d3";
import styles from "./charts.module.css";
import { useChartSize } from "./useChartSize";

const KARELIA_DISTRIBUTION = [
  0.015, 0.1, 0.34, 0.66, 0.9, 1, 0.93, 0.95, 0.87, 0.81, 0.75, 0.69, 0.64,
  0.59, 0.54, 0.49, 0.45, 0.41, 0.37, 0.34, 0.31, 0.28, 0.255, 0.23, 0.208,
  0.188, 0.17, 0.153, 0.138, 0.124, 0.112, 0.101, 0.091, 0.082, 0.074, 0.067,
  0.06, 0.054, 0.049, 0.044, 0.04, 0.036, 0.032, 0.029, 0.026, 0.023, 0.021,
  0.019,
];

const KYRGYZSTAN_DISTRIBUTION = [
  0.02, 0.28, 0.72, 1, 0.98, 0.82, 0.67, 0.55, 0.46, 0.38, 0.315, 0.26, 0.215,
  0.178, 0.147, 0.122, 0.101, 0.084, 0.07, 0.058, 0.048, 0.04, 0.033, 0.0275,
  0.023, 0.019, 0.016, 0.0135, 0.0115, 0.0098, 0.0084, 0.0072, 0.0062, 0.0054,
  0.0047, 0.0041, 0.0036, 0.0032, 0.0029, 0.0026, 0.0023, 0.0021, 0.0019,
  0.0017, 0.00155, 0.0014, 0.0013, 0.0012,
];

const DISTRIBUTIONS = [KARELIA_DISTRIBUTION, KYRGYZSTAN_DISTRIBUTION] as const;
const BIN_COUNT = KARELIA_DISTRIBUTION.length;
const BIN_IDS = Array.from(
  { length: BIN_COUNT },
  (_, index) => `income-${index}`,
);
const MAX_VALUE = Math.max(...DISTRIBUTIONS.flat());

interface HistogramChartProps {
  variant: number;
}

export function HistogramChart({ variant }: HistogramChartProps) {
  const { ref, width, height } = useChartSize();
  const targetIndex = variant % DISTRIBUTIONS.length;
  const sourceIndex =
    (targetIndex + DISTRIBUTIONS.length - 1) % DISTRIBUTIONS.length;
  const sourceValues = DISTRIBUTIONS[sourceIndex];
  const targetValues = DISTRIBUTIONS[targetIndex];
  const spring = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    config: {
      duration: 1100,
      easing: easings.easeInOutCubic,
    },
  });

  const x = scaleBand<string>()
    .domain(BIN_IDS)
    .range([0, width])
    .paddingInner(0.12);
  const y = scaleLinear().domain([0, MAX_VALUE]).range([height, 0]);

  return (
    <div ref={ref} className={styles.frame}>
      {width > 0 && height > 0 && (
        <svg
          className={styles.svg}
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden="true"
        >
          {BIN_IDS.map((id, index) => {
            const bandX = x(id) ?? 0;

            return (
              <animated.rect
                key={id}
                x={bandX}
                y={spring.t.to((t) =>
                  y(
                    sourceValues[index] +
                      (targetValues[index] - sourceValues[index]) * t,
                  ),
                )}
                width={x.bandwidth()}
                height={spring.t.to(
                  (t) =>
                    height -
                    y(
                      sourceValues[index] +
                        (targetValues[index] - sourceValues[index]) * t,
                    ),
                )}
                fill={index < 6 ? "var(--chart-accent)" : "var(--chart-flow)"}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
