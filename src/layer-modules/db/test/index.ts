import { CreateEntityTaskGraphNode } from './task-graph/CreateEntityTaskGraphNode';
import { DeleteEntityByIdsTaskGraphNode } from './task-graph/DeleteEntityByIdsTaskGraphNode';
import { mongooseIntegrationDescribe } from './integration/utils/mongooseIntegrationDescribe';

// eslint-disable-next-line @typescript-eslint/typedef
export const dbTest = {
  integration: { utils: { mongooseIntegrationDescribe } },
};

export { CreateEntityTaskGraphNode, DeleteEntityByIdsTaskGraphNode };
