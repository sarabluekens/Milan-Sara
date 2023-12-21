<template>
  <div class="md:ml-14rem bg-beige h-100vh">
    <h1 class="title-black">Case overview</h1>
    <section
      class="mt-3rem flex sm:flex-row sm:justify-evenly sm:w-64vw m-auto"
    >
      <div class="bg-beige w-full h-52vh rounded-xl">
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-4 xl:mb-8 body-black border-b border-red"
        >
          <p>Open cases</p>
          <div
            v-if="!OpenCases"
            @click="OpenCases = !OpenCases"
            class="i-ic-sharp-keyboard-arrow-down icon icon-2"
          ></div>
          <div
            v-if="OpenCases"
            @click="OpenCases = !OpenCases"
            class="i-ic-sharp-keyboard-arrow-up icon icon-2"
          ></div>
        </div>
        <div
          class="flex subbody-black bg-white mx-6 mt-6 mb-4 xl:mb-8 h-10 px-2 items-center rounded-lg"
          v-if="OpenCases"
        >
          <p>No open cases at the moment</p>
        </div>
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-4 xl:mb-8 body-black border-b border-red"
        >
          <p>Ongoing cases</p>
          <div
            v-if="!OngoingCases"
            @click="OngoingCases = !OngoingCases"
            class="i-ic-sharp-keyboard-arrow-down icon icon-2"
          ></div>
          <div
            v-if="OngoingCases"
            @click="OngoingCases = !OngoingCases"
            class="i-ic-sharp-keyboard-arrow-up icon icon-2"
          ></div>
        </div>
        <div
          class="flex subbody-black bg-white mx-6 mt-6 mb-8 h-10 px-2 items-center rounded-lg"
          v-if="OngoingCases"
        >
          <p>No ongoing cases at the moment</p>
        </div>
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-8 body-black border-b border-red"
        >
          <p>Closed cases</p>
          <div
            v-if="!ClosedCases"
            @click="ClosedCases = !ClosedCases"
            class="i-ic-sharp-keyboard-arrow-down icon icon-2"
          ></div>
          <div
            v-if="ClosedCases"
            @click="ClosedCases = !ClosedCases"
            class="i-ic-sharp-keyboard-arrow-up icon icon-2"
          ></div>
        </div>
        <div
          class="flex subbody-black bg-white mx-6 mt-6 mb-8 h-10 px-2 items-center rounded-lg"
          v-if="ClosedCases"
        >
          <p>No closed cases at the moment</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const OpenCases = ref(false)
    const OngoingCases = ref(false)
    const ClosedCases = ref(false)

    return {
      OpenCases,
      OngoingCases,
      ClosedCases,
    }
  },
}
</script>
