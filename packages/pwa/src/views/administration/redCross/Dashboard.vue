<template>
  <div>
    <h1 class="title-black mb-4">
      Good to see you again, {{ firebaseUser?.displayName }}
    </h1>
    <section
      class="flex sm:h-20vh h-24vh sm:flex-row sm:justify-evenly sm:w-48vw m-auto h-"
    >
      <div class="flex border-4 h-32 w-72 p-2 border-red rounded-xl">
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full border-red rounded-xl"
        >
          <h3 v-if="eventsCompleted" class="subtitle-black">
            {{ eventsCompleted.eventsByStatus.length }}
          </h3>
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
          <h3 v-if="events" class="subtitle-black">
            {{ events.eventsByStatus.length }}
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
        <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
          <p class="col-span-2">Date added</p>
          <p class="col-span-6">Event name</p>
          <p class="col-span-1">Status</p>
        </div>
        <div v-if="eventsLoading">Loading</div>
        <div v-if="eventsError">{{ eventsError }}</div>
        <div
          v-if="events"
          class="w-full h-35vh overflow-y-auto scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-track-color-beige scrollbar-thumb-rounded scrollbar-thumb-color-red scrolling-touch"
        >
          <div
            v-for="event in [...liveEvents, ...events.eventsByStatus]"
            :key="event.id"
          >
            <EventCard :event="event" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'
import { useQuery } from '@vue/apollo-composable'
import { GET_EVENT_BY_STATUS } from '@/graphql/event.query'
import EventCard from '@/components/EventCard.vue'
import type { Event, Status } from '@/interfaces/event.interface'
import useRealtime from '@/composables/useRealtime'
import { ref } from 'vue'

export default {
  components: { EventCard },
  setup() {
    // Composable
    const { firebaseUser } = useFirebase()
    const newEvent = ref<Event | null>()
    const liveEvents = ref<Event[]>([])
    const { on } = useRealtime()

    const {
      loading: eventsLoading,
      result: events,
      error: eventsError,
    } = useQuery(GET_EVENT_BY_STATUS, { status: 'Pending' })

    const {
      loading: eventsCompletedLoading,
      result: eventsCompleted,
      error: eventsCompletedError,
    } = useQuery(GET_EVENT_BY_STATUS, { status: 'Completed' })

    on('event:new', (data: Partial<Event>) => {
      console.log('New event added by a company', data)
      console.log(data as Event)
      data.status = 'Pending' as Status
      data.createdAt = new Date()
      newEvent.value = data as Event
      liveEvents.value.push(data as Event)
      console.log(newEvent.value)
      console.log(liveEvents.value)
    })

    return {
      firebaseUser,
      eventsLoading,
      eventsError,
      events: events,
      eventsCompletedLoading,
      eventsCompletedError,
      eventsCompleted: eventsCompleted,
      liveEvents,
    }
  },
}
</script>
