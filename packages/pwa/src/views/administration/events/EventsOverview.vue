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
        <section v-if="pendingDown">
          <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
            <p class="col-span-2">Date added</p>
            <p class="col-span-6">Event name</p>
            <p class="col-span-1">Status</p>
          </div>
          <div v-if="eventsLoading">Loading</div>
          <div v-if="eventsError">{{ eventsError }}</div>
          <div
            v-if="events"
            v-for="event in events.eventsByStatus"
            class="grid mx-6 p-2 mb-2 bg-white grid-cols-10 gap-1 h-10 subbody-black"
          >
            <p class="col-span-2">{{ event.createdAt }}</p>
            <p class="col-span-6">{{ event.name }}</p>
            <p class="col-span-1">{{ event.status }}</p>
            <button
              @click="handleDetails(event.id)"
              class="h-6 px-2 w-auto bg-red subbody-white col-span-1"
            >
              event details
            </button>
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
        <section v-if="AcceptedDown">
          <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
            <p class="col-span-2">Date added</p>
            <p class="col-span-6">Event name</p>
            <p class="col-span-1">Status</p>
          </div>
          <div v-if="eventsApprovedLoading">Loading</div>
          <div v-if="eventsApprovedError">{{ eventsApprovedError }}</div>
          <div
            v-if="events"
            v-for="event in eventsApproved.eventsByStatus"
            class="grid mx-6 p-2 mb-2 bg-white grid-cols-10 gap-1 h-10 subbody-black"
          >
            <p class="col-span-2">{{ event.createdAt }}</p>
            <p class="col-span-6">{{ event.name }}</p>
            <p class="col-span-1">{{ event.status }}</p>
            <button
              @click="handleDetails(event.id)"
              class="h-6 px-2 w-auto bg-red subbody-white col-span-1"
            >
              event details
            </button>
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
        <section v-if="CompletedDown">
          <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
            <p class="col-span-2">Date added</p>
            <p class="col-span-6">Event name</p>
            <p class="col-span-1">Status</p>
          </div>
          <div v-if="eventsCompletedLoading">Loading</div>
          <div v-if="eventsCompletedError">{{ eventsCompletedError }}</div>
          <div
            v-if="events"
            v-for="event in eventsCompleted.eventsByStatus"
            class="grid mx-6 p-2 mb-2 bg-white grid-cols-10 gap-1 h-10 subbody-black"
          >
            <p class="col-span-2">{{ event.createdAt }}</p>
            <p class="col-span-6">{{ event.name }}</p>
            <p class="col-span-1">{{ event.status }}</p>
            <button
              @click="handleDetails(event.id)"
              class="h-6 px-2 w-auto bg-red subbody-white col-span-1"
            >
              event details
            </button>
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
        <section v-if="CancelledDown">
          <div class="grid grid-cols-10 px-2 mx-6 mb-4 subbody-black">
            <p class="col-span-2">Date added</p>
            <p class="col-span-6">Event name</p>
            <p class="col-span-1">Status</p>
          </div>
          <div v-if="eventsRejectedLoading">Loading</div>
          <div v-if="eventsRejectedError">{{ eventsRejectedError }}</div>
          <div
            v-if="events"
            v-for="event in eventsRejected.eventsByStatus"
            class="grid mx-6 p-2 mb-2 bg-white grid-cols-10 gap-1 h-10 subbody-black"
          >
            <p class="col-span-2">{{ event.createdAt }}</p>
            <p class="col-span-6">{{ event.name }}</p>
            <p class="col-span-1">{{ event.status }}</p>
            <button
              @click="handleDetails(event.id)"
              class="h-6 px-2 w-auto bg-red subbody-white col-span-1"
            >
              event details
            </button>
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

export default {
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
