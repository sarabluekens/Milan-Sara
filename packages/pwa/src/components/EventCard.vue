<template>
  <div
    class="grid mx-6 p-2 mb-2 bg-white grid-cols-10 gap-1 h-10 subbody-black rounded-lg"
  >
    <p class="col-span-2">{{ event.createdAt }}</p>
    <p class="col-span-6">{{ event.name }}</p>
    <p class="col-span-1">{{ event.status }}</p>
    <button
      @click="handleDetails(event.id)"
      class="h-6 px-2 w-auto bg-red rounded-md subbody-white col-span-1"
    >
      event details
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
