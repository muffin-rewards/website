<template>
  <TakeOver :active="active" @close="$emit('close')">
    <template #title>
      <p class="title is-3 has-text-white">FAQs</p>
    </template>

    <template #body>
      <div class="content">
        <p>
          <b>What is Muffin?</b><br>
          Muffin works with venues to let them reward customers who are posting on social media. You can receive freebies in exchange for a post on Instagram. If you would like to find out more, contact us <a href="mailto:hello@getmuffin.co.uk">here</a>. 
        </p>

        <p>
          <b>Does everyone on my table get the reward?</b><br>
          Only the person who made the Instagram post can claim the reward. If all table members make a Instagram post at the venue, including the mention of the venue account handle, they all can claim their reward.
        </p>

        <p>
          <b>Why can’t Muffin find my post?</b><br>
          There are three main reasons why Muffin won’t be able to find your post.

          <ol>
            <li>You have made an Instagram story not post</li>
            <li>You have not mentioned the account handle in the caption</li>
            <li>You connected an account that is different to the one posting the image. Check which account you connected by tapping <a href="https://www.instagram.com/accounts/edit/" target="_blank">here</a>.</li>
          </ol>
        </p>

        <p>
          <b>Can I claim the reward without buying anything?</b><br>
          No, only paying customers can redeem the reward. Tap the “Information” button on the offer page to read all offer terms and conditions.
        </p>

        <p>
          <b>I run a restaurant, how can I signup to Muffin?</b><br>
          Great! We are offering free trials to every venue that signs up in April and May. Contact us <a href="mailto:hello@getmuffin.co.uk">here</a> to find out more.
        </p>

        <p>
          <b>How long does it take for me to get my rewards?</b><br>
          Instantly! Once you have made an Instagram post at the venue, including the mention of the venue account handle, tap the "Find post" button to immediately be shown the reward.
        </p>
      </div>
    </template>

    <template #foot>
      <Action secondary block large @click="$emit('close')">Close</Action>
    </template>
  </TakeOver>
</template>

<script lang="ts">
import TakeOver from '@/components/TakeOver.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: { TakeOver },
})
export default class extends Vue {

  /**
   * Whether the take over is active.
   */
  @Prop(Boolean)
  public active: boolean

}
</script>
