<template>
  <div>
    <router-view/>

    <footer class="footer has-text-centered">
      <a class="title is-underlined is-3 has-text-white" @click="faqsActive = true">FAQs</a>
    </footer>

    <Faqs :active="faqsActive" @close="faqsActive = false"></Faqs>
  </div>
</template>

<script lang="ts">
import Faqs from '@/components/takeovers/Faqs.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: { Faqs },
})
export default class extends Vue {

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
