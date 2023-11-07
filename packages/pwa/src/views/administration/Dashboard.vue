<template>
  <div>
    <h1 class="title-black">
      Good to see you again, {{ firebaseUser?.displayName }}
    </h1>

    <section
      class="flex sm:h-20vh h-24vh sm:flex-row sm:justify-evenly sm:w-48vw m-auto h-"
    >
      <div class="flex border-4 h-32 w-72 p-2 border-red rounded-xl">
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full border-red rounded-xl"
        >
          <h3 class="subtitle-black">2</h3>
          <p class="text-black">Succesful events</p>
        </div>
      </div>
      <div class="flex border-4 h-32 w-72 p-2 border-red rounded-xl">
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full border-red rounded-xl"
        >
          <h3 class="subtitle-black">725</h3>
          <p class="text-black">Completed cases</p>
        </div>
      </div>
      <div class="flex border-4 h-32 w-72 p-2 border-red rounded-xl">
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full border-red rounded-xl"
        >
          <h3 class="subtitle-black">28</h3>
          <p class="text-black">Pending events</p>
        </div>
      </div>
    </section>
    <section class="flex sm:flex-row sm:justify-evenly sm:w-64vw m-auto">
      <div class="bg-beige w-full h-52vh rounded-xl">
        <div class="flex flex-row justify-between mx-6 mt-6 mb-8 body-black">
          <p>Pending events</p>
          <p>All events</p>
        </div>
        <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
          <p class="col-span-2">Date added</p>
          <p class="col-span-6">Event name</p>
          <p class="col-span-1">Status</p>
        </div>
        <div v-if="eventsLoading">Loading</div>
        <div v-if="eventsError">{{ eventsError }}</div>
        <div
          v-if="events"
          v-for="event in events.events"
          class="grid mx-6 p-2 mb-2 bg-white grid-cols-10 gap-1 h-10 subbody-black"
        >
          <p class="col-span-2">{{ event.createdAt }}</p>
          <p class="col-span-6">{{ event.name }}</p>
          <p class="col-span-1">Pending</p>
          <p class="h-6 px-2 w-auto bg-red subbody-white col-span-1">
            event details
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'
import { useQuery } from '@vue/apollo-composable'
import { ALL_EVENT } from '../../graphql/event.query'

export default {
  setup() {
    // Composable
    const { firebaseUser } = useFirebase()

    const {
      loading: eventsLoading,
      result: events,
      error: eventsError,
    } = useQuery(ALL_EVENT)

    return {
      firebaseUser,
      eventsLoading,
      eventsError,
      events: events,
    }
  },
}
</script>
