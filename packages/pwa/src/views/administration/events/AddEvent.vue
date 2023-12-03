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
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.name"
      />
      <label class="body-black col-span-1" for="address">Address</label>
      <input
        type="text"
        placeholder="Address"
        id="address"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.address"
      />
      <label class="body-black col-span-1" for="postalcode">PostalCode</label>
      <input
        type="text"
        placeholder="PostalCode"
        id="postalcode"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.postalCode"
      />
      <label class="body-black col-span-1" for="city">City</label>
      <input
        type="text"
        placeholder="City"
        id="city"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
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
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.contactPerson"
      />
      <label class="body-black col-span-1" for="email">Email</label>
      <input
        type="email"
        placeholder="Email"
        id="email"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.email"
      />
      <label class="body-black col-span-1" for="phone-number"
        >Phone number</label
      >
      <input
        type="tel"
        placeholder="Phone number"
        id="phone-number"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.phoneNumber"
      />
      <label class="body-black col-span-1" for="btw-number">Btw number</label>
      <input
        type="text"
        placeholder="Btw number"
        id="btw-number"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.btwNumber"
      />
      <label class="body-black col-span-1" for="expected-visitor-staff-count"
        >Expected visitor / staff count</label
      >
      <input
        type="number"
        placeholder="Expected visitor / staff count"
        id="expected-visitor-staff-count"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4 mb-3 subbody-black/80"
        v-model="newEvent.expectedVisitorStaffCount"
        min="0"
      />
      <p class="body-black col-span-1">Children</p>
      <label class="col-span-2 mx-auto mb-3 w-15vw subbody-black/80" for="Yes">
        <input
          type="radio"
          v-bind:value="true"
          id="Yes"
          v-model="newEvent.children"
        />
        Yes
      </label>
      <label class="col-span-2 mx-auto mb-3 w-15vw subbody-black/80" for="No">
        <input
          type="radio"
          v-bind:value="false"
          id="No"
          v-model="newEvent.children"
        />
        No
      </label>
      <label class="body-black col-span-1" for="maps">Maps</label>
      <div
        class="border-1 border-red col-span-2 h-10 mb-4"
        @click="openUploadWidget()"
      >
        upload file
      </div>
      <button
        class="border-1 border-red bg-red col-span-2 col-start-2 body-white h-10"
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

    const {
      mutate: addEvent,
      loading: addEventLoading,
      onError: addEventError,
    } = useMutation(ADD_EVENT)

    //@ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dcw0zn7ly',
        uploadPreset: 'upload-RedCross',
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          console.log('Done! Here is the image info: ', result.info.secure_url)
          newEvent.value.maps = result.info.secure_url
        }
      },
    )

    const handleFileChange = (event: any) => {
      const file = event.target.files[0]
      console.log(file)
      newEvent.value.maps = file.name
    }

    const openUploadWidget = () => {
      widget.open()
    }

    const handleAddEvent = () => {
      if (newEvent.value.name === '') {
        alert('Please fill in the name of the event')
        return
      } else if (newEvent.value.address === '') {
        alert('Please fill in the address of the event')
        return
      } else if (newEvent.value.postalCode === '') {
        alert('Please fill in the postal code of the event')
        return
      } else if (newEvent.value.city === '') {
        alert('Please fill in the city of the event')
        return
      } else if (newEvent.value.dates === '') {
        alert('Please fill in the dates of the event')
        return
      } else if (newEvent.value.startTime === '') {
        alert('Please fill in the start time of the event')
        return
      } else if (newEvent.value.endTime === '') {
        alert('Please fill in the end time of the event')
        return
      } else if (newEvent.value.contactPerson === '') {
        alert('Please fill in the contact person of the event')
        return
      } else if (newEvent.value.email === '') {
        alert('Please fill in the email of the event')
        return
      } else if (newEvent.value.phoneNumber === '') {
        alert('Please fill in the phone number of the event')
        return
      } else if (newEvent.value.btwNumber === '') {
        alert('Please fill in the btw number of the event')
        return
      } else if (newEvent.value.expectedVisitorStaffCount === '') {
        alert('Please fill in the expected visitor / staff count of the event')
        return
      } else if (newEvent.value.children === undefined) {
        alert('Please fill in if there are children at the event')
        return
      } else {
        console.log(newEvent.value.maps)
        alert('Event created')
        addEvent({
          createEventInput: {
            name: newEvent.value.name,
            address: newEvent.value.address,
            postalCode: newEvent.value.postalCode,
            city: newEvent.value.city,
            dates: newEvent.value.dates,
            startHour: newEvent.value.startTime,
            endHour: newEvent.value.endTime,
            contactPerson: newEvent.value.contactPerson,
            phoneNumer: newEvent.value.phoneNumber,
            email: newEvent.value.email,
            btwNumber: newEvent.value.btwNumber,
            expectedVisitorStaffCount: newEvent.value.expectedVisitorStaffCount,
            eventWithChildren: newEvent.value.children,
            mapsLink: newEvent.value.maps,
          },
        })
      }
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
      newEvent,
      handleFileChange,
      openUploadWidget,
      handleAddEvent,
    }
  },
}
</script>
