/* eslint-disable @typescript-eslint/no-explicit-any */
function innerDescribeWrapper(
  describeFn: jest.Describe,
  describeName: string,
  describeCallback: () => void,
  setupName: string,
  setupCallback: () => void,
): void {
  describeFn(setupName, () => {
    setupCallback();

    describeFn(describeName, describeCallback);
  });
}

function innerEachWrapper(
  describeFn: jest.Describe,
  setupName: string,
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
      setupName,
      setupCallback,
    );
  };
}

export const customDescribe: (
  describeFn: jest.Describe,
  setupName: string,
  setupCallback: () => void,
) => jest.Describe = (
  describeFn: jest.Describe,
  setupName: string,
  setupCallback: () => void,
): jest.Describe =>
  new Proxy(describeFn, {
    apply: (
      target: jest.Describe,
      thisArg: jest.Describe,
      argArray: [string, () => void],
    ): void => {
      const [describeName, describeCallback]: [string, () => void] = argArray;
      innerDescribeWrapper(
        target,
        describeName,
        describeCallback,
        setupName,
        setupCallback,
      );
    },
    get: (
      target: jest.Describe,
      handler: string,
    ): jest.Describe | jest.Each => {
      switch (handler) {
        case 'each':
          return innerEachWrapper(target, setupName, setupCallback);
        case 'only':
          return customDescribe(target.only, setupName, setupCallback);
        case 'skip':
          return customDescribe(target.skip, setupName, setupCallback);
        default:
          return ((target as unknown) as Record<
            string,
            jest.Describe | jest.Each
          >)[handler] as jest.Describe | jest.Each;
      }
    },
  });
