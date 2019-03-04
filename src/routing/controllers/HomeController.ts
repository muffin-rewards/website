import { Controller } from '@/routing/controllers/Controller'

export class HomeController extends Controller {

  /**
   * The base route controller, loads all rewards.
   */
  public async index () : Promise<void> {
    await this.$store.dispatch('listRewards')
  }

}
