import { useId } from "react";
import buildings from "../../assets/maps/map-buildings.png";
import districts from "../../assets/maps/map-districts.svg";
import isochrones from "../../assets/maps/map-isochrones.svg";
import roads from "../../assets/maps/map-roads.svg";
import styles from "./charts.module.css";

export function CityMap() {
  const id = useId().replaceAll(":", "");
  const districtMask = `${id}-districts`;
  const roadMask = `${id}-roads`;
  const isochroneMask = `${id}-isochrones`;
  const buildingMask = `${id}-buildings`;

  return (
    <svg
      className={styles.map}
      viewBox="0 0 314 242"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <mask
          id={districtMask}
          x="0"
          y="0"
          width="314"
          height="242"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <image
            href={districts}
            x="-446.537"
            y="-338.281"
            width="937.726"
            height="1015.717"
            preserveAspectRatio="none"
          />
        </mask>
        <mask
          id={roadMask}
          x="0"
          y="0"
          width="314"
          height="242"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <image
            href={roads}
            x="-446.537"
            y="-312.941"
            width="878.033"
            height="921.851"
            preserveAspectRatio="none"
          />
        </mask>
        <mask
          id={isochroneMask}
          x="0"
          y="0"
          width="314"
          height="242"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <image
            href={isochrones}
            x="-193.058"
            y="-148.695"
            width="524.725"
            height="591.215"
            preserveAspectRatio="none"
          />
        </mask>
        <mask
          id={buildingMask}
          x="0"
          y="0"
          width="314"
          height="242"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <image
            href={buildings}
            x="-380.988"
            y="-254.999"
            width="816.97"
            height="816.97"
            preserveAspectRatio="none"
          />
        </mask>
      </defs>

      <g className={`${styles.mapLayer} ${styles.mapDistricts}`}>
        <rect
          width="314"
          height="242"
          fill="var(--map-districts)"
          mask={`url(#${districtMask})`}
        />
      </g>
      <g className={`${styles.mapLayer} ${styles.mapRoads}`}>
        <rect
          width="314"
          height="242"
          fill="var(--map-roads)"
          mask={`url(#${roadMask})`}
        />
      </g>
      <g className={`${styles.mapLayer} ${styles.mapIsochrones}`}>
        <rect
          width="314"
          height="242"
          fill="var(--map-isochrones)"
          mask={`url(#${isochroneMask})`}
        />
      </g>
      <g className={`${styles.mapLayer} ${styles.mapBuildings}`}>
        <rect
          width="314"
          height="242"
          fill="var(--map-buildings)"
          mask={`url(#${buildingMask})`}
        />
      </g>
    </svg>
  );
}
