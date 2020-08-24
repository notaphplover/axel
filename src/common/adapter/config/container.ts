import { Container } from 'inversify';
import { httpServerContainer } from '../../../http-server/adapter/config/container';

export const container: Container = new Container();

container.load(httpServerContainer);
