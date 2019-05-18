<template>
  <div>
    <div class="container">
      <header class="banner is-2by1" :style="{ 'background-image': `url(${reward.image})` }">
        <div class="banner-head">
          <router-link :to="{ name: 'home' }" class="badge is-faded">
            <Out white><Icon small>arrow-left</Icon></Out>
          </router-link>

          <span class="badge is-padded">
            <Out white><Icon small>map-marker-alt</Icon></Out>
            &nbsp;
            <Out white>{{ reward.promoterName }}</Out>
          </span>
        </div>
      </header>
    </div>

    <main class="section is-pulled-up-touch">
      <div class="container">
        <div class="columns">
          <div class="column">


            <!--
              -- Step 1
            -->

            <Step>
              <template #step>1</template>
              <template #title>Connect Instagram</template>
              <template #subtitle>
                We need to connect with your Instagram to verify your post.
              </template>

              <template #head>
                <h1 class="title is-3">
                  <Out white uppercase>{{ reward.name }}</Out>
                </h1>

                <p class="subtitle is-6">
                  <Out grey-lighter>
                    Make an Instagram post, mention
                    <Out bold>@{{ reward.promoter }}</Out>
                    and claim your reward.
                  </Out>
                </p>

                <Out grey-lighter bold @click="rewardInfoActive = true">
                  Offer Information
                  <Icon>info-circle</Icon>
                </Out>
              </template>

              <template #body>
                <Stateful :trigger="connectInstagram">
                  <template #initial="{ fire, data }">
                    <form class="control" @submit.prevent="fire">
                      <Action secondary large fullwidth>
                        <Icon fab>instagram</Icon>
                        &nbsp;&nbsp;
                        <Out bold>Connect Instagram</Out>
                      </Action>
                    </form>
                  </template>

                  <template #fired>
                    <Action secondary large fullwidth>
                      <Icon spins>spinner</Icon>
                      &nbsp;&nbsp;
                      <Out bold>Connecting Account</Out>
                    </Action>
                  </template>

                  <template #failed="{ fire, data }">
                    <form class="control" @submit.prevent="fire">
                      <Action danger large fullwidth>
                        <Out bold>Try Again</Out>
                      </Action>
                    </form>
                  </template>

                  <template #succeeded>
                    <Action success large block inactive>
                      <Out bold><Icon>check-circle</Icon></Out>
                      &nbsp;&nbsp;
                      <Out bold>Account Connected</Out>
                    </Action>
                  </template>
                </Stateful>

                <div class="spacer"></div>

                <p class="has-text-centered">
                  <Out grey small>
                    By connecting your account, you agree to our
                    <router-link :to="{ name: 'privacy' }">Privacy Policy</router-link>
                  </Out>
                </p>
              </template>
            </Step>

          </div>
          <div class="column">

            <!--
              -- Step 2
            -->

            <Step :locked="postingLocked">
              <template #step>2</template>
              <template #title>Make an Instagram Post</template>
              <template #subtitle>To qualify for the reward:</template>

              <template #body="{ locked }">
                <ul>
                  <li>
                    <Out secondary><Icon fixed>map-marker-alt</Icon></Out>
                    &nbsp;
                    <Out grey-light>Post a photo at {{ reward.promoterName }}</Out>
                  </li>

                  <li>
                    <Out secondary><Icon fixed>at</Icon></Out>
                    &nbsp;
                    <Out grey-light>Mention <Out white bold>@{{ reward.promoter }}</Out> in the caption</Out>
                  </li>

                  <li>
                    <Out secondary><Icon fixed>th</Icon></Out>
                    &nbsp;
                    <Out grey-light><Out white bold>Make a post,</Out> not a story!</Out>
                  </li>
                </ul>

                <div class="spacer"></div>

                <div v-if="!locked">
                  <Stateful :trigger="findPost">
                    <template #initial="{ fire }">
                      <Action secondary large block @click="fire">
                        <Out bold><Icon>image</Icon></Out>
                        &nbsp;&nbsp;
                        <Out bold>I've Posted!</Out>
                      </Action>
                    </template>

                    <template #fired>
                      <Action secondary large loading block></Action>
                    </template>

                    <template #failed="{ fire }">
                      <Action danger large block @click="fire">
                        <Out bold><Icon>exclamation-circle</Icon></Out>
                        &nbsp;&nbsp;
                        <Out bold>Try again</Out>
                      </Action>
                    </template>

                    <template #succeeded>
                      <Action success large inactive block>
                        <Out bold>Post Found</Out>
                      </Action>
                    </template>
                  </Stateful>

                  <div class="spacer"></div>

                  <Action dark large block el="a" :href="`instagram://camera`" target="_blank">
                    <Out bold><Icon>external-link-square-alt</Icon></Out>
                    &nbsp;&nbsp;
                    <Out bold>Open Instagram</Out>
                  </Action>
                </div>
              </template>
            </Step>

          </div>
          <div class="column">

            <!--
              -- Step 3
            -->

            <Step :locked="voucherLocked">
              <template #step>3</template>
              <template #title>Here's Your Reward</template>
              <template #subtitle>Show the voucher below to your server to claim your reward.</template>

              <template #foot="{ locked }">
                <figure class="image is-3by2" v-if="locked">
                  <img src="@/assets/images/voucher-placeholder.png" alt="Voucher Placeholder">
                </figure>

                <div class="voucher" v-else>
                  <div class="voucher-head">
                    <p class="title is-4 has-text-white">
                      <i class="fas fa-award"></i>
                      &nbsp;
                      {{ reward.name }}
                    </p>
                  </div>

                  <div class="voucher-body">
                    <div class="content">
                      <p class="has-text-weight-bold">Terms and conditions:</p>

                      <ul>
                        <li
                          v-for="(item, key) in reward.termsAndConditions"
                          :key="key"
                        >{{ item }}</li>
                      </ul>
                    </div>
                  </div>

                  <div class="voucher-foot">
                    &nbsp;
                    <!-- <div></div>
                    <p class="is-flex-aligned">
                      jonnymatthews_
                      &nbsp;
                      <i class="fab fa-instagram"></i>
                    </p> -->
                  </div>
                </div>
              </template>
            </Step>

          </div>
        </div>
      </div>
    </main>

    <RewardInfo
      :active="rewardInfoActive"
      @close="rewardInfoActive = false"
      :reward="reward"
    ></RewardInfo>
  </div>
</template>

<script lang="ts">
import Step from '@/components/reward/Step.vue'
import Stateful from '@/components/Stateful.vue'
import RewardInfo from '@/components/takeovers/RewardInfo.vue'

import { redeem } from '@/awis'
import { Getter } from 'vuex-class'
import { Reward } from '@/types/models/Reward'
import { Component, Vue } from 'vue-property-decorator'
import { Optional, Some, None, ResponseType } from 'awi'

@Component({
  components: { RewardInfo, Stateful, Step },
})
export default class extends Vue {

  /**
   * The current reward Vuex getter.
   */
  @Getter('currentReward')
  public reward: Reward

  /**
   * Whether reward info take over is active.
   */
  public rewardInfoActive: boolean = false

  /**
   * Whether the consent step is locked.
   */
  public postingLocked: boolean = true

  /**
   * Whether the voucher step is locked.
   */
  public voucherLocked: boolean = true

  /**
   * Functionality to connec the user's Instagram account.
   */
  public async connectInstagram (data: { handle: string }) : Promise<void> {
    // TODO: Revisit this...
    localStorage.removeItem('token')

    const tab: Window = window.open(
      `https://api.instagram.com/oauth/authorize/?client_id=` +
      `9a3d541ecf8d4fcfba7a1b6af94ecfe3&redirect_uri=${location.origin}` +
      `/auth/instagram&response_type=token&hl=en`,
      'Connect Instagram',
      'width=500,height=500',
    )

    await new Promise((resolve, reject) => {
      const interval: number = setInterval(() => {
        if (!localStorage.getItem('token')) {
          return
        }

        if (localStorage.getItem('token') === 'error') {
          reject()
        }

        clearInterval(interval)
        resolve()
      }, 500)
    })
      .then(() => this.postingLocked = false)

    try {
      tab.close()
    } catch {
      // Tab was already closed.
    }
  }

  /**
   * Functionality to find a post on the user's Instagram account.
   */
  public async findPost () : Promise<void> {
    await redeem()
      .use(async req => req.body = {
        token: localStorage.getItem('token'),
        promoter: this.reward.promoter,
        slug: this.reward.slug,
      })
      .post()
      .then(() => this.voucherLocked = false)
  }

}
</script>
