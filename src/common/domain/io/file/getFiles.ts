import { isFile } from './isFile';
import { join } from 'path';
import { readdirSync } from 'fs';

export function getFiles(source: string): string[] {
  return readdirSync(source).filter((fileName: string) =>
    isFile(join(source, fileName)),
  );
}
