<template>
  <div class="md:ml-9rem bg-beige h-100vh">
    <h1 class="subtitle-black lg:title-black mb-4">
      Good to see you again, {{ firebaseUser?.displayName }}
    </h1>
    <section
      class="flex sm:h-20vh h-24vh sm:flex-row sm:justify-evenly sm:w-48vw m-auto md:gap-5"
    >
      <div
        class="md:flex border-4 h-32 w-72 md:w-80 md:text-center xl:w-72 p-2 border-red rounded-xl hidden"
      >
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full border-red rounded-xl"
        >
          <h3 v-if="eventsCompleted" class="subtitle-black">
            {{ eventsCompleted.eventsByStatusAndClient.length }}
          </h3>
          <p class="text-black">Succesful events</p>
        </div>
      </div>
      <div
        class="md:flex border-4 h-32 w-72 md:w-80 text-center xl:w-72 p-2 border-red rounded-xl hidden"
      >
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full border-red rounded-xl"
        >
          <h3 class="subtitle-black">0</h3>
          <p class="text-black">Completed cases</p>
        </div>
      </div>
      <div
        class="flex border-4 h-32 ml-4 mt-7 md:ml-0 md:mt-0 w-72 md:w-80 text-center xl:w-72 p-2 border-red rounded-xl"
      >
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full border-red rounded-xl"
        >
          <h3 v-if="events" class="subtitle-black">
            {{ events.eventsByStatusAndClient.length }}
          </h3>
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
        <div class="hidden md:grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
          <p class="col-span-2">Date added</p>
          <p class="col-span-6">Event name</p>
          <p class="col-span-1">Status</p>
        </div>
        <div v-if="eventsLoading">Loading</div>
        <div v-if="eventsError">{{ eventsError }}</div>
        <div
          v-if="events?.eventsByStatusAndClient.length > 0"
          class="w-full h-50vh md:h-45vh lg:h-35vh overflow-y-auto scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-track-color-beige scrollbar-thumb-rounded scrollbar-thumb-color-red scrolling-touch"
        >
          <div v-for="event in events.eventsByStatusAndClient">
            <EventCase :event="event" />
          </div>
        </div>
        <div v-else>
          <div
            class="grid mx-6 p-2 mb-2 bg-white grid-cols-10 gap-1 h-10 subbody-black rounded-lg"
          >
            <p class="col-span-2">No pending events yet</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'
import { useQuery } from '@vue/apollo-composable'
import { GET_EVENT_BY_STATUS_CLIENT } from '@/graphql/event.query'
import EventCase from '@/components/EventCase.vue'

export default {
  components: { EventCase },
  setup() {
    // Composable
    const { firebaseUser } = useFirebase()

    const {
      loading: eventsLoading,
      result: events,
      error: eventsError,
    } = useQuery(GET_EVENT_BY_STATUS_CLIENT, {
      status: 'Pending',
      email: firebaseUser?.value?.email,
    })

    const {
      loading: eventsCompletedLoading,
      result: eventsCompleted,
      error: eventsCompletedError,
    } = useQuery(GET_EVENT_BY_STATUS_CLIENT, {
      status: 'Completed',
      email: firebaseUser?.value?.email,
    })

    return {
      firebaseUser,
      eventsLoading,
      eventsError,
      events: events,
      eventsCompletedLoading,
      eventsCompletedError,
      eventsCompleted: eventsCompleted,
    }
  },
}
</script>
