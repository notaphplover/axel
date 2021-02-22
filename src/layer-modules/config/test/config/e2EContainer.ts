import { Container } from 'inversify';

import { commonTest } from '../../../../common/test';
import { gameTest } from '../../../../data-modules/game/test';
import { userTest } from '../../../../data-modules/user/test';
import { container } from '../../adapter/container';

export const e2eContainer: Container = container.createChild();

e2eContainer.load(commonTest.config.container);
e2eContainer.load(gameTest.config.container);
e2eContainer.load(userTest.config.container);
