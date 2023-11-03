<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black">New event</h1>
    <form
      @submit.prevent="handleAddEvent"
      class="grid grid-cols-5 mx-auto w-1/2"
    >
      <label class="body-black col-span-1" for="eventname">Event name</label>
      <input
        type="text"
        placeholder="Event name"
        id="eventname"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.name"
      />
      <label class="body-black col-span-1" for="address">Address</label>
      <input
        type="text"
        placeholder="Address"
        id="address"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.address"
      />
      <label class="body-black col-span-1" for="postalcode">PostalCode</label>
      <input
        type="text"
        placeholder="PostalCode"
        id="postalcode"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.postalCode"
      />
      <label class="body-black col-span-1" for="city">City</label>
      <input
        type="text"
        placeholder="City"
        id="city"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.city"
      />
      <label class="body-black col-span-1" for="dates">Dates</label>
      <input
        type="date"
        placeholder="Dates"
        id="dates"
        class="border-1 border-black w-2/3 h-10 ml-3 subbody-black/80 bg-white col-span-4 mb-3"
        v-model="newEvent.dates"
      />
      <label class="body-black col-span-1" for="starttime">Start time</label>
      <input
        type="time"
        placeholder="Start time"
        id="starttime"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.startTime"
      />
      <label class="body-black col-span-1" for="endtime">End time</label>
      <input
        type="time"
        placeholder="End time"
        id="endtime"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.endTime"
      />
      <label class="body-black col-span-1" for="contactperson"
        >Contactperson</label
      >
      <input
        type="text"
        placeholder="Contactperson"
        id="contactperson"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.contactPerson"
      />
      <label class="body-black col-span-1" for="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.email"
      />
      <label class="body-black col-span-1" for="phone-number"
        >Phone number</label
      >
      <input
        type="tel"
        placeholder="Phone number"
        id="phone-number"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.phoneNumber"
      />
      <label class="body-black col-span-1" for="btw-number">Btw number</label>
      <input
        type="text"
        placeholder="Btw number"
        id="btw-number"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.btwNumber"
      />
      <label class="body-black col-span-1" for="expected-visitor-staff-count"
        >Expected visitor / staff count</label
      >
      <input
        type="number"
        placeholder="Expected visitor / staff count"
        id="expected-visitor-staff-count"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3"
        v-model="newEvent.expectedVisitorStaffCount"
      />
      <p class="body-black col-span-1">Children</p>
      <label
        v-for="option in Options"
        :key="option.name"
        class="col-span-2 mx-auto mb-3 w-15vw"
      >
        <input type="radio" :value="option.name" v-model="newEvent.children" />
        {{ option.name }}
      </label>
      <label class="body-black col-span-1" for="maps">Maps</label>
      <input
        type="file"
        multiple
        id="maps"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white subbody-black/80 col-span-4 mb-3 file:bg-black file:subbody-white file:h-10"
        v-on:change="newEvent.maps"
      />
      <button
        class="border-1 border-red bg-red/80 col-span-2 col-start-2 body-black"
      >
        Create event
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const newEvent = ref({
      name: '',
      address: '',
      postalCode: '',
      city: '',
      dates: '',
      startTime: '',
      endTime: '',
      contactPerson: '',
      email: '',
      phoneNumber: '',
      btwNumber: '',
      expectedVisitorStaffCount: '',
      children: false,
      maps: '',
    })

    const handleAddEvent = () => {
      console.log(newEvent.value.name)
      console.log(newEvent.value.address)
      console.log(newEvent.value.postalCode)
      console.log(newEvent.value.city)
      console.log(newEvent.value.dates)
      console.log(newEvent.value.startTime)
      console.log(newEvent.value.endTime)
      console.log(newEvent.value.contactPerson)
      console.log(newEvent.value.email)
      console.log(newEvent.value.phoneNumber)
      console.log(newEvent.value.btwNumber)
      console.log(newEvent.value.expectedVisitorStaffCount)
      console.log(newEvent.value.children)
      console.log(newEvent.value.maps)
    }

    return {
      Options: [{ name: 'yes' }, { name: 'no' }],
      newEvent,
      handleAddEvent,
    }
  },
}
</script>
