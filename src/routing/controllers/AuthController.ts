import { Request } from '@/types/routing/Request'
import { Controller } from '@/routing/controllers/Controller'

export class AuthController extends Controller {

  /**
   * OAuth callback route.
   */
  public async callback ({ to }: Request) : Promise<void> {
    localStorage.setItem(
      'token',
      (to.hash || 'error').replace('#access_token=', ''),
    )

    return new Promise(resolve => setTimeout(resolve, 500))
      .then(() => window.close())
  }

}
