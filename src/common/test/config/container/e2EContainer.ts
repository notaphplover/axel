import { ContainerModule, interfaces } from 'inversify';
import { COMMON_E2E_TYPES } from '../types/e2ETypes';
import { NumericSequence } from '../../../domain/utils/NumericSequence';

export function bindE2E(bind: interfaces.Bind): void {
  bind(COMMON_E2E_TYPES.utils.NUMERIC_SEQUENCE).toConstantValue(
    new NumericSequence(),
  );
}

export const commonTestE2eContainer: ContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bindE2E(bind);
  },
);
