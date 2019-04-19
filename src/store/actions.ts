import { rewards } from '@/awis'
import { State } from '@/types/store/State'
import { Reward } from '@/types/models/Reward'
import { ActionTree, ActionContext } from 'vuex'

// TODO: Remove eventually
import { Some } from '@bausano/data-structures'

export const actions: ActionTree<State, State> = {

  /**
   * @param context The Vuex Store context
   */
  async listRewards ({ commit }: ActionContext<State, State>) : Promise<void> {
    return rewards()
      .body<Reward[]>()
      .then(body => commit('updateRewardList', body))
  },

  /**
   * @param context The Vuex Store context
   * @param slug The reward slug
   */
  async loadCurrentReward ({ state, commit }: ActionContext<State, State>, slug: string) : Promise<void> {
    commit('updateCurrentReward', new Some(state.rewardList.find(r => r.slug === slug)))
    // return rewards()
    //   .optional<Reward>(slug)
    //   .then(body => commit('updateCurrentReward', body))
  },

}
