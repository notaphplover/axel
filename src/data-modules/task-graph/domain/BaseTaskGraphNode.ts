import { injectable, unmanaged } from 'inversify';

import { Capsule } from '../../../common/domain';
import { TaskGraphNode, TaskGraphNodeStatus } from './TaskGraphNode';

@injectable()
export abstract class BaseTaskGraphNode<TId, TOutput>
  implements TaskGraphNode<TId, TOutput> {
  private innerOutput: Capsule<TOutput> | null;
  private innerPerformPromise: Promise<null | Capsule<TOutput>> | undefined;
  private innerStatus: TaskGraphNodeStatus;

  constructor(
    @unmanaged()
    public readonly dependsOn: Iterable<TId>,
    @unmanaged()
    public readonly id: TId,
  ) {
    this.innerOutput = null;
    this.innerPerformPromise = undefined;
    this.innerStatus = TaskGraphNodeStatus.NotStarted;
  }

  public getOutput(): TOutput {
    if (this.innerOutput === null) {
      throw new Error(
        'Unable to get any output. The task is probably not accomplished',
      );
    } else {
      return this.innerOutput.elem;
    }
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
