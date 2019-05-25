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
                <Stateful :trigger="connectInstagram" ref="connectInstagram">
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

                  <template #succeeded="{ fire, data }">
                    <form class="control" @submit.prevent="fire">
                      <Action success large block>
                        <Out bold><Icon>check-circle</Icon></Out>
                        &nbsp;&nbsp;
                        <Out bold>Account Connected</Out>
                      </Action>
                    </form>
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
                        <Out bold v-text="findPostError"></Out>
                      </Action>
                    </template>

                    <template #succeeded>
                      <Action success large inactive block>
                        <Out bold><Icon>check-circle</Icon></Out>
                        &nbsp;&nbsp;
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

                  <div class="voucher-foot" v-if="!claimed">
                    <Action large block class="has-text-purple" @click="claim">
                      <Out bold><Icon>user-tie</Icon></Out>
                      &nbsp;&nbsp;
                      <Out bold>Claim Reward</Out>
                    </Action>
                  </div>

                  <div class="voucher-foot" v-else>
                    <Action
                      large block dark
                      class="has-background-black-ter has-text-white"
                    >
                      <Out bold><Icon>check-circle</Icon></Out>
                      &nbsp;&nbsp;
                      <Out bold>Reward Claimed</Out>
                    </Action>
                  </div>
                    <!-- <div></div>
                    <p class="is-flex-aligned">
                      jonnymatthews_
                      &nbsp;
                      <i class="fab fa-instagram"></i>
                    </p> -->
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
import RewardInfo from '@/components/takeovers/RewardInfo.vue'
import { default as Stateful, State} from '@/components/Stateful.vue'

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
   * Whether the reward was already claimed.
   */
  public claimed: boolean = false

  /**
   * Error message that is displayed on the error button. This is dynamically
   * changed based on the error received from the APIs.
   */
  public findPostError: string = 'Try Again'

  /**
   * Mounted lifecycle hook checks for existence of token in the localStorage.
   */
  public mounted () : void {
    this.claimed = !!localStorage.getItem(`reward-timeout-${this.reward.slug}`)

    const token: string = localStorage.getItem('token')

    if (!token) {
      return
    }

    if (token === 'error') {
      return (this.$refs.connectInstagram as Stateful).setState(State.FAILED)
    }

    (this.$refs.connectInstagram as Stateful).setState(State.SUCCEEDED)
    this.postingLocked = false
  }

  /**
   * Functionality to connec the user's Instagram account.
   */
  public async connectInstagram (data: { handle: string }) : Promise<void> {
    localStorage.removeItem('token')
    localStorage.setItem('slug', this.reward.slug)

    window.location.href =
      `https://api.instagram.com/oauth/authorize/?client_id=` +
      `9a3d541ecf8d4fcfba7a1b6af94ecfe3&redirect_uri=${location.origin}` +
      `/auth/instagram&response_type=token&hl=en`

    // TODO: Set this in the config.
    return new Promise((_, reject) => setTimeout(reject, 10000))
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
      .catch(({ body }) => {
        this.findPostError = body.label

        return Promise.reject()
      })
      .then(() => this.voucherLocked = false)
  }

  /**
   * Claims the reward making it inactive.
   */
  public claim () : void {
    if (!confirm(`Confirm you're a member of staff. After tapping ‘OK’ the reward will have been redeemed.`)) {
      return
    }

    localStorage.setItem(`reward-timeout-${this.reward.slug}`, String(Date.now()))

    this.claimed = true
  }
}
</script>
