export function hasOneElement<TElem>(array: TElem[]): array is [TElem] {
  return array.length === 1;
}
