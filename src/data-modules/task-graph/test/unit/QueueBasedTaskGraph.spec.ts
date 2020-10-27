/* eslint-disable @typescript-eslint/unbound-method */
import { TaskGraphNode, TaskGraphNodeStatus } from '../../domain/TaskGraphNode';
import { PerformTasksResult } from '../../domain/TaskGraph';
import { QueueBasedTaskGraph } from '../../domain/QueueBasedTaskGraph';
import { Writable } from '../../../../common/domain';

describe(QueueBasedTaskGraph.name, () => {
  describe('.getNode()', () => {
    describe('when called, with an existing node', () => {
      let nodeFixture: TaskGraphNode<number, number>;
      let result: unknown;

      beforeAll(() => {
        nodeFixture = {
          dependsOn: [],
          getOutput: () => {
            return { elem: 3 };
          },
          getStatus: () => TaskGraphNodeStatus.Ended,
          id: 2,
          perform: async () => undefined,
        };

        const queueBasedTaskGraph: QueueBasedTaskGraph<number> = new QueueBasedTaskGraph(
          [nodeFixture],
        );

        result = queueBasedTaskGraph.getNode(nodeFixture.id);
      });

      it('must return the expected node', () => {
        expect(result).toBe(nodeFixture);
      });
    });

    describe('when called, with a non existing node', () => {
      let result: unknown;

      beforeAll(() => {
        const queueBasedTaskGraph: QueueBasedTaskGraph<number> = new QueueBasedTaskGraph(
          [],
        );

        const unexistentNodeId: number = 3;

        result = queueBasedTaskGraph.getNode(unexistentNodeId);
      });

      it('must return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('.performTasks()', () => {
    describe('when called, and no task is included', () => {
      let result: unknown;

      beforeAll(async () => {
        const queueBasedTaskGraph: QueueBasedTaskGraph<number> = new QueueBasedTaskGraph(
          [],
        );

        result = await queueBasedTaskGraph.performTasks();
      });

      it('must return a success', () => {
        const expectedResult: PerformTasksResult = {
          success: true,
        };

        expect(result).toStrictEqual(expectedResult);
      });
    });

    describe('when called, and a task is included', () => {
      let taskGraphNodeDependencies: number[];
      let taskGraphNode: TaskGraphNode<number, number>;
      let queueBasedTaskGraph: QueueBasedTaskGraph<number>;

      beforeAll(() => {
        taskGraphNode = {
          dependsOn: taskGraphNodeDependencies,
          getOutput: jest.fn(),
          getStatus: jest.fn(),
          id: 2,
          perform: jest.fn(),
        };

        queueBasedTaskGraph = new QueueBasedTaskGraph([taskGraphNode]);
      });

      describe('when the task has dependencies', () => {
        let result: unknown;

        beforeAll(async () => {
          (taskGraphNode as Writable<
            TaskGraphNode<number, number>
          >).dependsOn = [taskGraphNode.id];

          try {
            result = await queueBasedTaskGraph.performTasks();
          } catch (err) {
            result = err;
          }
        });

        it('must not call taskGraphNode.perform()', () => {
          expect(taskGraphNode.perform).toHaveBeenCalledTimes(0);
        });

        it('must throw an error', () => {
          expect(result).toBeInstanceOf(Error);
          expect((result as Error).message).toMatch('circular dependencies');
        });

        afterAll(() => {
          (taskGraphNode as Writable<
            TaskGraphNode<number, number>
          >).dependsOn = [];

          (taskGraphNode.perform as jest.Mock).mockClear();
        });
      });

      describe('when the task has no dependencies', () => {
        let result: unknown;

        beforeAll(async () => {
          (taskGraphNode as Writable<
            TaskGraphNode<number, number>
          >).dependsOn = [];

          result = await queueBasedTaskGraph.performTasks();
        });

        it('must call taskGraphNode.perform()', () => {
          expect(taskGraphNode.perform).toHaveBeenCalledTimes(1);
        });

        it('must return a success', () => {
          const expectedResult: PerformTasksResult = { success: true };

          expect(result).toStrictEqual(expectedResult);
        });

        afterAll(() => {
          (taskGraphNode as Writable<
            TaskGraphNode<number, number>
          >).dependsOn = [];

          (taskGraphNode.perform as jest.Mock).mockClear();
        });
      });
    });

    describe('when called, and both a task and a dependent one are included', () => {
      let result: unknown;
      let taskGraphNode: TaskGraphNode<number, number>;
      let taskGraphNodeDependent: TaskGraphNode<number, number>;
      let queueBasedTaskGraph: QueueBasedTaskGraph<number>;

      beforeAll(async () => {
        taskGraphNode = {
          dependsOn: [],
          getOutput: jest.fn(),
          getStatus: jest.fn(),
          id: 2,
          perform: jest.fn(),
        };

        taskGraphNodeDependent = {
          dependsOn: [taskGraphNode.id],
          getOutput: jest.fn(),
          getStatus: jest.fn(),
          id: 3,
          perform: jest.fn(),
        };

        queueBasedTaskGraph = new QueueBasedTaskGraph([
          taskGraphNode,
          taskGraphNodeDependent,
        ]);

        result = await queueBasedTaskGraph.performTasks();
      });

      it('must call taskGraphNode.perform', () => {
        expect(taskGraphNode.perform).toHaveBeenCalledTimes(1);
      });

      it('must call taskGraphNodeDependent.perform', () => {
        expect(taskGraphNodeDependent.perform).toHaveBeenCalledTimes(1);
      });

      it('must call taskGraphNode.perform before taskGraphNodeDependent.perform', () => {
        const taskGraphNodePerformOrder: number = (taskGraphNode.perform as jest.Mock)
          .mock.invocationCallOrder[0];
        const taskGraphNodeDependentPerformOrder: number = (taskGraphNodeDependent.perform as jest.Mock)
          .mock.invocationCallOrder[0];
        expect(taskGraphNodePerformOrder).toBeLessThan(
          taskGraphNodeDependentPerformOrder,
        );
      });

      it('must return a success', () => {
        const expectedResult: PerformTasksResult = { success: true };

        expect(result).toStrictEqual(expectedResult);
      });
    });
  });
});
