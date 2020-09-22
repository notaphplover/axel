import { inject, injectable } from 'inversify';
import { Artifact } from '../../model/card/Artifact';
import { ArtifactCreationQuery } from '../../query/card/ArtifactCreationQuery';
import { BaseCardCreationQuery } from '../../query/card/BaseCardCreationQuery';
import { Card } from '../../model/card/Card';
import { CardType } from '../../model/card/CardType';
import { Creature } from '../../model/card/Creature';
import { CreatureCreationQuery } from '../../query/card/CreatureCreationQuery';
import { Enchantment } from '../../model/card/Enchantment';
import { EnchantmentCreationQuery } from '../../query/card/EnchantmentCreationQuery';
import { GAME_DOMAIN_TYPES } from '../../config/types';
import { Interactor } from '../../../../common/domain';
import { Land } from '../../model/card/Land';
import { LandCreationQuery } from '../../query/card/LandCreationQuery';

@injectable()
export class CreateCardsInteractor
  implements Interactor<BaseCardCreationQuery, Promise<Card[]>> {
  constructor(
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_ARTIFACTS_INTERACTOR)
    private readonly createArtifactsInteractor: Interactor<
      ArtifactCreationQuery,
      Promise<Artifact[]>
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_CREATURES_INTERACTOR)
    private readonly createCreaturesInteractor: Interactor<
      CreatureCreationQuery,
      Promise<Creature[]>
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_ENCHANTMENTS_INTERACTOR)
    private readonly createEnchantmentsInteractor: Interactor<
      EnchantmentCreationQuery,
      Promise<Enchantment[]>
    >,
    @inject(GAME_DOMAIN_TYPES.interactor.card.CREATE_LANDS_INTERACTOR)
    private readonly createLandsInteractor: Interactor<
      LandCreationQuery,
      Promise<Land[]>
    >,
  ) {}

  public async interact(query: BaseCardCreationQuery): Promise<Card[]> {
    switch (query.type) {
      case CardType.Artifact:
        return this.createArtifactsInteractor.interact(
          query as ArtifactCreationQuery,
        );
      case CardType.Creature:
        return this.createCreaturesInteractor.interact(
          query as CreatureCreationQuery,
        );
      case CardType.Enchantment:
        return this.createEnchantmentsInteractor.interact(
          query as EnchantmentCreationQuery,
        );
      case CardType.Land:
        return this.createLandsInteractor.interact(query as LandCreationQuery);
      default:
        throw new Error('Unexpected card type');
    }
  }
}
