import { inject, injectable } from 'inversify';
import { CreateEntityTaskGraphNode } from '../../../task-graph/adapter';
import { Model } from 'mongoose';
import { USER_ADAPTER_E2E_TYPES } from '../config/types/e2eTypes';
import { USER_ADAPTER_TYPES } from '../../adapter/config/types';
import { UserDb } from '../../adapter/db/model/UserDb';
import { commonTest } from '../../../../common/test';
import { user } from '../fixtures/domain/model/fixtures';

@injectable()
export class CreateUserDbTaskGraphNode extends CreateEntityTaskGraphNode<
  symbol,
  UserDb
> {
  constructor(
    @inject(commonTest.config.types.utils.NUMERIC_SEQUENCE)
    private readonly numericSequence: IterableIterator<number>,
    @inject(USER_ADAPTER_TYPES.db.model.USER_DB_MODEL)
    userDbModel: Model<UserDb>,
  ) {
    super(
      [],
      USER_ADAPTER_E2E_TYPES.CREATE_USER_DB_TASK_GRAPH_NODE,
      userDbModel,
    );
  }

  protected buildDocumentBody(): unknown {
    const nextNumberResult: IteratorResult<
      number,
      number
    > = this.numericSequence.next();

    if (nextNumberResult.done === false) {
      throw new Error('Unable to build user: missing numeric sequence value');
    }

    const nextNumberStringified: string = nextNumberResult.value.toString();

    const documentBody: Partial<UserDb> = {
      email: nextNumberStringified + user.email,
      roles: user.roles,
      username: user.username + nextNumberStringified,
    };

    return documentBody;
  }
}
