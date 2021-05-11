import { injectable } from 'inversify';

import { Filter } from './Filter';

@injectable()
export abstract class ValidatorFunctionBasedFilter<TModel, TQuery>
  implements Filter<TModel, TQuery>
{
  public async filter(models: TModel[], filter: TQuery): Promise<TModel[]> {
    const modelComplainments: [TModel, boolean][] = await Promise.all(
      models.map(async (model: TModel) =>
        this.complains(model, filter).then<[TModel, boolean]>(
          (complains: boolean) => [model, complains],
        ),
      ),
    );

    const filteredModels: TModel[] = [];

    for (const [model, complains] of modelComplainments) {
      if (complains) {
        filteredModels.push(model);
      }
    }

    return filteredModels;
  }

  public async filterOne(
    model: TModel,
    filter: TQuery,
  ): Promise<TModel | null> {
    return (await this.complains(model, filter)) ? model : null;
  }

  protected abstract complains(model: TModel, query: TQuery): Promise<boolean>;
}
