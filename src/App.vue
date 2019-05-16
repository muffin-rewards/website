<template>
  <div>

    <div v-show="!isViewLoading">
      <router-view/>

      <footer class="footer has-text-centered">
        <a
          @click="faqsActive = true"
          class="title is-underlined is-3 has-text-white"
        >FAQs</a>
      </footer>

      <Faqs :active="faqsActive" @close="faqsActive = false"></Faqs>
    </div>

    <div v-show="isViewLoading" class="spinning-wheel"></div>

  </div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class'
import Faqs from '@/components/takeovers/Faqs.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { Faqs },
})
export default class extends Vue {

  /**
   * Whether a spinning wheel should be displayed.
   */
  @Getter('isViewLoading')
  public isViewLoading: boolean

  /**
   * Whether FAQs takeover is active.
   * TODO: Extract to store?
   */
  public faqsActive: boolean = false

}
</script>

<style lang="sass">
@import assets/sass/app
</style>
