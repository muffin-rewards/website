<template>
  <div>
    <header>
      <nav class="nav" role="navigation" aria-label="main navigation">
        <div class="nav-menu">
          <router-link class="nav-item" :to="{ name: 'home' }">
            <img src="@/assets/images/muffin-logo.png" alt="Muffin">
          </router-link>
        </div>
        <div class="nav-spacer"></div>
      </nav>
    </header>

    <main class="section">
      <div class="container">

        <router-link
          class="reward"
          v-for="reward in rewards"
          :key="reward.slug"
          :to="{ name: 'reward', params: { slug: reward.slug } }"
        >
          <figure class="image is-2by1">
            <img :src="reward.image" :alt="reward.promoterName">
          </figure>

          <div class="reward-title">
            {{ reward.name }}
            <span class="has-text-primary has-text-weight-bold">@ </span>
            <span class="has-text-weight-bold">{{ reward.promoterName }}</span>
          </div>
        </router-link>

      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class'
import { Reward } from '@/types/models/Reward'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class extends Vue {

  /**
   * The reward list Vuex getter.
   */
  @Getter('rewardList')
  public rewards: Reward[]

}
</script>
