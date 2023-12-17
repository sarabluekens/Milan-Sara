<template>
  <section class=" bg-beige h-100vh">
    <section class="ml-5rem">
    <div class="w-80vw flex items-center justify-center flex-col">
      <div v-if="!flickering" class="w-70% py-3rem">
        <p class="body-red">
            <h1 class="title-red">Help is almost with you</h1>

          Press this button to make your screen flash bright red. This will help
          you stand out for the caregiver. Careful, epilepsy warning
        </p>
        <button
          class="bg-red rounded rounded-md px-10 py-3 body-white self-end mt-3vh"
          @click="handleClick"
        >
          Flicker screen
        </button>
      </div>
    </div>
    <div v-if="flickering">
        <button
          class="bg-white rounded rounded-md px-10 py-3 body-red self-end mt-3vh absolute top-2/5 left-3/7 z-1"
          @click="handleClick"
        >
          Stop flickering screen
        </button>
        <div class="animate-[flash_0.7s_ease-in-out_infinite] w-95vw h-100vh bg-red m-auto z-0">
            <img src="/whiteCross.svg" alt="" />
        </div>
    </div>
  </section>
</section>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Flicker from '@/components/Flicker.vue'

const flickering = ref(false)

const handleClick = () => {
  console.log(flickering.value)

  flickering.value = !flickering.value
}
</script>
<style></style>
