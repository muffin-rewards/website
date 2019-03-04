import store from '@/store'
import { Store } from 'vuex'
import { State } from '@/types/store/State'

export abstract class Controller {

  /**
   * The vuex store.
   */
  protected $store: Store<State> = store

}
