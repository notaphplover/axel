import { Container } from 'inversify';
import { appAdapter } from '../../../app/adapter';
import { dbAdapter } from '../../db/adapter';
import { gameAdapter } from '../../../data-modules/game/adapter';
import { jsonSchemaAdapter } from '../../../json-schema/adapter';
import { jsonwebtokenAdapter } from '../../../integration-modules/jsonwebtoken/adapter';
import { jwtAdapter } from '../../../data-modules/jwt/adapter';
import { mongooseAdapter } from '../../../integration-modules/mongoose/adapter';
import { userAdapter } from '../../../data-modules/user/adapter';

export const container: Container = new Container();

container.load(appAdapter.config.container);
container.load(dbAdapter.config.container);
container.load(gameAdapter.config.container);
container.load(jsonSchemaAdapter.config.container);
container.load(jsonwebtokenAdapter.config.container);
container.load(jwtAdapter.config.container);
container.load(mongooseAdapter.config.container);
container.load(userAdapter.config.container);
