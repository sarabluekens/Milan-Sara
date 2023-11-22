<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <form
      @submit.prevent="handleAddEvent"
      v-if="event"
      class="grid grid-cols-5 mx-auto w-1/2"
    >
      <label class="body-black col-span-1" for="eventname">Event name</label>
      <input
        type="text"
        placeholder="Event name"
        id="eventname"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.name"
      />
      <label class="body-black col-span-1" for="address">Address</label>
      <input
        type="text"
        placeholder="Address"
        id="address"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.address"
      />
      <label class="body-black col-span-1" for="postalcode">PostalCode</label>
      <input
        type="text"
        placeholder="PostalCode"
        id="postalcode"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.postalCode"
      />
      <label class="body-black col-span-1" for="city">City</label>
      <input
        type="text"
        placeholder="City"
        id="city"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.city"
      />
      <label class="body-black col-span-1" for="dates">Dates</label>
      <input
        type="date"
        placeholder="Dates"
        id="dates"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 subbody-black/80 bg-white col-span-4 mb-3"
        :value="event.event.dates[0].substring(0, 10)"
      />
      <label class="body-black col-span-1" for="starttime">Start time</label>
      <input
        type="time"
        placeholder="Start time"
        id="starttime"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.startHour"
      />
      <label class="body-black col-span-1" for="endtime">End time</label>
      <input
        type="time"
        placeholder="End time"
        id="endtime"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.endHour"
      />
      <label class="body-black col-span-1" for="contactperson"
        >Contactperson</label
      >
      <input
        type="text"
        placeholder="Contactperson"
        id="contactperson"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.contactPerson"
      />
      <label class="body-black col-span-1" for="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.email"
      />
      <label class="body-black col-span-1" for="phone-number"
        >Phone number</label
      >
      <input
        type="tel"
        placeholder="Phone number"
        id="phone-number"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.phoneNumber"
      />
      <label class="body-black col-span-1" for="btw-number">Btw number</label>
      <input
        type="text"
        placeholder="Btw number"
        id="btw-number"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.btwNumber"
      />
      <label class="body-black col-span-1" for="expected-visitor-staff-count"
        >Expected visitor / staff count</label
      >
      <input
        type="number"
        placeholder="Expected visitor / staff count"
        id="expected-visitor-staff-count"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="event.event.expectedVisitorStaffCount"
        min="0"
      />
      <p class="body-black col-span-1">Children</p>
      <label class="col-span-2 mx-auto mb-3 w-15vw subbody-black/80" for="Yes">
        <input
          type="radio"
          v-bind:value="true"
          id="Yes"
          disabled
          v-model="event.event.children"
        />
        Yes
      </label>
      <label class="col-span-2 mx-auto mb-3 w-15vw subbody-black/80" for="No">
        <input
          type="radio"
          v-bind:value="false"
          id="No"
          disabled
          v-model="event.event.children"
        />
        No
      </label>
      <label class="body-black col-span-1" for="maps">Maps</label>
      <input
        type="file"
        multiple
        id="maps"
        disabled
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white subbody-black/80 col-span-4 mb-6 file:bg-black file:subbody-white file:h-10"
        v-on:change="event.event.maps"
      />
      <button
        class="border-1 border-red bg-red col-span-2 col-start-2 body-white h-10"
      >
        Create event
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_EVENT_BY_ID } from '@/graphql/event.query'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const {
      loading: eventLoading,
      result: event,
      error: eventError,
    } = useQuery(GET_EVENT_BY_ID, { id: route.params.id })

    const handleAddEvent = () => {
      console.log(event.value.event)
      console.log(event.value.event.dates[0])
      console.log(event.value.event.startHour)
      console.log(event.value.event.endHour)
    }

    return {
      eventLoading,
      event: event,
      eventError,
      handleAddEvent,
    }
  },
}
</script>
