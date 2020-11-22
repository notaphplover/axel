import { inject, injectable } from 'inversify';
import { CreateUserTaskGraphNode } from './CreateUserTaskGraphNode';
import { Interactor } from '../../../../common/domain';
import { USER_DOMAIN_TYPES } from '../../domain/config/types';
import { USER_E2E_TYPES } from '../config/types/e2eTypes';
import { User } from '../../domain/model/User';
import { UserCreationQuery } from '../../domain/query/UserCreationQuery';

@injectable()
export class CreateFirstUserTaskGraphNode extends CreateUserTaskGraphNode<symbol> {
  constructor(
    @inject(USER_DOMAIN_TYPES.interactor.CREATE_USERS_INTERACTOR)
    createUsersInteractor: Interactor<UserCreationQuery, Promise<User[]>>,
  ) {
    super(
      [],
      USER_E2E_TYPES.CREATE_FIRST_USER_TASK_GRAPH_NODE,
      createUsersInteractor,
    );
  }
}
