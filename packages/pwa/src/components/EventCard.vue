<template>
  <section class="cursor-pointer">
    <div @click="handleClick(event.id)">
      <h1 class="label-beige text-center p-3 h-8rem">{{ event.name }}</h1>
      <img
        class="w-full h-20vh"
        :src="'/' + event.category + '.svg'"
        alt="event icon based on category"
        width="30"
        height="30"
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
