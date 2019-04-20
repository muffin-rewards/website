<template>
  <TakeOver :active="active" @close="$emit('close')">
    <template #title>
      <p class="title is-3 has-text-white">Offer Information</p>
    </template>

    <template #head>
      <p>
        <Icon>map-marker-alt</Icon>
        &nbsp;
        <Out>{{ reward.promoterName }}</Out>
      </p>

      <p>
        <Icon>award</Icon>
        &nbsp;
        <Out>{{ reward.name }}</Out>
      </p>
    </template>

    <template #body>
      <div class="content">
        <ul>
          <li
            v-for="(item, key) in reward.termsAndConditions"
            :key="key"
          >{{ item }}</li>
        </ul>
      </div>
    </template>

    <template #foot>
      <Action secondary block large @click="$emit('close')">Close</Action>
    </template>
  </TakeOver>
</template>

<script lang="ts">
import { Reward } from '@/types/models/Reward'
import TakeOver from '@/components/TakeOver.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: { TakeOver },
})
export default class extends Vue {

  /**
   * Whether the take over is active.
   */
  @Prop(Boolean)
  public active: boolean

  /**
   * Reward info.
   */
  @Prop(Object)
  public reward: Reward

}
</script>
