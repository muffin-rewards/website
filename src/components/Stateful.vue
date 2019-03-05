<template>
  <div>
    <slot v-if="state === 'initial'" name="initial" :fire="fire" :data="data"></slot>
    <slot v-if="state === 'fired'" name="fired" :fire="fire" :data="data"></slot>
    <slot v-if="state === 'failed'" name="failed" :fire="fire" :data="data"></slot>
    <slot v-if="state === 'succeeded'" name="succeeded" :fire="fire" :data="data"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

enum State {
  INITIAL = 'initial',
  FIRED = 'fired',
  FAILED = 'failed',
  SUCCEEDED = 'succeeded',
}

@Component
export default class extends Vue {

  /**
   * The trigger async function.
   */
  @Prop({ type: Function })
  public trigger: (data: any) => Promise<void>

  /**
   * The data to be send with the trigger.
   */
  public data: any = {}

  /**
   * The data to be send with the trigger.
   */
  public state: State = State.INITIAL

  /**
   * Fire the trigger with the modified data object.
   */
  public async fire () : Promise<void> {
    // Edit the state.
    this.state = State.FIRED

    // Fire the trigger function.
    await this.trigger(this.data)
      .then(() => {
        this.state = State.SUCCEEDED
      })
      .catch(() => {
        this.state = State.FAILED
      })
  }

}
</script>
