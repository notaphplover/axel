export function getInstanceTypeName(instance: unknown): string {
  const prototype: Record<string, unknown> = Object.getPrototypeOf(
    instance,
  ) as Record<string, unknown>;

  return prototype.constructor.name;
}
