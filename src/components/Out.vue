<template>
  <component
    :is="el"
    :class="[colorClass, familyClass, weightClass, sizeClass, transformClass]"
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
  @Prop({ type: String, default: 'span' }) public el: string

  @Prop({ type: Boolean }) public small: boolean
  @Prop({ type: Boolean }) public medium: boolean
  @Prop({ type: Boolean }) public big: boolean
  @Prop({ type: Boolean }) public huge: boolean

  @Prop({ type: Boolean }) public primary: boolean
  @Prop({ type: Boolean }) public secondary: boolean

  @Prop({ type: Boolean }) public white: boolean
  @Prop({ type: Boolean }) public whiteTer: boolean
  @Prop({ type: Boolean }) public greyLight: boolean
  @Prop({ type: Boolean }) public greyLighter: boolean
  @Prop({ type: Boolean }) public grey: boolean
  @Prop({ type: Boolean }) public black: boolean

  @Prop({ type: Boolean }) public familySecondary: boolean

  @Prop({ type: Boolean }) public bold: boolean

  @Prop({ type: Boolean }) public uppercase: boolean

  /** The desired color class. */
  public get colorClass () : string {
    return (
      this.primary ? 'has-text-primary' :
      this.secondary ? 'has-text-secondary' :
      this.white ? 'has-text-white' :
      this.whiteTer ? 'has-text-grey-white-ter' :
      this.greyLighter ? 'has-text-grey-lighter' :
      this.greyLight ? 'has-text-grey-light' :
      this.grey ? 'has-text-grey' :
      this.black ? 'has-text-grey-dark' :
      ''
    )
  }

  /** The desired font family class. */
  public get familyClass () : string {
    return (
      this.familySecondary ? 'has-family-secondary' : ''
    )
  }

  /** The desired weight class. */
  public get weightClass () : string {
    return (
      this.bold ? 'has-text-weight-bold' : ''
    )
  }

  /** The desired font size class. */
  public get sizeClass () : string {
    return (
      this.small ? 'is-size-7' :
      this.medium ? 'is-size-5' :
      this.big ? 'is-size-4' :
      this.huge ? 'is-size-3' : ''
    )
  }

  /** The desired font transform class. */
  public get transformClass () : string {
    return (
      this.uppercase ? 'is-uppercase' : ''
    )
  }

}
</script>
