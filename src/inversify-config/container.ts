import { Container } from 'inversify';
import { httpServerContainer } from './http-server/container';

export const container: Container = new Container();

container.load(httpServerContainer);
