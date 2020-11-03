import { Container } from 'inversify';
import { commonTest } from '../../../../common/test';
import { container } from '../../adapter/container';
import { gameTest } from '../../../../data-modules/game/test';

export const e2eContainer: Container = container.createChild();

e2eContainer.load(commonTest.config.container);
e2eContainer.load(gameTest.config.container);
