import { lstatSync } from 'fs';

export function isDirectory(source: string): boolean {
  return lstatSync(source).isDirectory();
}
