import { TaskGraphNode, TaskGraphNodeStatus } from './TaskGraphNode';
import { Capsule } from '../../../common/domain';

export abstract class BaseTaskGraphNode<TId, TOutput>
  implements TaskGraphNode<TId, TOutput> {
  protected innerOutput: Capsule<TOutput> | null;

  protected innerStatus: TaskGraphNodeStatus;

  constructor(
    public readonly dependsOn: Iterable<TId>,
    public readonly id: TId,
  ) {
    this.innerStatus = TaskGraphNodeStatus.NotStarted;
    this.innerOutput = null;
  }

  public getOutput(): Capsule<TOutput> | null {
    return this.innerOutput !== null ? { elem: this.innerOutput.elem } : null;
  }

  public abstract perform(): Promise<void>;

  public get status(): TaskGraphNodeStatus {
    return this.innerStatus;
  }
}
