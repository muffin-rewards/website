<template>
  <div class="step" :class="{ 'is-locked': locked }">
    <div class="step-head" v-if="hasHead">
      <slot name="head"></slot>
    </div>

    <div class="step-body">
      <Out white v-if="locked" class="is-pulled-right">
        <Icon>lock</Icon>
      </Out>

      <p>
        <Out primary bold family-secondary>STEP <slot name="step"></slot></Out>
      </p>

      <h2 class="title is-3">
        <Out white><slot name="title"></slot></Out>
      </h2>

      <p class="subtitle is-6">
        <Out grey-light><slot name="subtitle"></slot></Out>
      </p>

      <slot name="body" :locked="locked"></slot>
    </div>

    <div class="step-foot">
      <slot name="foot" :locked="locked"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {

  /**
   * Whether the step is locked.
   */
  @Prop({ type: Boolean })
  private locked: boolean

  /**
   * Whether the component has a head slot.
   */
  public get hasHead () : boolean {
    return this.$slots.head !== undefined
  }

}
</script>
