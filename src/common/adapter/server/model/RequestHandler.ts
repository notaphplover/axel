export interface RequestHandler<TRequest, TOutput> {
  handle(req: TRequest): Promise<TOutput>;
}
