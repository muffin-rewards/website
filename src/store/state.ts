import { State } from '@/types/store/State'
import { None } from '@bausano/data-structures'

export const state: State = {
  rewardList: [],
  currentReward: new None(),
}
