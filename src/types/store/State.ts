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

  /**
   * Whether a view is being loaded. If this flag is true, we show just a
   * spinning wheel.
   */
  isViewLoading: boolean

}
