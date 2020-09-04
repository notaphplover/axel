import { lstatSync } from 'fs';

export function isFile(source: string): boolean {
  return lstatSync(source).isFile();
}
