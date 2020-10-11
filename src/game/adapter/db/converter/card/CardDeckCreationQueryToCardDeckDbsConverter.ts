import { inject, injectable } from 'inversify';
import { CardDeckCreationQuery } from '../../../../domain/query/card/CardDeckCreationQuery';
import { CardDeckDb } from '../../model/card/CardDeckDb';
import { Converter } from '../../../../../common/domain';
import { GAME_ADAPTER_TYPES } from '../../../config/types';
import { Model } from 'mongoose';

@injectable()
export class CardDeckCreationQueryToCardDeckDbsConverter
  implements Converter<CardDeckCreationQuery, CardDeckDb[]> {
  constructor(
    @inject(GAME_ADAPTER_TYPES.db.model.card.CARD_DECK_DB_MODEL)
    private readonly cardDeckDbModel: Model<CardDeckDb>,
  ) {}

  public transform(input: CardDeckCreationQuery): CardDeckDb[] {
    return [
      new this.cardDeckDbModel({
        description: input.description,
        format: input.format,
        name: input.name,
        sections: {
          core: {
            references: [...input.sections.core.references],
          },
          sideboard: {
            references: [...input.sections.sideboard.references],
          },
        },
      }),
    ];
  }
}
