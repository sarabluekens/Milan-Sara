<template>
  <section>
    <div @click="handleClick(event.id)">
      <h1 class="label-beige text-center p-3 h-8rem">{{ event.name }}</h1>
      <img
        class="w-full h-20vh"
        :src="'/' + event.category + '.svg'"
        alt="event icon based on category"
        width="30"
        height="30"
      />
      <p class="body-beige text-center p-4">{{ event.city }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Event } from '@/interfaces/event.interface'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const props = defineProps<{
  event: Event
}>()

const handleClick = (id: string) => {
  console.log(id)
  push({ name: 'home', params: { id } })
}
</script>
