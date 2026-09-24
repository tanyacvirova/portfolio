import type { CardVisual as CardVisualType } from "../../data/types";
import { AlluvialChart } from "./AlluvialChart";
import { CityMap } from "./CityMap";
import styles from "./charts.module.css";
import { HistogramChart } from "./HistogramChart";
import { TrafficChart } from "./TrafficChart";
import { VectorChart } from "./VectorChart";

interface CardVisualProps {
  type: CardVisualType;
  replayKey: number;
}

export function CardVisual({ type, replayKey }: CardVisualProps) {
  return (
    <div key={replayKey} className={styles.replay}>
      {type === "traffic" && <TrafficChart />}
      {type === "alluvial" && <AlluvialChart />}
      {type === "map" && <CityMap />}
      {type === "vector" && <VectorChart />}
      {type === "histogram" && <HistogramChart variant={replayKey} />}
    </div>
  );
}
