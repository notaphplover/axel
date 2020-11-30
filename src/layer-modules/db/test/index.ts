import { mongodbIntegrationDescribe } from './integration/utils/mongodbIntegrationDescribe';
import { mongooseIntegrationDescribe } from './integration/utils/mongooseIntegrationDescribe';

// eslint-disable-next-line @typescript-eslint/typedef
export const dbTest = {
  integration: {
    utils: {
      mongodbIntegrationDescribe,
      mongooseIntegrationDescribe,
    },
  },
};
