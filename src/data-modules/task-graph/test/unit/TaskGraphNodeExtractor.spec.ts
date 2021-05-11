import { TaskGraphNode } from '../../domain';
import { TaskGraphNodeExtractor } from '../../domain/TaskGraphNodeExtractor';

class TaskGraphNodeExtractorMock extends TaskGraphNodeExtractor<
  string,
  Map<string, TaskGraphNode<string, unknown>>
> {
  public extractNode(
    source: Map<string, TaskGraphNode<string, unknown>>,
    id: string,
  ): TaskGraphNode<string, unknown> | undefined {
    return source.get(id);
  }
}

describe(TaskGraphNodeExtractor.name, () => {
  describe('.extract()', () => {
    describe('when called, and zero nodes were provided', () => {
      let result: unknown;

      beforeAll(() => {
        const taskGraphNodeExtractor: TaskGraphNodeExtractorMock =
          new TaskGraphNodeExtractorMock(new Map(), []);

        result = [...taskGraphNodeExtractor.extract()];
      });

      it('must return an empty collection of nodes', () => {
        expect(result).toStrictEqual([]);
      });
    });

    describe('when called, and a node with no dependencies was provided', () => {
      let node: TaskGraphNode<string, unknown>;

      let result: unknown;

      beforeAll(() => {
        node = {
          dependsOn: [],
          id: 'sample-id',
        } as Partial<TaskGraphNode<string, unknown>> as TaskGraphNode<
          string,
          unknown
        >;

        const taskGraphNodeExtractor: TaskGraphNodeExtractorMock =
          new TaskGraphNodeExtractorMock(new Map(), [node]);

        result = [...taskGraphNodeExtractor.extract()];
      });

      it('must return an empty collection of nodes', () => {
        expect(result).toStrictEqual([node]);
      });
    });

    describe('when called, and a node with an invalid dependency was provided', () => {
      let nodeDependency: string;

      let source: Map<string, TaskGraphNode<string, unknown>>;

      let extractNodeSpy: jest.SpyInstance;

      let result: unknown;

      beforeAll(() => {
        nodeDependency = 'missing-id';
        const node: TaskGraphNode<string, unknown> = {
          dependsOn: [nodeDependency],
          id: 'sample-id',
        } as Partial<TaskGraphNode<string, unknown>> as TaskGraphNode<
          string,
          unknown
        >;

        source = new Map<string, TaskGraphNode<string, unknown>>();

        const taskGraphNodeExtractor: TaskGraphNodeExtractorMock =
          new TaskGraphNodeExtractorMock(source, [node]);

        extractNodeSpy = jest.spyOn(taskGraphNodeExtractor, 'extractNode');

        try {
          result = [...taskGraphNodeExtractor.extract()];
        } catch (err) {
          result = err;
        }
      });

      it('must try to extract the node dependency from its source', () => {
        expect(extractNodeSpy).toHaveBeenCalledTimes(1);
        expect(extractNodeSpy).toHaveBeenCalledWith(source, nodeDependency);
      });

      it('must throw an error', () => {
        expect(result).toBeInstanceOf(Error);
      });
    });

    describe('when called, and a node with a valid dependency was provided', () => {
      let nodeDependency: string;

      let node: TaskGraphNode<string, unknown>;
      let dependentNode: TaskGraphNode<string, unknown>;

      let source: Map<string, TaskGraphNode<string, unknown>>;

      let extractNodeSpy: jest.SpyInstance;

      let result: unknown;

      beforeAll(() => {
        nodeDependency = 'sample-dependent-id';
        node = {
          dependsOn: [nodeDependency],
          id: 'sample-id',
        } as Partial<TaskGraphNode<string, unknown>> as TaskGraphNode<
          string,
          unknown
        >;
        dependentNode = {
          dependsOn: [],
          id: nodeDependency,
        } as Partial<TaskGraphNode<string, unknown>> as TaskGraphNode<
          string,
          unknown
        >;

        source = new Map<string, TaskGraphNode<string, unknown>>();
        source.set(nodeDependency, dependentNode);

        const taskGraphNodeExtractor: TaskGraphNodeExtractorMock =
          new TaskGraphNodeExtractorMock(source, [node]);

        extractNodeSpy = jest.spyOn(taskGraphNodeExtractor, 'extractNode');

        result = [...taskGraphNodeExtractor.extract()];
      });

      it('must try to extract the node dependency from its source', () => {
        expect(extractNodeSpy).toHaveBeenCalledTimes(1);
        expect(extractNodeSpy).toHaveBeenCalledWith(source, nodeDependency);
      });

      it('must return all the nodes', () => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(2);

        expect(result).toContain(node);
        expect(result).toContain(dependentNode);
      });
    });

    describe('when called, and a node with a valid dependency with a valid dependency was provided', () => {
      let nodeDependency: string;
      let nodeThirdDependency: string;

      let node: TaskGraphNode<string, unknown>;
      let dependentNode: TaskGraphNode<string, unknown>;
      let thirdDependentNode: TaskGraphNode<string, unknown>;

      let source: Map<string, TaskGraphNode<string, unknown>>;

      let extractNodeSpy: jest.SpyInstance;

      let result: unknown;

      beforeAll(() => {
        nodeDependency = 'sample-dependent-id';
        nodeThirdDependency = 'sample-third-dependent-id';

        node = {
          dependsOn: [nodeDependency],
          id: 'sample-id',
        } as Partial<TaskGraphNode<string, unknown>> as TaskGraphNode<
          string,
          unknown
        >;
        dependentNode = {
          dependsOn: [nodeThirdDependency],
          id: nodeDependency,
        } as Partial<TaskGraphNode<string, unknown>> as TaskGraphNode<
          string,
          unknown
        >;
        thirdDependentNode = {
          dependsOn: [],
          id: nodeThirdDependency,
        } as Partial<TaskGraphNode<string, unknown>> as TaskGraphNode<
          string,
          unknown
        >;

        source = new Map<string, TaskGraphNode<string, unknown>>();
        source.set(nodeDependency, dependentNode);
        source.set(nodeThirdDependency, thirdDependentNode);

        const taskGraphNodeExtractor: TaskGraphNodeExtractorMock =
          new TaskGraphNodeExtractorMock(source, [node]);

        extractNodeSpy = jest.spyOn(taskGraphNodeExtractor, 'extractNode');

        result = [...taskGraphNodeExtractor.extract()];
      });

      it('must try to extract the node dependency from its source', () => {
        expect(extractNodeSpy).toHaveBeenCalledTimes(2);
        expect(extractNodeSpy).toHaveBeenNthCalledWith(
          1,
          source,
          nodeDependency,
        );
        expect(extractNodeSpy).toHaveBeenNthCalledWith(
          2,
          source,
          nodeThirdDependency,
        );
      });

      it('must return all the nodes', () => {
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(3);

        expect(result).toContain(node);
        expect(result).toContain(dependentNode);
        expect(result).toContain(thirdDependentNode);
      });
    });
  });
});
