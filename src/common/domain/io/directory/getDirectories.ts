import { isDirectory } from './isDirectory';
import { join } from 'path';
import { readdirSync } from 'fs';

export function getDirectories(source: string): string[] {
  return readdirSync(source).filter((directoryName: string) =>
    isDirectory(join(source, directoryName)),
  );
}
