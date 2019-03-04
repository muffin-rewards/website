import { Reward } from '@/types/models/Reward.ts'
import { Optional } from '@bausano/data-structures'

export interface State {

  /**
   * The array of reward objects.
   */
  rewardList: Reward[]

  /**
   * The currently active reward.
   */
  currentReward: Optional<Reward>

}
