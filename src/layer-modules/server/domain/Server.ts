export interface Server {
  bootstrap(): Promise<void>;

  close(): Promise<void>;
}
