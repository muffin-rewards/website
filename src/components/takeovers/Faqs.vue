<template>
  <TakeOver :active="active" @close="$emit('close')">
    <template #title>
      <p class="title is-3 has-text-white">FAQs</p>
    </template>

    <template #body>
      <div class="content">
        <p>
          <b>What is Muffin?</b><br>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat debitis, unde autem consectetur dolore.
        </p>

        <p>
          <b>What is Muffin?</b><br>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat debitis, unde autem consectetur dolore.
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
