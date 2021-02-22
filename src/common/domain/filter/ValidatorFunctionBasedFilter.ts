import { injectable } from 'inversify';

import { Filter } from './Filter';

@injectable()
export abstract class ValidatorFunctionBasedFilter<TModel, TQuery>
  implements Filter<TModel, TQuery> {
  public async filter(models: TModel[], filter: TQuery): Promise<TModel[]> {
    const modelsComplains: boolean[] = await Promise.all(
      models.map(async (model: TModel) => this.complains(model, filter)),
    );

    const filteredModels: TModel[] = [];

    for (let i: number = 0; i < models.length; ++i) {
      if (modelsComplains[i]) {
        filteredModels.push(models[i]);
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
