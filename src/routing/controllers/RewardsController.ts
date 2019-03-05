import { Request } from '@/types/routing/Request'
import { Controller } from '@/routing/controllers/Controller'

export class RewardsController extends Controller {

  /**
   * Show a single reward.
   */
  public async show ({ to, from }: Request) : Promise<void> {
    // TODO: Remove eventually.
    await this.$store.dispatch('listRewards')

    return this.$store.dispatch('loadCurrentReward', to.params.slug)
  }

}
