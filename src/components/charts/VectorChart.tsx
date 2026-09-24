import { animated, useSpring } from "@react-spring/web";
import styles from "./charts.module.css";

const VECTOR_PATH =
  "M48.5781 13.5469L60.7109 1.41406L83.5859 24.2891L48.5781 59.2969L1.41406 12.1328L12.1328 1.41406L24.2656 13.5469L24.9736 12.8398L36.4219 1.39062L48.5781 13.5469Z";

export function VectorChart() {
  const spring = useSpring({
    from: { dashOffset: 1, opacity: 0 },
    to: { dashOffset: 0, opacity: 1 },
    config: { tension: 110, friction: 24 },
  });

  return (
    <div className={`${styles.frame} ${styles.vectorFrame}`}>
      <svg
        className={styles.svg}
        viewBox="0 0 85 61"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <animated.path
          d={VECTOR_PATH}
          pathLength={1}
          stroke="#92C6EA"
          strokeWidth={2}
          strokeDasharray={1}
          strokeDashoffset={spring.dashOffset}
          strokeLinejoin="miter"
          opacity={spring.opacity}
        />
      </svg>
    </div>
  );
}
