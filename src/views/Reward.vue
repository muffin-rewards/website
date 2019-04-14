<template>
  <div>
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

    <section class="section is-pulled-up-touch">
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

                <p class="subtitle is-7">
                  <!-- TODO: Details -->
                  <Out grey-light>
                    Offer Information <Icon small>info-circle</Icon>
                  </Out>
                </p>
              </template>

              <template #body>
                <div class="content"></div>

                <Stateful :trigger="findPost">
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
                    <Action secondary large loading block></Action>
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

                <p
                  style="padding-top: 5px"
                  class="has-text-grey is-size-7 has-text-centered"
                >
                  By connecting your account, you agree to our
                  <router-link
                    :to="{ name: 'privacy' }"
                    class="has-text-grey has-text-underlined"
                  >Privacy Policy</router-link>.
                </p>
              </template>
            </Step>

          </div>
          <div class="column">

            <!--
              -- Step 2
            -->

            <Step :locked="consentLocked">
              <template #step>2</template>
              <template #title>Make in Instagram Post</template>
              <template #subtitle>To qualify for the reward:</template>

              <template #body="{ locked }">
                <p>
                  <Out secondary><Icon>map-marker-alt</Icon></Out>
                  <Out grey-light>Post a photo at {{ reward.promoterName }}</Out>
                </p>

                <p>
                  <Out secondary><Icon>comment-alt</Icon></Out>
                  <Out grey-light>Tag <Out white bold>@{{ reward.promoter }}</Out> in the caption</Out>
                </p>

                <p>
                  <Out secondary><Icon>th</Icon></Out>
                  <Out grey-light><Out white bold>Make a post,</Out> not a story!</Out>
                </p>

                <div v-if="!locked && post.isSome()">

                  <!-- Extract a post component. -->
                  <div class="post">
                    <figure class="image is-1by1">
                      <img :src="post.unwrap().url" :alt="post.unwrap().caption">
                    </figure>

                    <div class="post-author is-flex-aligned">
                      {{ post.unwrap().user }}
                      &nbsp;
                      <i class="fab fa-instagram"></i>
                    </div>

                    <div class="post-comment is-flex-aligned">
                      {{ post.unwrap().caption }}
                    </div>
                  </div>

                  <Stateful :trigger="consent">
                    <template #initial="{ fire }">
                      <Action secondary large block @click="fire">
                        <Out bold><Icon>handshake</Icon></Out>
                        &nbsp;&nbsp;
                        <Out bold>Yes, sure!</Out>
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
                        <Out bold>Thanks! We'll let them know</Out>
                      </Action>
                    </template>
                  </Stateful>
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
                    <div></div>
                    <p class="is-flex-aligned">
                      jonnymatthews_
                      &nbsp;
                      <i class="fab fa-instagram"></i>
                    </p>
                  </div>
                </div>
              </template>
            </Step>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Step from '@/components/reward/Step.vue'
import Stateful from '@/components/Stateful.vue'

import { mentions } from '@/awi'
import { Getter } from 'vuex-class'
import { Optional, Some, None, ResponseType } from 'awi'
import { Post } from '@/types/models/Post'
import { Reward } from '@/types/models/Reward'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { Stateful, Step },
})
export default class extends Vue {

  /**
   * The current reward Vuex getter.
   */
  @Getter('currentReward')
  public reward: Reward

  /**
   * The post to be used for the reward redemption.
   */
  public post: Optional<Post> = new None()

  /**
   * Whether the consent step is locked.
   */
  public consentLocked: boolean = true

  /**
   * Whether the voucher step is locked.
   */
  public voucherLocked: boolean = true

  /**
   * Functionality to find the post.
   */
  public async findPost (data: { handle: string }) : Promise<void> {
    await mentions()
      .body<Post>(`muffinrewards/find/${data.handle.replace('@', '')}`)
      .then(post => this.post = new Some(post))
      .then(() => this.consentLocked = false)
  }

  /**
   * Functionality to consent rights.
   */
  public async consent () : Promise<void> {
    await mentions()
      .post(`muffinrewards/redeem/${this.post.unwrap().user}`)
      // TODO: Remove.
      .catch(() => undefined)
      .then(() => this.voucherLocked = false)
  }

}
</script>
