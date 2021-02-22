import 'reflect-metadata';
import { Capsule } from '../../../../common/domain';
import { BaseTaskGraphNode, TaskGraphNodeStatus } from '../../domain';

class BaseTaskGraphNodeMock extends BaseTaskGraphNode<number, number> {
  constructor(
    public readonly dependsOn: Iterable<number>,
    public readonly id: number,
    private readonly innerPerformMock: jest.Mock<Promise<number>>,
  ) {
    super(dependsOn, id);
  }

  protected async innerPerform(): Promise<number> {
    return this.innerPerformMock();
  }
}

describe(BaseTaskGraphNode.name, () => {
  describe('.perform()', () => {
    describe('when called, and the task is accomplished successfully', () => {
      let dependsOn: Iterable<number>;
      let id: number;
      let innerPerformMock: jest.Mock<Promise<number>>;
      let innerPerformResult: number;

      let baseTaskGraphNode: BaseTaskGraphNodeMock;

      beforeAll(async () => {
        dependsOn = [];
        id = 0;
        innerPerformResult = 1;
        innerPerformMock = jest
          .fn<Promise<number>, []>()
          .mockResolvedValueOnce(innerPerformResult);

        baseTaskGraphNode = new BaseTaskGraphNodeMock(
          dependsOn,
          id,
          innerPerformMock,
        );

        await baseTaskGraphNode.perform();
      });

      afterAll(() => {
        innerPerformMock.mockClear();
      });

      it('the node must be in ended status', () => {
        expect(baseTaskGraphNode.status).toBe(TaskGraphNodeStatus.Ended);
      });

      it("the node's output must be a capsule with the output", () => {
        const expectedOutput: Capsule<number> = { elem: innerPerformResult };

        expect(baseTaskGraphNode.getOutput()).toStrictEqual(expectedOutput);
      });
    });

    describe('when called, and the task is accomplished with errors', () => {
      let dependsOn: Iterable<number>;
      let id: number;
      let innerPerformMock: jest.Mock<Promise<number>>;
      let innerPerformResult: number;

      let baseTaskGraphNode: BaseTaskGraphNodeMock;

      beforeAll(async () => {
        dependsOn = [];
        id = 0;
        innerPerformResult = 1;
        innerPerformMock = jest
          .fn<Promise<number>, []>()
          .mockRejectedValueOnce(innerPerformResult);

        baseTaskGraphNode = new BaseTaskGraphNodeMock(
          dependsOn,
          id,
          innerPerformMock,
        );

        await baseTaskGraphNode.perform();
      });

      afterAll(() => {
        innerPerformMock.mockClear();
      });

      it('the node must be in error status', () => {
        expect(baseTaskGraphNode.status).toBe(TaskGraphNodeStatus.Error);
      });

      it("the node's output must be null", () => {
        const expectedOutput: null = null;

        expect(baseTaskGraphNode.getOutput()).toStrictEqual(expectedOutput);
      });
    });

    describe('when called, and the task is not accomplished', () => {
      let dependsOn: Iterable<number>;
      let id: number;
      let innerPerformMock: jest.Mock<Promise<number>>;

      let baseTaskGraphNode: BaseTaskGraphNodeMock;

      beforeAll(() => {
        dependsOn = [];
        id = 0;
        innerPerformMock = jest
          .fn<Promise<number>, []>()
          .mockResolvedValueOnce(new Promise(() => undefined));

        baseTaskGraphNode = new BaseTaskGraphNodeMock(
          dependsOn,
          id,
          innerPerformMock,
        );

        void baseTaskGraphNode.perform();
      });

      afterAll(() => {
        innerPerformMock.mockClear();
      });

      it('the node must be in in progress status', () => {
        expect(baseTaskGraphNode.status).toBe(TaskGraphNodeStatus.InProgress);
      });

      it("the node's output must be null", () => {
        const expectedOutput: null = null;

        expect(baseTaskGraphNode.getOutput()).toStrictEqual(expectedOutput);
      });
    });
  });
});
