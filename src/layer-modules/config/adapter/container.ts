import { Container } from 'inversify';

import { appAdapter } from '../../../data-modules/app/adapter';
import { gameAdapter } from '../../../data-modules/game/adapter';
import { jwtAdapter } from '../../../data-modules/jwt/adapter';
import { userAdapter } from '../../../data-modules/user/adapter';
import { jsonwebtokenAdapter } from '../../../integration-modules/jsonwebtoken/adapter';
import { mongodbAdapter } from '../../../integration-modules/mongodb/adapter';
import { wsAdapter } from '../../../integration-modules/ws/adapter';
import { dbAdapter } from '../../db/adapter';
import { redisAdapter } from '../../redis/adapter';

export const container: Container = new Container();

container.load(appAdapter.config.container);
container.load(dbAdapter.config.container);
container.load(gameAdapter.config.container);
container.load(jsonwebtokenAdapter.config.container);
container.load(jwtAdapter.config.container);
container.load(mongodbAdapter.config.container);
container.load(redisAdapter.config.container);
container.load(userAdapter.config.container);
container.load(wsAdapter.config.container);
