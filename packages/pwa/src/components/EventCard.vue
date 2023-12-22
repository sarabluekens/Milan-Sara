<template>
  <section class="cursor-pointer">
    <div @click="handleClick(event.id)" class="lg:h-20rem">
      <h1 class="label-beige text-center p-3 h-4rem md:h-5rem lg:h-6rem">{{ event.name }}</h1>
      <img
        class="m-auto"
        :src="'/' + event.category + '.svg'"
        alt="event icon based on category"
        width="200"
        height="220"
      />
      <p class="body-beige text-center p-4">Locatie: {{ event.city }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { EventCard } from '@/interfaces/event.interface'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const props = defineProps<{
  event: EventCard
}>()

const handleClick = (id: string) => {
  push({ path: `/Home/${id}` })
}
</script>
