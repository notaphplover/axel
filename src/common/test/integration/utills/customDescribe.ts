/* eslint-disable @typescript-eslint/no-explicit-any */
function innerDescribeWrapper(
  describeFn: jest.Describe,
  name: string,
  describeCallback: () => void,
  setupCallback: () => void,
): void {
  describeFn(name, () => {
    setupCallback();

    describeCallback();
  });
}

function innerEachWrapper(
  describeFn: jest.Describe,
  setupCallback: () => void,
): jest.Each {
  return (
    casesOrStrings: ReadonlyArray<any> | TemplateStringsArray,
    ...placeholders: any[]
  ) => (name: string, fn: (...args: any[]) => any, timeout?: number): void => {
    innerDescribeWrapper(
      describeFn,
      name,
      () => {
        if (placeholders.length === 0) {
          describeFn.each(casesOrStrings)(name, fn, timeout);
        } else {
          describeFn.each(
            casesOrStrings as TemplateStringsArray,
            ...placeholders,
          )(name, fn, timeout);
        }
      },
      setupCallback,
    );
  };
}

export const customDescribe: (
  describeFn: jest.Describe,
  setupCallback: () => void,
) => jest.Describe = (
  describeFn: jest.Describe,
  setupCallback: () => void,
): jest.Describe =>
  new Proxy(describeFn, {
    apply: (
      target: jest.Describe,
      thisArg: jest.Describe,
      argArray: [string, () => void],
    ): void => {
      const [name, describeCallback]: [string, () => void] = argArray;
      innerDescribeWrapper(target, name, describeCallback, setupCallback);
    },
    get: (
      target: jest.Describe,
      handler: string,
    ): jest.Describe | jest.Each => {
      switch (handler) {
        case 'each':
          return innerEachWrapper(target, setupCallback);
        case 'only':
          return customDescribe(target.only, setupCallback);
        case 'skip':
          return customDescribe(target.skip, setupCallback);
        default:
          return ((target as unknown) as Record<
            string,
            jest.Describe | jest.Each
          >)[handler];
      }
    },
  });
