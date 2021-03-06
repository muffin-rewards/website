import router from '..'
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

    // TODO: Handle null.
    const slug: string = localStorage.getItem('slug')

    router.replace(`/${slug}`)
  }

}
