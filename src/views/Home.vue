<template>
  <div>
    <header>
      <div class="container">
        <nav class="nav" role="navigation" aria-label="main navigation">
          <div class="nav-menu">
            <router-link class="nav-item" :to="{ name: 'home' }">
              <img src="@/assets/images/muffin-logo.png" alt="Muffin">
            </router-link>
          </div>
        </nav>
      </div>
    </header>

    <main class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <span class="title has-text-white is-hidden-mobile">Search</span>

            <div class="search">
              <p class="control has-icons-left has-icons-right">
                <input
                  type="text"
                  v-model="search"
                  placeholder="Find a location..."
                  class="input search-input is-large has-background-black-ter is-size-6"
                >
                <span class="icon is-small is-left is-hidden-mobile">
                  <i class="fa-search fas"></i>
                </span>
                <span class="icon is-small is-right is-hidden-tablet">
                  <i class="fa-search fas"></i>
                </span>
              </p>
            </div>
          </div>

          <div class="column">
            <div
              style="padding-top: 1.5em"
              v-if="rewards.length === 0"
              class="has-text-centered"
            >
              <div class="title has-text-white">No Results Found</div>
              <div class="subtitle has-text-white">
                Sorry, we couldn't find any offers including
                "{{ search }}".
              </div>
            </div>
            <router-link
              v-else
              class="reward"
              v-for="reward in rewards"
              :key="reward.slug"
              :to="{ name: 'reward', params: { slug: reward.slug } }"
            >
              <figure class="image is-2by1">
                <img :src="reward.image" :alt="reward.promoterName">
              </figure>

              <div class="reward-title">
                <span class="has-text-weight-bold">
                  <Icon>award</Icon>
                  {{ reward.name }}
                </span>
              </div>

              <div class="reward-promoter">
                <span class="has-text-weight-bold">
                  <Icon fas>map-marker-alt</Icon>
                  {{ reward.promoterName }}
                </span>
              </div>
            </router-link>
          </div>
        </div>
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
   * Search pattern that filters rewards.
   */
  public search: string = ''

  /**
   * The reward list Vuex getter.
   */
  @Getter('rewardList')
  public allRewards: Reward[]

  /**
   * Lists active rewards
   */
  public get rewards () : Reward[] {
    return this.search
      ? this.allRewards.filter(r => this.doesMatch(r))
      : this.allRewards
  }

  /**
   * Fuzzy matches reward against search input.
   */
  private doesMatch (reward: Reward) : boolean {
    return new RegExp(this.search, 'i').test(
      `${reward.name} ${reward.details} ${reward.promoterName}`,
    )
  }

}
</script>
