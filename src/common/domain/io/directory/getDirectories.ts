import { readdirSync } from 'fs';
import { join } from 'path';

import { isDirectory } from './isDirectory';

export function getDirectories(source: string): string[] {
  return readdirSync(source).filter((directoryName: string) =>
    isDirectory(join(source, directoryName)),
  );
}
