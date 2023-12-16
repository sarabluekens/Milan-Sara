<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black">Event overview</h1>
    <section class="flex sm:flex-row sm:justify-evenly sm:w-64vw m-auto">
      <div class="bg-beige w-full h-52vh rounded-xl">
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-8 body-black border-b border-red"
        >
          <p>Pending events</p>
          <div
            v-if="!pendingDown"
            @click="pendingDown = !pendingDown"
            class="i-ic-sharp-keyboard-arrow-down icon icon-2"
          ></div>
          <div
            v-if="pendingDown"
            @click="pendingDown = !pendingDown"
            class="i-ic-sharp-keyboard-arrow-up icon icon-2"
          ></div>
        </div>
        <div
          class="flex subbody-black bg-white mx-6 mt-6 mb-8 h-10 px-2 items-center rounded-lg"
          v-if="pendingDown && events.eventsByStatus.length === 0"
        >
          <p>No pending events at the moment</p>
        </div>
        <section v-if="pendingDown && events.eventsByStatus.length > 0">
          <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
            <p class="col-span-2">Date added</p>
            <p class="col-span-6">Event name</p>
            <p class="col-span-1">Status</p>
          </div>
          <div v-for="event in events.eventsByStatus">
            <EventCard :event="event" />
          </div>
        </section>
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-8 body-black border-b border-red"
        >
          <p>Accepted events</p>
          <div
            v-if="!AcceptedDown"
            @click="AcceptedDown = !AcceptedDown"
            class="i-ic-sharp-keyboard-arrow-down icon icon-2"
          ></div>
          <div
            v-if="AcceptedDown"
            @click="AcceptedDown = !AcceptedDown"
            class="i-ic-sharp-keyboard-arrow-up icon icon-2"
          ></div>
        </div>
        <div
          class="flex subbody-black bg-white mx-6 mt-6 mb-8 h-10 px-2 items-center rounded-lg"
          v-if="AcceptedDown && eventsApproved.eventsByStatus.length === 0"
        >
          <p>No Accepted events at the moment</p>
        </div>
        <section
          v-if="AcceptedDown && eventsApproved.eventsByStatus.length > 0"
        >
          <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
            <p class="col-span-2">Date added</p>
            <p class="col-span-6">Event name</p>
            <p class="col-span-1">Status</p>
          </div>
          <div v-if="eventsApprovedLoading">Loading</div>
          <div v-if="eventsApprovedError">{{ eventsApprovedError }}</div>
          <div v-for="event in eventsApproved.eventsByStatus">
            <EventCard :event="event" />
          </div>
        </section>
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-8 body-black border-b border-red"
        >
          <p>Succesful events</p>
          <div
            v-if="!CompletedDown"
            @click="CompletedDown = !CompletedDown"
            class="i-ic-sharp-keyboard-arrow-down icon icon-2"
          ></div>
          <div
            v-if="CompletedDown"
            @click="CompletedDown = !CompletedDown"
            class="i-ic-sharp-keyboard-arrow-up icon icon-2"
          ></div>
        </div>
        <div
          class="flex subbody-black bg-white mx-6 mt-6 mb-8 h-10 px-2 items-center rounded-lg"
          v-if="CompletedDown && eventsCompleted.eventsByStatus.length === 0"
        >
          <p>No Succesful events at the moment</p>
        </div>
        <section
          v-if="CompletedDown && eventsCompleted.eventsByStatus.length > 0"
        >
          <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
            <p class="col-span-2">Date added</p>
            <p class="col-span-6">Event name</p>
            <p class="col-span-1">Status</p>
          </div>
          <div v-if="eventsCompletedLoading">Loading</div>
          <div v-if="eventsCompletedError">{{ eventsCompletedError }}</div>
          <div v-for="event in eventsCompleted.eventsByStatus">
            <EventCard :event="event" />
          </div>
        </section>
        <div
          class="flex flex-row justify-between mx-6 mt-6 mb-8 body-black border-b border-red"
        >
          <p>Cancelled events</p>
          <div
            v-if="!CancelledDown"
            @click="CancelledDown = !CancelledDown"
            class="i-ic-sharp-keyboard-arrow-down icon icon-2"
          ></div>
          <div
            v-if="CancelledDown"
            @click="CancelledDown = !CancelledDown"
            class="i-ic-sharp-keyboard-arrow-up icon icon-2"
          ></div>
        </div>
        <div
          class="flex subbody-black bg-white mx-6 mt-6 mb-8 h-10 px-2 items-center rounded-lg"
          v-if="CancelledDown && eventsRejected.eventsByStatus.length === 0"
        >
          <p>No Cancelled events at the moment</p>
        </div>
        <section
          v-if="CancelledDown && eventsRejected.eventsByStatus.length > 0"
        >
          <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
            <p class="col-span-2">Date added</p>
            <p class="col-span-6">Event name</p>
            <p class="col-span-1">Status</p>
          </div>
          <div v-for="event in eventsRejected.eventsByStatus">
            <EventCard :event="event" />
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_EVENT_BY_STATUS } from '@/graphql/event.query'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import EventCard from '@/components/EventCard.vue'

export default {
  components: { EventCard },
  setup() {
    const { push } = useRouter()

    const pendingDown = ref(false)
    const AcceptedDown = ref(false)
    const CompletedDown = ref(false)
    const CancelledDown = ref(false)

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

    const {
      loading: eventsApprovedLoading,
      result: eventsApproved,
      error: eventsApprovedError,
    } = useQuery(GET_EVENT_BY_STATUS, { status: 'Approved' })

    const {
      loading: eventsRejectedLoading,
      result: eventsRejected,
      error: eventsRejectedError,
    } = useQuery(GET_EVENT_BY_STATUS, { status: 'Rejected' })

    console.log(eventsRejected.value)

    const handleDetails = (id: string) => {
      console.log('details: ' + id)
      push({ path: `/admin/event/detail/${id}` })
    }

    return {
      events: events,
      eventsLoading,
      eventsError,
      eventsCompleted: eventsCompleted,
      eventsCompletedLoading,
      eventsCompletedError,
      eventsApproved: eventsApproved,
      eventsApprovedLoading,
      eventsApprovedError,
      eventsRejected: eventsRejected,
      eventsRejectedLoading,
      eventsRejectedError,
      pendingDown,
      AcceptedDown,
      CompletedDown,
      CancelledDown,
      handleDetails,
    }
  },
}
</script>
