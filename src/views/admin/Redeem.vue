<template>
  <div>
    <nav class="nav" role="navigation" aria-label="main navigation">
      <div class="nav-menu">
        <div class="nav-item">
          <img src="@/assets/images/muffin-logo.png" alt="Muffin">
        </div>
      </div>
      <div class="nav-spacer"></div>
      <div class="nav-menu">
        <div class="nav-item has-text-primary">
          <span class="nav-burger"></span>
        </div>
      </div>
    </nav>

    <section class="section">
      <div class="columns is-centered">
        <div class="column is-4">
          <div class="step box has-text-centered">
            <div v-if="stage === 'loading'">
              <button class="button is-large is-transparent is-loading"></button>
            </div>
            <div v-if="stage === 'success'">
              <p class="has-text-white has-text-weight-bold">REWARD APPROVED</p>
              <br>
              <p class="is-size-2 has-text-success">
                <i class="fas fa-check-circle fa-2x"></i>
              </p>
              <br>
              <h1 class="title is-4">One Free Smoothie</h1>
              <p class="subtitle is-6 has-text-grey-light">This is a valid reward. You can honour one tropical strawberry and blueberry smoothie!</p>
            </div>
            <div v-if="stage === 'failure'">
              <p class="has-text-white has-text-weight-bold">REWARD INVALID</p>
              <br>
              <p class="is-size-2 has-text-danger">
                <i class="fas fa-times-circle fa-2x"></i>
              </p>
              <br>
              <h1 class="title is-4">One Free Smoothie</h1>
              <p class="subtitle is-6 has-text-grey-light">This reward has already been redeemed or has not been issued yet.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data: () => ({
    stage: 'loading'
  }),

  mounted () {
    this.$store.dispatch('rewards/adminRedeem', this.$route.query.code)
      .then(() => this.stage = 'success')
      .catch(() => this.stage = 'failure')
  }
}
</script>
