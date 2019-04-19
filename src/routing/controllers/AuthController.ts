import { Request } from '@/types/routing/Request'
import { Controller } from '@/routing/controllers/Controller'

export class AuthController extends Controller {

  /**
   * OAuth callback route.
   */
  public async callback ({ to }: Request) : Promise<void> {
    localStorage.token = (to.hash || '').replace('#access_token=', '')

    return close()
  }

}
