<template>
  <div>
    <h2 class="title has-text-white">How Muffin Works</h2>

    <div class="step">
      <div class="step-body">
        <div
          class="columns"
          style="align-items: center"
          :key="i"
          v-for="(step, i) in steps"
        >
          <div class="step-icon">
            <Icon
              :fas="step.icon.collection === 'fas'"
              :fab="step.icon.collection === 'fab'"
            >{{ step.icon.name }}</Icon>
          </div>

          <div class="column">
            <section>
              <Out small secondary bold>STEP {{ i + 1 }}</Out>

              <h3 class="title is-5 has-text-white" v-text="step.title"></h3>

              <p
                v-text="step.description"
                class="subtitle is-7 has-text-grey-light"
              ></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface Step {

  /**
   * Subtitle for a step.
   */
  description: string

  /**
   * Icon accompanying the step.
   */
  icon: {
    collection: 'fas' | 'fab',
    name: string,
  }

  /**
   * Will be used as `h3`.
   */
  title: string

}

@Component
export default class extends Vue {

  /**
   * Defines all steps that have to be take in order to redeem a reward.
   */
  public steps: Step[] = [
    {
      description: 'Browse the offers and select a venue.',
      icon: {
        collection: 'fas',
        name: 'search-location',
      },
      title: 'Select Offer',
    },
    {
      description: 'We need to connect with your Instagram to verify your post.',
      icon: {
        collection: 'fab',
        name: 'instagram',
      },
      title: 'Connect Instagram',
    },
    {
      description: 'Open Instagram and post a photo in the venue - you must mention the venues @handle in the caption.',
      icon: {
        collection: 'fas',
        name: 'image',
      },
      title: 'Make an Instagram Post',
    },
    {
      description: 'Show the voucher to a member of staff and claim your reward.',
      icon: {
        collection: 'fas',
        name: 'award',
      },
      title: 'Claim Reward',
    },
  ]

}
</script>
