import { MutationTree } from 'vuex'
import { State } from '@/types/store/State'
import { Reward } from '@/types/models/Reward'
import { Optional } from '@bausano/data-structures'

export const mutations: MutationTree<State> = {

  /**
   * @param state The current state
   * @param domain The updated domaind data
   */
  updateRewardList (state: State, rewards: Reward[]) : void {
    state.rewardList = rewards
  },

  /**
   * @param state The current state
   * @param featuredVouchers The updated featured vouchers
   */
  updateCurrentReward (state: State, reward: Optional<Reward>) : void {
    state.currentReward = reward
  },

  /**
   * @param state The current state
   * @param isLoading Whether current view is loading
   */
  updateViewLoadingStatus (state: State, isLoading: boolean) : void {
    state.isViewLoading = isLoading
  },

}
