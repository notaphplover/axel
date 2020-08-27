export interface RequestHandler<TContext, TOutput> {
  handle(req: TContext): Promise<TOutput>;
}
