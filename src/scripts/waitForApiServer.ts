import 'reflect-metadata';
import * as axios from 'axios';
import { AppEnvVariables, appAdapter } from '../data-modules/app/adapter';
import { Container } from 'inversify';
import { EnvLoader } from '../layer-modules/env/domain';
import { StatusCodes } from 'http-status-codes';
import { configAdapter } from '../layer-modules/config/adapter';

const container: Container = configAdapter.container;

const appEnvLoader: EnvLoader<AppEnvVariables> = container.get(
  appAdapter.config.types.env.APP_ENV_LOADER,
);

const client: axios.AxiosStatic = axios.default;

const appUrl: string = `http://127.0.0.1:${appEnvLoader.index.APP_SERVER_PORT}/v1/status`;

const retryMs: number = 1000;
const maxConnectionAttempts: number = 45;

let connectionAttempts: number = 0;

const callStatusInterval: NodeJS.Timeout = setInterval(() => {
  void (async () => {
    try {
      const getStatusV1Response: axios.AxiosResponse = await client.get(appUrl);
      if (getStatusV1Response.status === StatusCodes.OK) {
        console.log(
          `App server sent an HTTP ${getStatusV1Response.status} response.`,
        );

        const status: string = (getStatusV1Response.data as { status: string })
          .status;

        if (status === 'OK') {
          console.log('App server sent an OK status, exiting ...');
          clearInterval(callStatusInterval);
        } else {
          console.log(
            `App server sent an ${status} status. Retrying in ${retryMs} ms`,
          );
        }
      } else {
        console.log(
          `App server sent an HTTP ${getStatusV1Response.status} response. Retrying in ${retryMs} ms`,
        );
      }
    } catch (err) {
      console.log(`Error connecting to app server. Retrying in ${retryMs} ms`);
    }

    if (connectionAttempts < maxConnectionAttempts) {
      ++connectionAttempts;
    } else {
      clearInterval(callStatusInterval);

      setImmediate(() => {
        process.exit(-1);
      });

      throw new Error(
        `Unexpected error: Exceded ${maxConnectionAttempts} connection attempts`,
      );
    }
  })();
}, retryMs);
