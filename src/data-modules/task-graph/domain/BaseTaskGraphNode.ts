import { TaskGraphNode, TaskGraphNodeStatus } from './TaskGraphNode';
import { Capsule } from '../../../common/domain';

export abstract class BaseTaskGraphNode<TId, TOutput>
  implements TaskGraphNode<TId, TOutput> {
  private innerOutput: Capsule<TOutput> | null;
  private innerPerformPromise: Promise<null | Capsule<TOutput>> | undefined;
  private innerStatus: TaskGraphNodeStatus;

  constructor(
    public readonly dependsOn: Iterable<TId>,
    public readonly id: TId,
  ) {
    this.innerOutput = null;
    this.innerPerformPromise = undefined;
    this.innerStatus = TaskGraphNodeStatus.NotStarted;
  }

  public getOutput(): Capsule<TOutput> | null {
    return this.innerOutput !== null ? { elem: this.innerOutput.elem } : null;
  }

  public async perform(): Promise<void> {
    if (this.innerStatus !== TaskGraphNodeStatus.NotStarted) {
      await this.innerPerformPromise;
      return;
    }

    this.innerStatus = TaskGraphNodeStatus.InProgress;

    this.innerPerformPromise = this.getPerformPromise();

    this.innerOutput = await this.innerPerformPromise;
  }

  public get status(): TaskGraphNodeStatus {
    return this.innerStatus;
  }

  private async getPerformPromise(): Promise<null | Capsule<TOutput>> {
    try {
      const innerPerformOutput: TOutput = await this.innerPerform();

      this.innerStatus = TaskGraphNodeStatus.Ended;

      return { elem: innerPerformOutput };
    } catch (err) {
      this.innerStatus = TaskGraphNodeStatus.Error;
      return null;
    }
  }

  protected abstract innerPerform(): Promise<TOutput>;
}
