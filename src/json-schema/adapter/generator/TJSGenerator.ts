import * as TJS from 'typescript-json-schema';
import * as fs from 'fs';
import * as path from 'path';
import { getDirectories } from '../../../common/domain/io/directory/getDirectories';
import { getFiles } from '../../../common/domain/io/file/getFiles';
import { injectable } from 'inversify';

const settings: TJS.PartialArgs = { required: true };
const compilerOptions: TJS.CompilerOptions = { strictNullChecks: true };

const FILE_BATCH_SIZE: number = 20;
const JSON_SPACES: number = 2;

@injectable()
export class TJSGenerator {
  public async generate(modulePath: string): Promise<void> {
    const files: string[] = this.getFilesToProcess(modulePath);
    const symbolsSet: Set<string> = this.getSymbolSetFromFiles(files);

    await this.saveSchemas(modulePath, this.generateSchemas(files), symbolsSet);
  }

  private generateSchemas(files: string[]): TJS.JsonSchemaGenerator {
    const program: TJS.Program = TJS.getProgramFromFiles(
      files,
      compilerOptions,
    );
    const generator: TJS.JsonSchemaGenerator | null = TJS.buildGenerator(
      program,
      settings,
    ) as TJS.JsonSchemaGenerator;

    return generator;
  }

  private getFilesToProcess(modulePath: string): string[] {
    const directoriesToProcess: string[] = [
      path.join(modulePath, 'adapter', 'api', 'query'),
    ];

    const getFilesAtDirectoryRecursivelly: (
      directory: string,
      files: string[],
    ) => void = (directory: string, files: string[]): void => {
      if (fs.existsSync(directory)) {
        files.push(
          ...getFiles(directory).map((file: string) =>
            path.join(directory, file),
          ),
        );

        for (const innerDirectory of getDirectories(directory)) {
          getFilesAtDirectoryRecursivelly(
            path.join(directory, innerDirectory),
            files,
          );
        }
      }
    };

    const files: string[] = [];

    for (const directory of directoriesToProcess) {
      getFilesAtDirectoryRecursivelly(directory, files);
    }

    return files;
  }

  private getSymbolSetFromFiles(files: string[]): Set<string> {
    const fileNames: string[] = files.map(
      (file: string) => path.parse(file).name,
    );
    const symbolsSet: Set<string> = new Set(fileNames);

    return symbolsSet;
  }

  private async saveSchemas(
    modulePath: string,
    generator: TJS.JsonSchemaGenerator,
    symbolsSet: Set<string>,
  ): Promise<void> {
    const symbols: string[] = generator
      .getUserSymbols()
      .filter(symbolsSet.has.bind(symbolsSet));

    const schemaDir: string = path.join(modulePath, 'adapter', 'json-schema');

    if (!fs.existsSync(schemaDir)) {
      fs.mkdirSync(schemaDir, {
        mode: '0754',
        recursive: true,
      });
    }

    for (let i: number = 0; i < symbols.length; i += FILE_BATCH_SIZE) {
      const symbolsBatch: string[] = symbols.slice(i, i + FILE_BATCH_SIZE);

      await Promise.all(
        symbolsBatch.map(async (symbol: string) => {
          const schema: TJS.Definition = generator.getSchemaForSymbol(symbol);
          const prefix: string = `export default `;
          const filePath: string = `${path.join(
            schemaDir,
            `${symbol}.schema.ts`,
          )}`;
          const fileContents: string = `${prefix}${JSON.stringify(
            schema,
            null,
            JSON_SPACES,
          )}
`;
          return new Promise((resolve: (value: void) => void) => {
            fs.writeFile(filePath, fileContents, () => {
              resolve();
            });
          });
        }),
      );
    }
  }
}
