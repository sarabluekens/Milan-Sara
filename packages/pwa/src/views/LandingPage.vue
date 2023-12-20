<template class="h-100vh">
  <section
    class="ml-5rem bg-beige w-auto flex flex-row-reverse items-center justify-center"
  >
    <h1 class="title-red">
      Welcome to <br /><span class="text-10rem">Fist aid </span>
    </h1>
    <img
      src="/redCross.svg"
      alt="logo"
      class="w-20vw h-auto"
      width="100"
      height="100"
    />
  </section>
  <section>
    <h2 class="subtitle-red">Which event are you attending?</h2>
    <p class="label-red text-center">Chooste the event you are currently at.</p>

    <div
      v-if="!eventsLoading && events.length > 0"
      v-for="item in eventsLoading"
    ></div>
  </section>
</template>
<script setup lang="ts">
import { GET_EVENT_BY_DATE } from '@/graphql/event.query'
import EventCard from '../components/generic/EventCard.vue'
import { useQuery } from '@vue/apollo-composable'
// findAllToday
const {
  loading: eventsLoading,
  result: events,
  error: eventsError,
} = useQuery(GET_EVENT_BY_DATE)
</script>
