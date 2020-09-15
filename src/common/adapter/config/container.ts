import { Container } from 'inversify';
import { appAdapter } from '../../../app/adapter';
import { dbAdapter } from '../../../layer-modules/db/adapter';
import { gameAdapter } from '../../../game/adapter';
import { jsonSchemaAdapter } from '../../../json-schema/adapter';
import { jwtAdapter } from '../../../jwt/adapter';
import { serverAdapter } from '../../../layer-modules/server/adapter';
import { userAdapter } from '../../../user/adapter';

export const container: Container = new Container();

container.load(appAdapter.config.container);
container.load(dbAdapter.config.container);
container.load(gameAdapter.config.container);
container.load(jsonSchemaAdapter.config.container);
container.load(jwtAdapter.config.container);
container.load(serverAdapter.config.container);
container.load(userAdapter.config.container);
