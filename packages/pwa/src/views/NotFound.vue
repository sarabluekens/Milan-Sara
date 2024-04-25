<template>
  <div class="ml-5rem">
    <h1 class="subtitle-red">
      Sherlock is still looking for this missing page!
    </h1>
    <p class="subtitle-pink pb-2">What help do you need?</p>
    <!-- A basic anchor icon from Phosphor icons -->

    <div
      class="w-full flex items-center justify-center gap-x-4 text-4xl p-2 mt-4"
    ></div>
    <div
      class="i-mdi-magnify hover:i-game-icons-sherlock-holmes hover:text-center m-auto text-center icon icon-11"
    ></div>

    <div class="flex">
      <button
        @click="push({ path: `/` })"
        class="bg-red m-auto rounded-md px-10 py-3 body-white mt-3vh right-0"
      >
        Go to home
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const { push } = useRouter()
</script>
