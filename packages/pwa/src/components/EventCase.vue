<template>
  <div
    class="grid mx-6 p-2 mb-2 bg-white grid-cols-10 gap-1 h-10 md:subbody-black rounded-lg"
  >
    <p class="hidden xl:flex col-span-2">{{ event.createdAt }}</p>
    <p class="col-span-10 md:col-span-8 xl:col-span-6 text-sm">
      {{ event.name }}
    </p>
    <p class="hidden xl:flex col-span-1">{{ event.status }}</p>
    <button
      @click="handleDetails(event.id)"
      class="hidden md:flex h-6 px-2 w-auto justify-center bg-red rounded-md subbody-white col-span-2 xl:col-span-1"
    >
      details
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Event } from '@/interfaces/event.interface'
import { useRouter } from 'vue-router'

const { push } = useRouter()

const props = defineProps<{
  event: Event
}>()

const handleDetails = (id: string) => {
  console.log('details: ' + id)
  push({ path: `/admin/event/detail/${id}` })
}

const event: Event = props.event
</script>
