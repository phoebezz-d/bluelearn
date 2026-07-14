import { useCallback, useMemo } from "react";
import { Background, Controls, MarkerType, ReactFlow } from "@xyflow/react";
import { GuideNode } from "./GuideNode";
import type { Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  guideNode: GuideNode,
};

type WalkthroughNode = {
  slug: string;
  title: string;
  summary: string;
  level: number;
};

type GuideGraphProps = {
  walkthroughNodes: Array<WalkthroughNode>;
  curatedSequence: Array<string>;
  targetSlug: string;
  onToggleGuide: (slug: string, isChecked: boolean) => void;
  guidesMap: Map<string, any>;
  hoveredGuide: string | null;
};

export function GuideGraph({
  walkthroughNodes,
  curatedSequence,
  targetSlug,
  onToggleGuide,
  guidesMap,
  hoveredGuide,
}: GuideGraphProps) {
  const { nodes, edges } = useMemo(() => {
    // Group by level to calculate horizontal/vertical positions
    const grouped = walkthroughNodes.reduce(
      (acc, node) => {
        const list = acc[node.level] ?? [];
        list.push(node);
        acc[node.level] = list;
        return acc;
      },
      {} as Record<number, Array<WalkthroughNode> | undefined>
    );

    const levels = Object.keys(grouped)
      .map(Number)
      .sort((a, b) => a - b);

    const newNodes: Array<Node> = [];

    levels.forEach((level, levelIdx) => {
      const nodesInLevel = grouped[level];
      if (!nodesInLevel) return;
      const levelY = -(levelIdx * 250); // Vertical spacing, flowing upwards

      const totalWidth = nodesInLevel.length * 250; // approx width per node + gap
      const startX = -totalWidth / 2;

      nodesInLevel.forEach((node, nodeIdx) => {
        const isTarget = node.slug === targetSlug;
        const isChecked = isTarget || curatedSequence.includes(node.slug);
        const selectedOrder = curatedSequence.indexOf(node.slug);

        newNodes.push({
          id: node.slug,
          type: "guideNode",
          position: { x: startX + nodeIdx * 250 + 125, y: levelY },
          data: {
            title: node.title,
            isTarget,
            isChecked,
            selectedOrder: selectedOrder !== -1 ? selectedOrder + 1 : null,
            isHovered: node.slug === hoveredGuide,
          },
        });
      });
    });

    // Build edges
    const newEdges: Array<Edge> = [];
    walkthroughNodes.forEach((node) => {
      const guide = guidesMap.get(node.slug);
      if (guide && guide.prerequisites) {
        guide.prerequisites.forEach((prereqSlug: string) => {
          if (walkthroughNodes.some((n) => n.slug === prereqSlug)) {
            newEdges.push({
              id: `e-${prereqSlug}-${node.slug}`,
              source: prereqSlug,
              target: node.slug,
              type: "smoothstep",
              style: { stroke: "#94a3b8", strokeWidth: 2 },
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: "#94a3b8",
              },
            });
          }
        });
      }
    });

    return { nodes: newNodes, edges: newEdges };
  }, [walkthroughNodes, curatedSequence, targetSlug, guidesMap, hoveredGuide]);

  const onNodeClick = useCallback(
    (_: any, node: Node) => {
      if (node.id === targetSlug) return;
      const isCurrentlyChecked = curatedSequence.includes(node.id);
      onToggleGuide(node.id, !isCurrentlyChecked);
    },
    [curatedSequence, targetSlug, onToggleGuide]
  );

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        key={targetSlug}
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        minZoom={0.2}
        maxZoom={1.5}
      >
        <Background
          color="hsl(var(--muted-foreground) / 0.2)"
          gap={24}
          size={2}
        />
        <Controls className="overflow-hidden rounded-xl !border-border !bg-background !shadow-md [&>button]:!border-b-border [&>button]:!text-foreground hover:[&>button]:!bg-muted" />
      </ReactFlow>
    </div>
  );
}
