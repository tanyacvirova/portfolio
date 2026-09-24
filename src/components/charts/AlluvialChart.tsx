import { animated, useTrail } from "@react-spring/web";
import cn from "classnames";
import {
  type SankeyGraph,
  type SankeyLink,
  sankey,
  sankeyLinkHorizontal,
} from "d3-sankey";
import { useMemo } from "react";
import styles from "./charts.module.css";
import { useChartSize } from "./useChartSize";

interface NodeData {
  id: string;
  column: number;
  order: number;
  isMain: boolean;
}

interface LinkData {
  order: number;
  tone: "accent" | "muted";
}

const MAIN_NODE_COUNT = 5;
const BRANCH_COUNTS = [0, 1, 3, 5] as const;

function randomValues(count: number, seed: number) {
  let state = seed;

  return Array.from({ length: count }, () => {
    state = (state * 16_807) % 2_147_483_647;
    return 1.4 + (state / 2_147_483_647) * 2.2;
  });
}

function createGraph(): SankeyGraph<NodeData, LinkData> {
  const nodes: SankeyGraph<NodeData, LinkData>["nodes"] = Array.from(
    { length: MAIN_NODE_COUNT },
    (_, column) => ({
      id: `main-${column}`,
      column,
      order: 0,
      isMain: true,
    }),
  );
  const links: SankeyGraph<NodeData, LinkData>["links"] = [];
  let remaining = 96;
  let animationOrder = 0;

  for (let column = 0; column < MAIN_NODE_COUNT - 1; column += 1) {
    const branchValues = randomValues(
      BRANCH_COUNTS[column],
      1_903 + column * 977,
    );
    const branchTotal = branchValues.reduce((sum, value) => sum + value, 0);
    const nextMainValue = remaining - branchTotal;

    links.push({
      source: `main-${column}`,
      target: `main-${column + 1}`,
      value: nextMainValue,
      order: animationOrder,
      tone: column < 3 ? "accent" : "muted",
    });
    animationOrder += 1;

    branchValues.forEach((value, index) => {
      const id = `branch-${column}-${index}`;
      nodes.push({
        id,
        column: column + 1,
        order: index + 1,
        isMain: false,
      });
      links.push({
        source: `main-${column}`,
        target: id,
        value,
        order: animationOrder,
        tone: "muted",
      });
      animationOrder += 1;
    });

    remaining = nextMainValue;
  }

  return { nodes, links };
}

export function AlluvialChart() {
  const { ref, width, height } = useChartSize();
  const graph = useMemo(() => {
    const layout = sankey<NodeData, LinkData>()
      .nodeId((node) => node.id)
      .nodeAlign((node) => node.column)
      .nodeWidth(2)
      .nodePadding(Math.max(2, height * 0.025))
      .nodeSort((a, b) => a.order - b.order)
      .linkSort((a, b) => a.order - b.order)
      .extent([
        [0, 1],
        [Math.max(1, width), Math.max(2, height - 1)],
      ])
      .iterations(24);

    return layout(createGraph());
  }, [height, width]);
  const orderedLinks = useMemo(
    () => [...graph.links].sort((a, b) => a.order - b.order),
    [graph.links],
  );
  const trails = useTrail(orderedLinks.length, {
    from: { dashOffset: 1, opacity: 0 },
    to: { dashOffset: 0, opacity: 1 },
    delay: 40,
    trail: 35,
    config: { duration: 200 },
  });
  const path = sankeyLinkHorizontal<NodeData, LinkData>();

  return (
    <div ref={ref} className={cn(styles.frame, styles.alluvialFrame)}>
      {width > 0 && height > 0 && (
        <svg
          className={styles.svg}
          viewBox={`0 0 ${width} ${height}`}
          aria-hidden="true"
        >
          {trails.map((trail, index) => {
            const link = orderedLinks[index] as SankeyLink<NodeData, LinkData>;

            return (
              <animated.path
                key={link.index ?? index}
                d={path(link) ?? undefined}
                pathLength={1}
                fill="none"
                stroke={
                  link.tone === "accent"
                    ? "var(--chart-accent)"
                    : "var(--chart-flow)"
                }
                strokeWidth={Math.max(1, link.width ?? 1)}
                strokeDasharray={1}
                strokeDashoffset={trail.dashOffset}
                strokeLinecap="butt"
                opacity={trail.opacity}
              />
            );
          })}
          {graph.nodes
            .filter((node) => node.column > 0)
            .map((node) => (
              <rect
                key={node.id}
                x={node.x0}
                y={node.y0}
                width={Math.max(1.5, (node.x1 ?? 0) - (node.x0 ?? 0))}
                height={Math.max(1, (node.y1 ?? 0) - (node.y0 ?? 0))}
                fill="var(--chart-marker)"
              />
            ))}
        </svg>
      )}
    </div>
  );
}
