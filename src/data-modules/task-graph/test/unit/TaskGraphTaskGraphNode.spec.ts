import 'reflect-metadata';

import { PerformTasksResult, TaskGraph } from '../../domain/TaskGraph';
import { TaskGraphTaskGraphNode } from '../../domain/TaskGraphTaskGraphNode';

describe(TaskGraphTaskGraphNode.name, () => {
  describe('.innerPerform()', () => {
    describe('when called, and the graph tasks are performed successfully', () => {
      let graph: TaskGraph<string>;

      let taskGraphTaskGraphNode: TaskGraphTaskGraphNode<string>;

      beforeAll(async () => {
        const resultFixture: PerformTasksResult = { success: true };

        graph = {
          getNode: jest.fn(),
          performTasks: jest.fn().mockResolvedValueOnce(resultFixture),
        };

        taskGraphTaskGraphNode = new TaskGraphTaskGraphNode(
          graph,
          [],
          'sample-id',
        );

        await taskGraphTaskGraphNode.perform();
      });

      it('the node output must be undefined', () => {
        expect(taskGraphTaskGraphNode.getOutput()).toBeUndefined();
      });
    });

    describe('when called, and the graph tasks are not performed successfully', () => {
      let graph: TaskGraph<string>;

      let taskGraphTaskGraphNode: TaskGraphTaskGraphNode<string>;

      beforeAll(async () => {
        const resultFixture: PerformTasksResult = {
          error: 'sample error message',
          success: false,
        };

        graph = {
          getNode: jest.fn(),
          performTasks: jest.fn().mockRejectedValueOnce(resultFixture),
        };

        taskGraphTaskGraphNode = new TaskGraphTaskGraphNode(
          graph,
          [],
          'sample-id',
        );

        await taskGraphTaskGraphNode.perform();
      });

      it('the node output must throw an error', () => {
        expect(taskGraphTaskGraphNode.getOutput).toThrow();
      });
    });
  });
});
