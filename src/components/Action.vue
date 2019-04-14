<template>
  <component
    :is="el"
    class="button"
    :class="[colorClass, sizeClass].concat(extraClasses)"
    v-on="$listeners"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {

  /** The wrapper element. */
  @Prop({ type: String, default: 'button' }) public el: string

  @Prop({ type: Boolean }) public small: boolean
  @Prop({ type: Boolean }) public medium: boolean
  @Prop({ type: Boolean }) public large: boolean

  @Prop({ type: Boolean }) public primary: boolean
  @Prop({ type: Boolean }) public secondary: boolean
  @Prop({ type: Boolean }) public success: boolean
  @Prop({ type: Boolean }) public danger: boolean
  @Prop({ type: Boolean }) public static: boolean

  @Prop({ type: Boolean }) public loading: boolean
  @Prop({ type: Boolean }) public block: boolean
  @Prop({ type: Boolean }) public inactive: boolean

  @Prop({ type: Boolean }) public fullwidth: boolean

  /** The desired color class. */
  public get colorClass () : string {
    return (
      this.primary ? 'is-primary' :
      this.secondary ? 'is-secondary' :
      this.success ? 'is-success' :
      this.danger ? 'is-danger' :
      this.static ? 'is-static' :
      ''
    )
  }

  /** The desired button size class. */
  public get sizeClass () : string {
    return (
      this.small ? 'is-small' :
      this.medium ? 'is-medium' :
      this.large ? 'is-large' : ''
    )
  }

  /** Other useful classes. */
  public get extraClasses () : string[] {
    return [
      this.loading ? 'is-loading' : '',
      this.block ? 'is-fullwidth' : '',
      this.inactive ? 'is-inactive' : '',
      this.fullwidth ? 'is-fullwidth' : '',
    ]
  }

}
</script>
