<template>
  <div>
    <header class="hero temp-cubana-bg">
      <div class="hero-head">
        <nav class="nav" role="navigation" aria-label="main navigation">
          <div class="nav-menu">
            <router-link class="nav-item" :to="{ name: 'home' }">
              <img src="@/assets/images/muffin-logo.png" alt="Muffin">
            </router-link>
          </div>
          <div class="nav-spacer"></div>
          <div class="nav-menu">
            <div class="nav-item has-text-primary">
              <span class="nav-burger"></span>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <br><br>
        <h1 class="title is-4 has-text-white">Get a Free Smoothie</h1>
        <p class="subtitle is-6 has-text-white-ter">
          <span class="has-text-secondary"><i class="fas fa-map-marker-alt"></i></span>
          Cubana Smithfield
        </p>
      </div>
    </header>

    <section class="section">
      <div class="container">
        <h2 class="title is-6 has-text-white">
          <span class="has-text-primary"><i class="fas fa-tasks"></i></span>
          &nbsp;
          The Task
        </h2>
        <p class="subtitle is-6 has-text-white-ter has-text-weight-light" v-html="reward.title"></p>
        <p></p>
        <h2 class="title is-6 has-text-white">
          <span class="has-text-primary"><i class="fas fa-gift"></i></span>
          &nbsp;
          The Reward
        </h2>
        <p class="subtitle is-6 has-text-white-ter has-text-weight-light" v-html="reward.description"></p>
        <br>

        <div class="columns">
          <div class="column is-4">
            <div class="step box">
              <small class="has-text-weight-bold has-text-primary">STEP 1</small>
              <h3 class="title is-4">Connect Instagram</h3>
              <p class="subtitle is-6 has-text-weight-light">We need to connect with your Instagram to verify your post.</p>
              <button class="button is-secondary" @click="connectInstagram" v-if="stages.auth === 'active'">
                <i class="fab fa-instagram"></i>
                &nbsp;
                Connect Instagram
              </button>
              <button class="button is-secondary is-loading" v-if="stages.auth === 'pending'">
                <i class="fab fa-instagram"></i>
                &nbsp;
                Connect Instagram
              </button>
              <button class="button is-success" v-if="stages.auth === 'success'">
                <i class="fas fa-check"></i>
                &nbsp;
                Instagram Connected
              </button>
              <button class="button is-success" v-if="stages.auth === 'failure'">
                <i class="fas fa-times"></i>
                &nbsp;
                Connection Failed
              </button>
            </div>
          </div>

          <div class="column is-4">
            <div class="step box" :class="{ 'is-faded': stages.post === 'waiting' }">
              <span class="is-pulled-right has-text-white" v-show="stages.redeem === 'waiting'"><i class="fas fa-lock"></i></span>
              <small class="has-text-weight-bold has-text-primary">STEP 2</small>
              <h3 class="title is-4">Make Your Post</h3>
              <p class="subtitle is-6 has-text-weight-light">Post a photo of your food and come back here and tap below.</p>
              <button class="button is-grey" v-if="stages.post === 'waiting'">
                <i class="fas fa-image"></i>
                &nbsp;
                I've posted!
              </button>
              <button class="button is-secondary" @click="findPost" v-if="stages.post === 'active'">
                <i class="fas fa-image"></i>
                &nbsp;
                I've posted!
              </button>
              <button class="button is-secondary is-loading" v-if="stages.post === 'pending'">
                <i class="fab fa-instagram"></i>
                &nbsp;
                I've posted!
              </button>
              <button class="button is-success" v-if="stages.post === 'success'">
                <i class="fas fa-check"></i>
                &nbsp;
                Post Verified
              </button>
              <button class="button is-danger" @click="findPost" v-if="stages.post === 'failure'">
                <i class="fas fa-times"></i>
                &nbsp;
                Post Not Found
              </button>
            </div>
          </div>

          <div class="column is-4">
            <div class="step box" :class="{ 'is-faded': stages.redeem === 'waiting' }">
              <span class="is-pulled-right has-text-white" v-show="stages.redeem === 'waiting'"><i class="fas fa-lock"></i></span>
              <small class="has-text-weight-bold has-text-primary">STEP 3</small>
              <h3 class="title is-4">Claim Your Reward</h3>
              <p class="subtitle is-6 has-text-weight-light">Show the voucher below to your waiter/waitress to claim your discount.</p>

              <div id="qr-container" v-show="qrShown">
                <canvas ref="qr" height="200" width="200" id="qr"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import QR from 'qrcode'
import { mapState } from 'vuex'

export default {

  data: () => ({
    stages: {
      auth: 'active',
      post: 'waiting',
      redeem: 'waiting'
    },
    qrShown: false
  }),

  computed: mapState({
    reward: s => s.rewards.currentPromoter[0] || {}
  }),

  mounted () {
    this.$store.dispatch('rewards/loadPromoter', 'cubana')
  },

  methods: {
    connectInstagram () {
      this.stages.auth = 'pending'

      const authWindow = window.open(
        `https://api.instagram.com/oauth/authorize/?client_id=4b48b64761ae4d048d6ab2c85f56a654&redirect_uri=${location.origin}/auth/instagram&response_type=token`,
        'Connect Instagram',
        'width=500,height=500'
      )

      authWindow.addEventListener('message', this.authListener)
    },

    authListener (e) {
      if (e.origin !== location.origin) {
        return
      }

      if (e.data.action === 'auth.instagram.success') {
        localStorage.token = e.data.token

        this.stages.auth = 'success'
        this.stages.post = 'active'
      }

      if (e.data.action === 'auth.instagram.failure') {
        localStorage.token = e.data.token

        this.stages.auth = 'failure'
      }
    },

    async findPost () {
      this.stages.post = 'pending'

      await this.$store.dispatch('rewards/findPost', this.reward.id)

      let attempts = 0
      const lookupInterval = setInterval(async () => {
        let response = await this.$store.dispatch('rewards/checkResult', this.reward.id).catch(() => null)

        if (!response) {
          if (++attempts === 10) {
            this.stages.post = 'failure'
            clearInterval(lookupInterval)
          }

          return
        }

        this.stages.post = 'success'
        this.stages.redeem = 'active'

        await this.claimCode(response.data.content.code)

        clearInterval(lookupInterval)
      }, 1000)
    },

    claimCode (code) {
      QR.toCanvas(this.$refs.qr, `${location.origin}/admin/redeem?code=${code}`, () => { this.qrShown = true })
    }
  }
}
</script>
