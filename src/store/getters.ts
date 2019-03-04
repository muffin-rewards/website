import { GetterTree } from 'vuex'
import { State } from '@/types/store/State'
import { Reward } from '@/types/models/Reward'

export const getters: GetterTree<State, State> = {

  /**
   * @param state The current state
   * @return The list of rewards
   */
  rewardList (state: State) : Reward[] {
    return state.rewardList
  },

  /**
   * @param state The current state
   * @return The currently active reward
   */
  currentReward (state: State) : Reward {
    return state.currentReward.unwrap()
  },

}
