<template class="h-100vh">
  <section
    class="ml-5rem pt-3 bg-beige w-auto flex flex-row-reverse items-center justify-center"
  >
    <h1 class="title-red leading-none">
      Welcome to <br /><span class="text-8rem">Fist aid </span>
    </h1>
    <img
      src="/redCross.svg"
      alt="logo"
      class="w-20vw h-auto"
      width="100"
      height="100"
    />
  </section>
  <section class="ml-7rem mt-3rem">
    <h2 class="subtitle-red text-left">Which event are you attending?</h2>
    <p class="body-black text-left pb-4">
      Chooste the event you are currently at.
    </p>

    <div class="flex flex-wrap flex-row">
      <div
        class="w-2/9 m-2 h-2/5 bg-red rounded-lg flex items-center justify-evenly"
        v-if="!eventsLoading && tempEvents.length > 0"
        v-for="item in tempEvents"
      >
        <EventCard :event="item" />
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { GET_EVENT_BY_DATE } from '@/graphql/event.query'
import EventCard from '../components/EventCard.vue'
import { useQuery } from '@vue/apollo-composable'
// findAllToday
const {
  loading: eventsLoading,
  result: events,
  error: eventsError,
} = useQuery(GET_EVENT_BY_DATE)

const tempEvents = [
  {
    name: 'Belgie - Nederland',
    category: 'Sport',
    city: 'Gent',
  },
  {
    name: 'Tomrrowland Winter Edition',
    category: 'Festival',
    city: 'Boom',
  },
  {
    name: 'Boekenbeurs Eutopia',
    category: 'Expo',
    city: 'Antwerpen',
  },
  {
    name: "Panic at the disco's concert",
    category: 'Concert',
    city: 'Brussel',
  },
]
</script>
