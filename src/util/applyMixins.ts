type TClass = { new (...args: any[]): any };

/***
 * https://www.typescriptlang.org/docs/handbook/mixins.html#alternative-pattern
 */
export function applyMixins<T extends TClass, S extends TClass>(
  derivedCtor: T,
  constructors: S[]
) {
  constructors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      name !== 'constructor' &&
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
            Object.create(null)
        );
    });
  });
  return derivedCtor;
}
