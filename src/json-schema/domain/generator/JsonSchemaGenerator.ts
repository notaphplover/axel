export interface JsonSchemaGenerator {
  generate(
    originModulePath: string,
    destinationModulePaths: string[],
  ): Promise<void>;
}
