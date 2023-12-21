<template class="h-full relative">
  <div class="bg-red h-100vh sm:ml-5rem">
    <h1 class="title-beige md:pt-2rem">{{ $t('home.title') }}</h1>
    <section
      class="flex gap-3 sm:h-62vh h-80vh sm:h-90vh lg:flex-row flex-col sm:justify-evenly md:justify-start"
    >
      <div
        @click="clickHandler('/walk/')"
        class="p-4 bg-beige mx-auto sm:m-auto md:my-2 lg:my-5vh w-90% sm:w-70% h-45% md:h-40% lg:w-40vw lg:h-60vh rounded-lg px-8 flex flex-col justify-evenly items-center"
      >
        <h2 class="subtitle-red">{{ $t('home.card.walk') }}</h2>
        <img
          src="/canWalk.svg"
          alt="Running shoes speeding off Icon"
          class="h-3/4"
        />
      </div>
      <div
        @click="clickHandler('/category/')"
        class="p-4 bg-beige mx-auto sm:m-auto md:my-2 lg:my-5vh w-90% sm:w-70% h-45% md:h-40% lg:w-40vw lg:h-60vh rounded-lg px-8 flex flex-col justify-evenly items-center"
      >
        <h2 class="subtitle-red">{{ $t('home.card.cant.walk') }}</h2>

        <img
          src="/cantWalk.svg"
          alt="Broken running shoes Icon"
          class="h-3/4"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const { push } = useRouter()
const router = useRouter()

const clickHandler = async (path: string) => {
  push({ path: '/category/' + router.currentRoute.value.params.eventId })
  push({ path: path + router.currentRoute.value.params.eventId })
}
</script>
