import { readdirSync } from 'fs';
import { join } from 'path';

import { isFile } from './isFile';

export function getFiles(source: string): string[] {
  return readdirSync(source).filter((fileName: string) =>
    isFile(join(source, fileName)),
  );
}
