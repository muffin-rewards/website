<template>
  <div>
    <header class="banner is-2by1" :style="{ 'background-image': `url(${reward.image})` }">
      <div class="banner-head">
        <button class="badge is-faded">
          <i class="fas fa-fw fa-arrow-left"></i>
        </button>
        <button class="badge is-padded">
          <i class="fas fa-map-marker-alt"></i>
          &nbsp;
          {{ reward.promoterName }}
        </button>
      </div>
    </header>

    <section class="section is-pulled-up">
      <div class="container">
        <div class="step">
          <div class="step-head">
            <p class="title is-3 has-text-white is-uppercase">
              {{ reward.name }}
            </p>

            <p class="subtitle is-7 has-text-grey-light">
              Show Details
              <!-- TODO: Details -->
              <i class="fas fa-angle-down"></i>
            </p>
          </div>

          <div class="step-body">
            <p class="step-count">STEP 1</p>

            <p class="title is-3 has-text-white">Make in Instagram Post</p>
            <p class="subtitle is-6 has-text-grey-light">To qualify for the reward:</p>

            <p class="has-text-grey-light">
              <i class="fas fa-fw fa-map-marker-alt has-text-secondary"></i>
              Post a photo at {{ reward.promoterName }}
            </p>

            <p class="has-text-grey-light">
              <i class="fas fa-fw fa-at has-text-secondary"></i>
              Tag <span class="has-text-white has-text-weight-bold">@{{ reward.promoter }}</span> in the caption
            </p>

            <div class="content"></div>

            <div class="control">
              <button class="addon button is-large is-static has-text-primary has-text-weight-bold">@</button>
              <input type="text" class="input is-large" placeholder="handle/username">
              <button class="addon button is-large is-secondary has-text-weight-bold">Find Post</button>
            </div>

            <button class="button is-large is-secondary is-fullwidth is-loading"></button>

            <button class="button is-large is-danger is-fullwidth is-inactive has-text-weight-bold">
              <i class="fas fa-exclamation-circle"></i>
              &nbsp;
              Try Again
            </button>

            <button class="button is-large is-success is-fullwidth is-inactive has-text-weight-bold">
              <i class="far fa-check-circle"></i>
              &nbsp;
              Post Found
            </button>
          </div>
        </div>

        <!-- <div class="step is-locked"> -->
        <div class="step">
          <div class="step-body">
            <p class="step-count">STEP 2</p>
            <p class="title is-3 has-text-white">Allow {{ reward.promoterName }} to Fetaure Your Photo</p>
            <p class="subtitle is-6 has-text-grey-light">{{ reward.promoterName }} might like to feature your photo. Tap below to give them permission.</p>

            <figure class="image">
              <img src="@/assets/images/photo-placeholder.png" alt="Photo Placeholder">
            </figure>

            <div class="post">
              <figure class="image is-1by1">
                <img src="@/assets/images/temp-lattes.png" alt="Reward Placeholder">
              </figure>

              <div class="post-author is-flex-aligned">
                jonnymatthews_
                &nbsp;
                <i class="fab fa-instagram"></i>
              </div>

              <div class="post-comment is-flex-aligned">
                One of the best latte’s I’ve ever had ☕️ need to go back 😫 @chelseacreperie ❤️
              </div>
            </div>

            <button class="button is-secondary is-large is-fullwidth has-text-weight-bold">
              <i class="fas fa-handshake"></i>
              &nbsp;
              Yes, sure!
            </button>

            <button class="button is-secondary is-large is-fullwidth is-loading"></button>

            <button class="button is-success is-large is-fullwidth is-inactive has-text-weight-bold">
              Thanks! We'll let them know
            </button>
          </div>
        </div>

        <div class="step">
          <div class="step-body">
            <p class="step-count">STEP 3</p>
            <p class="title is-3 has-text-white">Here's Your Reward</p>
            <p class="subtitle is-6 has-text-grey-light">Show the voucher below to your server to claim your reward.</p>
          </div>

          <div class="step-foot">
            <figure class="image is-3by2">
              <img src="@/assets/images/voucher-placeholder.png" alt="Voucher Placeholder">
            </figure>

            <div class="voucher">
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
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// import { mapState } from 'vuex'

export default {

  computed: {
    reward () {
      return this.$store.state.rewards.list.find(r => r.slug === this.$route.params.slug)
    }
  },

  // computed: mapState({
  //   reward: s => s.rewards.current
  // }),

  mounted () {
    this.$store.dispatch('rewards/list')
    // TODO: Change for rest apis.
    // this.$store.dispatch('rewards/show', this.$route.params.slug)
  }

}
</script>
