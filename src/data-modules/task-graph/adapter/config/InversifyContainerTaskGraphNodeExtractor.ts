import { Container } from 'inversify';

import { TaskGraphNode } from '../../domain/TaskGraphNode';
import { TaskGraphNodeExtractor } from '../../domain/TaskGraphNodeExtractor';

export class InversifyContainerTaskGraphNodeExtractor extends TaskGraphNodeExtractor<
  symbol,
  Container
> {
  protected extractNode(
    source: Container,
    id: symbol,
  ): TaskGraphNode<symbol, unknown> | undefined {
    if (!source.isBound(id)) {
      return undefined;
    }

    return source.get<TaskGraphNode<symbol, unknown>>(id);
  }
}
