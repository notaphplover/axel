export interface DbConnector {
  close(): Promise<void>;
  connect(): Promise<void>;
}
