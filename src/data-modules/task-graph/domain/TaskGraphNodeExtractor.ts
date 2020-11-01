import { TaskGraphNode } from './TaskGraphNode';

export abstract class TaskGraphNodeExtractor<TId, TSource> {
  constructor(
    private readonly source: TSource,
    private readonly nodes: Iterable<TaskGraphNode<TId, unknown>>,
  ) {}

  public extract(): Iterable<TaskGraphNode<TId, unknown>> {
    const nodesExtractedMap: Map<TId, TaskGraphNode<TId, unknown>> = new Map<
      TId,
      TaskGraphNode<TId, unknown>
    >();
    const nodesToExplore: TaskGraphNode<TId, unknown>[] = [...this.nodes];

    for (const node of nodesToExplore) {
      nodesExtractedMap.set(node.id, node);
    }

    this.exploreNodes(nodesExtractedMap, nodesToExplore);

    return nodesExtractedMap.values();
  }

  private exploreNodes(
    nodesExtractedMap: Map<TId, TaskGraphNode<TId, unknown>>,
    nodesToExplore: TaskGraphNode<TId, unknown>[],
  ): void {
    while (nodesToExplore.length > 0) {
      const nodeToExplore: TaskGraphNode<
        TId,
        unknown
      > = nodesToExplore.pop() as TaskGraphNode<TId, unknown>;

      for (const nodeDependency of nodeToExplore.dependsOn) {
        if (!nodesExtractedMap.has(nodeDependency)) {
          const nodeDiscovered:
            | TaskGraphNode<TId, unknown>
            | undefined = this.extractNode(this.source, nodeDependency);

          if (nodeDiscovered === undefined) {
            throw new Error('Expected node to be found');
          } else {
            nodesExtractedMap.set(nodeDependency, nodeDiscovered);
            nodesToExplore.push(nodeDiscovered);
          }
        }
      }
    }
  }

  protected abstract extractNode(
    source: TSource,
    id: TId,
  ): TaskGraphNode<TId, unknown> | undefined;
}
