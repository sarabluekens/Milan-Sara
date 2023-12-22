<template>
  <div class="md:ml-18rem xl:ml-35rem bg-beige h-100vh">
    <h1 class="title-black mb-4 md:hidden xl:flex xl:ml-22rem">New event</h1>
    <form
      @submit.prevent="handleAddEvent"
      class="flex flex-col xl:grid grid-cols-5 ml-5 mx-auto w-96 md:w-1/2 xl:w-full"
    >
      <label class="body-black col-span-1 ml-3 md:ml-0" for="eventname"
        >Event name</label
      >
      <input
        type="text"
        placeholder="Event name"
        id="eventname"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 subbody-black/80"
        v-model="newEvent.name"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.name.$errors"
        :key="error.$uid"
        >The event name is required</span
      >
      <label
        class="body-black col-span-1 ml-3 mt-3 md:mt-0 md:ml-0"
        for="eventCategory"
        >Event category</label
      >
      <select
        v-model="newEvent.category"
        id="eventCategory"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white md:mt-3 col-span-4 subbody-black/80"
      >
        <option disabled value="">Please select one</option>
        <option value="Festival">Festival</option>
        <option value="Concert">Concert</option>
      </select>
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.category.$errors"
        :key="error.$uid"
        >The event category is required</span
      >
      <label
        class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0"
        for="address"
        >Address</label
      >
      <input
        type="text"
        placeholder="Address"
        id="address"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.address"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.address.$errors"
        :key="error.$uid"
        >The event address is required</span
      >
      <label
        class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0"
        for="postalcode"
        >PostalCode</label
      >
      <input
        type="text"
        placeholder="PostalCode"
        id="postalcode"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.postalCode"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.postalCode.$errors"
        :key="error.$uid"
        >The postalcode is required</span
      >
      <label class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0" for="city"
        >City</label
      >
      <input
        type="text"
        placeholder="City"
        id="city"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.city"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.city.$errors"
        :key="error.$uid"
        >The city is required</span
      >
      <label class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0" for="dates"
        >Dates</label
      >
      <Calendar
        placeholder="Dates"
        id="dates"
        class="border-1 border-black w-2/3 h-10 ml-3 subbody-black/80 bg-white col-span-4 md:mt-3"
        v-model="newEvent.dates"
        selectionMode="multiple"
        :manualInput="false"
        showIcon
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.dates.$errors"
        :key="error.$uid"
        >The event dates are required</span
      >
      <label
        class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0"
        for="starttime"
        >Start time</label
      >
      <input
        type="time"
        placeholder="Start time"
        id="starttime"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.startTime"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.startTime.$errors"
        :key="error.$uid"
        >The startTime of the event is required</span
      >
      <label
        class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0"
        for="endtime"
        >End time</label
      >
      <input
        type="time"
        placeholder="End time"
        id="endtime"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.endTime"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.endTime.$errors"
        :key="error.$uid"
        >The endTime of the event is required</span
      >
      <label
        class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0"
        for="contactperson"
        >Contactperson</label
      >
      <input
        type="text"
        placeholder="Contactperson"
        id="contactperson"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.contactPerson"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.contactPerson.$errors"
        :key="error.$uid"
        >The contactperson is required</span
      >
      <label class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0" for="email"
        >Email</label
      >
      <input
        type="email"
        placeholder="Email"
        id="email"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.email"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.email.$errors"
        :key="error.$uid"
        >The email of the contactperson is required</span
      >
      <label
        class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0"
        for="phone-number"
        >Phone number</label
      >
      <input
        type="tel"
        placeholder="Phone number"
        id="phone-number"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.phoneNumber"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.phoneNumber.$errors"
        :key="error.$uid"
        >The phonenumber of the contactperson is required</span
      >
      <label
        class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0"
        for="btw-number"
        >Btw number</label
      >
      <input
        type="text"
        placeholder="Btw number"
        id="btw-number"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.btwNumber"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.btwNumber.$errors"
        :key="error.$uid"
        >The btwNumber is required</span
      >
      <label
        class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0"
        for="expected-visitor-staff-count"
        >Expected visitor / staff count</label
      >
      <input
        type="number"
        placeholder="Expected visitor / staff count"
        id="expected-visitor-staff-count"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 md:mt-3 subbody-black/80"
        v-model="newEvent.expectedVisitorStaffCount"
        min="0"
      />
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.expectedVisitorStaffCount.$errors"
        :key="error.$uid"
        >The expected visitors and staff count is required</span
      >
      <p class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0">Children</p>
      <label class="col-span-2 mx-auto mt-3 w-15vw subbody-black/80" for="Yes">
        <input
          type="radio"
          v-bind:value="true"
          id="Yes"
          v-model="newEvent.children"
        />
        Yes
      </label>
      <label class="col-span-2 mx-auto mt-3 w-15vw subbody-black/80" for="No">
        <input
          type="radio"
          v-bind:value="false"
          id="No"
          v-model="newEvent.children"
        />
        No
      </label>
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.children.$errors"
        :key="error.$uid"
        >Please fill in if there are children at the event</span
      >
      <label class="body-black col-span-1 ml-3 md:ml-0 mt-3 md:mt-0" for="maps"
        >Maps</label
      >
      <div
        class="border-1 border-red bg-red col-span-2 mt-3 w-72 col-start-2 body-white h-10"
        @click="openUploadWidget()"
      >
        upload file
      </div>
      <span
        class="col-start-2 col-span-4 ml-3 subbody-red font-bold"
        v-for="error in v$.maps.$errors"
        :key="error.$uid"
        >The maps of the event are required</span
      >
      <div class="col-span-5">
        <EventMap @coordinates="receiveCoordinates" />
      </div>

      <button
        class="border-1 border-red bg-red col-span-2 mt-3 xl:w-1/2 col-start-2 body-white h-10"
      >
        Create event
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_EVENT } from '@/graphql/event.mutation'
import useRealtime from '@/composables/useRealtime'
import type { Event } from '@/interfaces/event.interface'
import useValidate from '@vuelidate/core' // validation
import { required, email } from '@vuelidate/validators' // validation
import EventMap from '@/components/EventMap.vue'

export default {
  components: { EventMap },
  setup() {
    const newEvent = ref({
      name: '',
      category: '',
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
      coords: [
        {
          corner: 'topLeft',
          lat: 0,
          lng: 0,
        },
        {
          corner: 'bottomRight',
          lat: 0,
          lng: 0,
        },
      ],
    })
    const validationRules = {
      name: { required },
      category: { required },
      address: { required },
      postalCode: { required },
      city: { required },
      dates: { required },
      startTime: { required },
      endTime: { required },
      contactPerson: { required },
      email: { required, email },
      phoneNumber: { required },
      btwNumber: { required },
      expectedVisitorStaffCount: { required },
      children: { required },
      maps: { required },
    }
    const v$ = useValidate(validationRules, newEvent)
    const { emit } = useRealtime()
    const { mutate: addEvent } = useMutation(ADD_EVENT)
    const CLOUDNAME = import.meta.env.VITE_CLOUDNAME
    const UPLOADPRESET = import.meta.env.VITE_CLOUD_UPLOAD_PRESET

    //@ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          newEvent.value.maps = result.info.secure_url
        }
      },
    )

    const handleFileChange = (event: any) => {
      const file = event.target.files[0]
      newEvent.value.maps = file.name
    }

    const openUploadWidget = () => {
      widget.open()
    }

    const handleAddEvent = async () => {
      const validationResult = await v$.value.$validate()
      if (validationResult) {
        alert('Event created')
        const result = await addEvent({
          createEventInput: {
            name: newEvent.value.name,
            category: newEvent.value.category,
            address: newEvent.value.address,
            postalCode: newEvent.value.postalCode,
            city: newEvent.value.city,
            dates: newEvent.value.dates,
            startHour: newEvent.value.startTime,
            endHour: newEvent.value.endTime,
            contactPerson: newEvent.value.contactPerson,
            phoneNumer: newEvent.value.phoneNumber,
            email: newEvent.value.email,
            status: 'Pending',
            btwNumber: newEvent.value.btwNumber,
            expectedVisitorStaffCount: newEvent.value.expectedVisitorStaffCount,
            eventWithChildren: newEvent.value.children,
            mapsLink: newEvent.value.maps,
            mapCoords: newEvent.value.coords,
          },
        })
        // add event in the RedCross dashboard
        emit('event:created', result?.data?.createEvent as Event)
      }
    }

    const receiveCoordinates = (coordinates: any) => {
      for (let i = 0; i < coordinates.length; i++) {
        newEvent.value.coords[i].lat = parseFloat(coordinates[i].lat)
        newEvent.value.coords[i].lng = parseFloat(coordinates[i].lng)
      }
    }

    return {
      newEvent,
      v$,
      handleFileChange,
      openUploadWidget,
      handleAddEvent,
      receiveCoordinates,
    }
  },
}
</script>
