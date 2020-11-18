import _ from 'lodash';

export function mergeWithArrayCustomizer<T>(
  objValue: T,
  srcValue: T,
): T | undefined {
  if (_.isArray(objValue)) {
    return (objValue.concat(srcValue) as unknown) as T;
  }
}
