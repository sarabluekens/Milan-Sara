<template>
  <section class="bg-beige h-100vh">
    <section class="sm:ml-5rem">
      <div class="w-95vw flex items-center justify-center flex-col">
        <div v-if="!flickering">
          <h1 class="title-red">{{ $t('flicker.title') }}</h1>
          <p class="body-black w-2/3 text-center m-auto py-3rem">
            {{ $t('flicker.text') }}
          </p>
          <div class="w-1/4 m-auto">
            <button
              class="bg-red rounded-md px-10 py-3 body-white"
              @click="handleClick"
            >
              {{ $t('flicker.button') }}
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="flickering"
        class="w-95vw flex items-center justify-center flex-col"
      >
        <button
          class="bg-white rounded-md px-10 py-3 body-red absolute top-2/5 z-1"
          @click="handleClick"
        >
          {{ $t('flicker.button.stop') }}
        </button>

        <div
          class="animate-flash w-95vw h-100vh bg-red m-auto z-0 important-animate-count-infinite"
        ></div>
      </div>
    </section>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const flickering = ref(false)

const handleClick = () => {
  console.log(flickering.value)

  flickering.value = !flickering.value
}
</script>
<style></style>
