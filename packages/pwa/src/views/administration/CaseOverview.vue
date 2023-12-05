<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black">Case overview</h1>
    <section class="flex sm:flex-row sm:justify-evenly sm:w-64vw m-auto">
      <div class="bg-beige w-full h-52vh rounded-xl">
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-8 body-black border-b border-red"
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
        <div class="subbody-black bg-white mx-6 mt-6 mb-8" v-if="OpenCases">
          No open cases at the moment
        </div>
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-8 body-black border-b border-red"
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
        <div class="subbody-black bg-white mx-6 mt-6 mb-8" v-if="OngoingCases">
          No ongoing cases at the moment
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
        <div class="subbody-black bg-white mx-6 mt-6 mb-8" v-if="ClosedCases">
          No closed cases at the moment
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
