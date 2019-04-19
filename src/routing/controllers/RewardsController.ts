import { Request } from '@/types/routing/Request'
import { Controller } from '@/routing/controllers/Controller'

export class RewardsController extends Controller {

  /**
   * Show a single reward.
   */
  public async show ({ to }: Request) : Promise<void> {
    // TODO: Remove eventually.
    await this.$store.dispatch('listRewards').catch(() => undefined)

    return this.$store.dispatch('loadCurrentReward', to.params.slug)
      .catch(() => Promise.reject({ name: 'home' }))
  }

}
