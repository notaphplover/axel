export interface JsonSchemaGenerator {
  generate(modulePath: string): Promise<void>;
}
