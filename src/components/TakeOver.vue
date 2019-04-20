<template>
  <div class="takeover" :class="{ 'is-active': active }">
    <div class="takeover-title">
      <div>
        <slot name="title"></slot>
      </div>

      <a class="delete" @click="$emit('close')"></a>
    </div>

    <div class="takeover-head" v-if="$slots.head">
      <slot name="head"></slot>
    </div>

    <div class="takeover-body">
      <slot name="body"></slot>
    </div>

    <div class="takeover-foot">
      <slot name="foot"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {

  /**
   * Whether the take over is active.
   */
  @Prop(Boolean)
  public active: boolean

}
</script>
