<template>
  <section class="ml-5rem bg-beige h-100vh w-auto">
    <div class="flex flex-row-reverse items-center justify-center">
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
    </div>
  </section>
  <section>
    <p class="subtitle-red">Which event are you attending?</p>
    <p class="label-red text-center">Chooste the event you are currently at.</p>
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
