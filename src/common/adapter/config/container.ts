import { Container } from 'inversify';
import { dbAdapter } from '../../../layer-modules/db/adapter';
import { gameAdapter } from '../../../game/adapter';
import { jsonSchemaAdapter } from '../../../json-schema/adapter';
import { jwtAdapter } from '../../../jwt/adapter';
import { serverAdapter } from '../../../layer-modules/server/adapter';

export const container: Container = new Container();

container.load(dbAdapter.config.container);
container.load(gameAdapter.config.container);
container.load(jsonSchemaAdapter.config.container);
container.load(jwtAdapter.config.container);
container.load(serverAdapter.config.container);
