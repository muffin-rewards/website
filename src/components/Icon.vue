<template>
  <span class="icon" :class="sizeClass">
    <i :class="[iconName, typeClass]"></i>
  </span>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {

  @Prop({ type: Boolean }) public fas: boolean
  @Prop({ type: Boolean }) public far: boolean
  @Prop({ type: Boolean }) public fab: boolean

  @Prop({ type: Boolean }) public small: boolean
  @Prop({ type: Boolean }) public medium: boolean
  @Prop({ type: Boolean }) public large: boolean

  /** The desired type class. */
  public get typeClass () : string {
    return (
      this.fas ? 'fas' :
      this.far ? 'far' :
      this.fab ? 'fab' :
      'fas'
    )
  }

  /** The desired icon size class. */
  public get sizeClass () : string {
    return (
      this.small ? 'is-small' :
      this.medium ? 'is-medium' :
      this.large ? 'is-large' : ''
    )
  }

  /** The desired icon name. */
  public get iconName () : string {
    return `fa-${this.$slots.default.pop().text}`
  }

}
</script>
