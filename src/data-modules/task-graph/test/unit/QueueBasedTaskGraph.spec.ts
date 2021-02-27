import { Writable } from '../../../../common/domain';
import { QueueBasedTaskGraph } from '../../domain/QueueBasedTaskGraph';
import { PerformTasksResult } from '../../domain/TaskGraph';
import { TaskGraphNode, TaskGraphNodeStatus } from '../../domain/TaskGraphNode';

describe(QueueBasedTaskGraph.name, () => {
  describe('.getNode()', () => {
    describe('when called, with an existing node', () => {
      let nodeFixture: TaskGraphNode<number, number>;
      let result: unknown;

      beforeAll(() => {
        nodeFixture = {
          dependsOn: [],
          getOutput: () => 3,
          status: TaskGraphNodeStatus.NotStarted,
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
          status: TaskGraphNodeStatus.NotStarted,
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

        it('must return a failure', () => {
          const expectedResult: PerformTasksResult = {
            error: expect.stringContaining('circular dependencies') as string,
            success: false,
          };
          expect(result).toStrictEqual(expectedResult);
        });

        afterAll(() => {
          (taskGraphNode as Writable<
            TaskGraphNode<number, number>
          >).dependsOn = [];

          (taskGraphNode.perform as jest.Mock).mockClear();
        });
      });

      describe('when the task has no dependencies', () => {
        describe('when the task ends sucessfully', () => {
          describe.each([
            [TaskGraphNodeStatus.NotStarted],
            [TaskGraphNodeStatus.InProgress],
            [TaskGraphNodeStatus.Ended],
          ])('when the task is %s', (status: TaskGraphNodeStatus) => {
            let result: unknown;

            beforeAll(async () => {
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).dependsOn = [];
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).status = status;
              (taskGraphNode.perform as jest.Mock).mockImplementationOnce(
                async () => {
                  (taskGraphNode as Writable<
                    TaskGraphNode<number, number>
                  >).status = TaskGraphNodeStatus.Ended;
                },
              );

              result = await queueBasedTaskGraph.performTasks();
            });

            afterAll(() => {
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).dependsOn = [];
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).status = TaskGraphNodeStatus.NotStarted;

              (taskGraphNode.perform as jest.Mock).mockClear();
            });

            it('must call taskGraphNode.perform()', () => {
              expect(taskGraphNode.perform).toHaveBeenCalledTimes(1);
            });

            it('must return a success', () => {
              const expectedResult: PerformTasksResult = { success: true };

              expect(result).toStrictEqual(expectedResult);
            });
          });
        });

        describe('when the task ends on error', () => {
          describe.each([
            [TaskGraphNodeStatus.NotStarted],
            [TaskGraphNodeStatus.InProgress],
            [TaskGraphNodeStatus.Error],
          ])('when the task is %s', (status: TaskGraphNodeStatus) => {
            let result: unknown;

            beforeAll(async () => {
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).dependsOn = [];
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).status = status;
              (taskGraphNode.perform as jest.Mock).mockImplementationOnce(
                async () => {
                  (taskGraphNode as Writable<
                    TaskGraphNode<number, number>
                  >).status = TaskGraphNodeStatus.Error;
                },
              );

              result = await queueBasedTaskGraph.performTasks();
            });

            afterAll(() => {
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).dependsOn = [];
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).status = TaskGraphNodeStatus.NotStarted;

              (taskGraphNode.perform as jest.Mock).mockClear();
            });

            it('must return a failure', () => {
              const expectedResult: PerformTasksResult = {
                error: expect.any(String) as string,
                success: false,
              };

              expect(result).toStrictEqual(expectedResult);
            });
          });
        });

        describe('when the task is on error', () => {
          let result: unknown;

          beforeAll(async () => {
            (taskGraphNode as Writable<
              TaskGraphNode<number, number>
            >).dependsOn = [];
            (taskGraphNode as Writable<TaskGraphNode<number, number>>).status =
              TaskGraphNodeStatus.Error;

            result = await queueBasedTaskGraph.performTasks();
          });

          afterAll(() => {
            (taskGraphNode as Writable<
              TaskGraphNode<number, number>
            >).dependsOn = [];
            (taskGraphNode as Writable<TaskGraphNode<number, number>>).status =
              TaskGraphNodeStatus.NotStarted;

            (taskGraphNode.perform as jest.Mock).mockClear();
          });

          it('must return a failure', () => {
            const expectedResult: PerformTasksResult = {
              success: false,
              error: expect.stringContaining(
                'task is initially in an error state',
              ) as string,
            };

            expect(result).toStrictEqual(expectedResult);
          });
        });
      });
    });

    describe.each([
      [
        TaskGraphNodeStatus.Ended,
        TaskGraphNodeStatus.Ended,
        1,
        1,
        { success: true },
      ],
      [
        TaskGraphNodeStatus.Error,
        TaskGraphNodeStatus.Ended,
        1,
        0,
        { error: expect.any(String) as string, success: false },
      ],
      [
        TaskGraphNodeStatus.Ended,
        TaskGraphNodeStatus.Error,
        1,
        1,
        { error: expect.any(String) as string, success: false },
      ],
      [
        TaskGraphNodeStatus.Error,
        TaskGraphNodeStatus.Error,
        1,
        0,
        { error: expect.any(String) as string, success: false },
      ],
    ] as [TaskGraphNodeStatus, TaskGraphNodeStatus, 0 | 1, 0 | 1, PerformTasksResult][])(
      'when called, and both a task finishing at state %s and a dependent one finishing at state %s are included',
      (
        taskGraphNodeStatus: TaskGraphNodeStatus,
        taskGraphNodeDependantStatus: TaskGraphNodeStatus,
        taskGraphNodePerformCalls: 0 | 1,
        taskGraphNodeDependantPerformCalls: 0 | 1,
        performTaskResult: PerformTasksResult,
      ) => {
        let result: unknown;
        let taskGraphNode: TaskGraphNode<number, number>;
        let taskGraphNodeDependent: TaskGraphNode<number, number>;
        let queueBasedTaskGraph: QueueBasedTaskGraph<number>;

        beforeAll(async () => {
          taskGraphNode = {
            dependsOn: [],
            getOutput: jest.fn(),
            status: TaskGraphNodeStatus.NotStarted,
            id: 2,
            perform: jest.fn(),
          };

          (taskGraphNode.perform as jest.Mock).mockImplementationOnce(
            async () => {
              (taskGraphNode as Writable<
                TaskGraphNode<number, number>
              >).status = taskGraphNodeStatus;
            },
          );

          taskGraphNodeDependent = {
            dependsOn: [taskGraphNode.id],
            getOutput: jest.fn(),
            status: TaskGraphNodeStatus.NotStarted,
            id: 3,
            perform: jest.fn(),
          };

          (taskGraphNodeDependent.perform as jest.Mock).mockImplementationOnce(
            async () => {
              (taskGraphNodeDependent as Writable<
                TaskGraphNode<number, number>
              >).status = taskGraphNodeDependantStatus;
            },
          );

          queueBasedTaskGraph = new QueueBasedTaskGraph([
            taskGraphNode,
            taskGraphNodeDependent,
          ]);

          result = await queueBasedTaskGraph.performTasks();
        });

        afterAll(() => {
          (taskGraphNode as Writable<
            TaskGraphNode<number, number>
          >).dependsOn = [];
          (taskGraphNode as Writable<TaskGraphNode<number, number>>).status =
            TaskGraphNodeStatus.NotStarted;

          (taskGraphNode.perform as jest.Mock).mockClear();

          (taskGraphNodeDependent as Writable<
            TaskGraphNode<number, number>
          >).dependsOn = [];
          (taskGraphNodeDependent as Writable<
            TaskGraphNode<number, number>
          >).status = TaskGraphNodeStatus.NotStarted;

          (taskGraphNodeDependent.perform as jest.Mock).mockClear();
        });

        it(`must call taskGraphNode.perform ${taskGraphNodePerformCalls} times`, () => {
          expect(taskGraphNode.perform).toHaveBeenCalledTimes(
            taskGraphNodePerformCalls,
          );
        });

        it(`must call taskGraphNodeDependent.perform ${taskGraphNodeDependantPerformCalls}`, () => {
          expect(taskGraphNodeDependent.perform).toHaveBeenCalledTimes(
            taskGraphNodeDependantPerformCalls,
          );
        });

        if (
          taskGraphNodePerformCalls === 1 &&
          taskGraphNodeDependantPerformCalls === 1
        ) {
          it('must call taskGraphNode.perform before taskGraphNodeDependent.perform', () => {
            const taskGraphNodePerformOrder: number = (taskGraphNode.perform as jest.Mock)
              .mock.invocationCallOrder[0];
            const taskGraphNodeDependentPerformOrder: number = (taskGraphNodeDependent.perform as jest.Mock)
              .mock.invocationCallOrder[0];
            expect(taskGraphNodePerformOrder).toBeLessThan(
              taskGraphNodeDependentPerformOrder,
            );
          });
        }

        it(`must return ${JSON.stringify({
          success: performTaskResult.success,
        })} `, () => {
          expect(result).toStrictEqual(performTaskResult);
        });
      },
    );
  });
});
