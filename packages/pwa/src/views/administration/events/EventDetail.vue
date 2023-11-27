<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black mb-5">Event detail</h1>
    <section
      v-if="event && isAccepted === false"
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
          v-model="event.event.eventWithChildren"
        />
        Yes
      </label>
      <label class="col-span-2 mx-auto mb-3 w-15vw subbody-black/80" for="No">
        <input
          type="radio"
          v-bind:value="false"
          id="No"
          disabled
          v-model="event.event.eventWithChildren"
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
        class="border-1 border-red bg-red col-span-2 body-white h-10"
        @click="handleAddEvent"
      >
        Accept event
      </button>
      <button
        class="border-1 border-red bg-red col-span-2 col-start-4 body-white h-10"
      >
        Decline event
      </button>
    </section>
    <section v-if="isAccepted" class="flex flex-col mx-auto w-1/2">
      <section class="flex flex-col mb-4">
        <label class="body-black" for="maps">Caregivers</label>
        <section v-for="caregiver in addedCaregivers" class="flex flex-row">
          <div class="border-1 border-red w-50 text-center mb-4">
            <svg
              class="mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              height="96"
              viewBox="0 -960 960 960"
              width="96"
              fill="#A60C0C"
            >
              <path
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
              />
            </svg>
            <p class="body-black">
              {{ `${caregiver.firstName} ${caregiver.lastName}` }}
            </p>
            <p class="subbody-black">{{ caregiver.profession }}</p>
          </div>
        </section>
        <div
          class="border-1 border-red w-50 text-center mb-4"
          @click="handleNewCaregiver"
        >
          <svg
            class="mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            height="96"
            viewBox="0 -960 960 960"
            width="96"
            fill="#A60C0C"
          >
            <path
              d="M720-400v-120H600v-80h120v-120h80v120h120v80H800v120h-80Zm-360-80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"
            />
          </svg>
          <p class="body-black">Add caregiver</p>
        </div>
      </section>
      <section>
        <p class="body-black" for="maps">Caregivers</p>
        <div
          v-if="AddCaregiver"
          v-for="caregiver in caregivers.caregivers"
          class="flex flex-row"
        >
          <input
            @change="handleAssigned(caregiver.id)"
            v-bind:id="caregiver.id"
            type="checkbox"
            class="hidden"
          />
          <label v-bind:for="caregiver.id">
            <div class="border-1 border-red w-50 text-center mb-4">
              <p class="body-black">
                {{ `${caregiver.firstName} ${caregiver.lastName}` }}
              </p>
              <p class="subbody-black">{{ caregiver.profession }}</p>
            </div>
          </label>
        </div>
      </section>
      <section>
        <label class="body-black col-span-1 col-start-1" for="maps"
          >Equipment</label
        >
        <section>
          <div class="border-1 border-red w-50 text-center mb-4">
            <p class="body-black">EHBO kit</p>
            <p>consists of:</p>
            <li class="grid grid-cols-4 mb-4">
              <p class="subbody-black col-span-2">Bandage:</p>
              <p class="subbody-black col-span-1">2</p>
              <p class="subbody-black col-span-2">Ointment</p>
              <p class="subbody-black col-span-1">1</p>
            </li>
            <div class="flex flex-row justify-between">
              <button @click="handleEquipmentCount('minus')">minus</button>
              <p class="subbody-black">{{ EHBO_count }}</p>
              <button @click="handleEquipmentCount('plus')">plus</button>
            </div>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_EVENT_BY_ID } from '@/graphql/event.query'
import { ALL_CAREGIVERS } from '@/graphql/caregiver.query'
import { ALL_EQUIPMENT } from '@/graphql/equipment.query'
import type { Equipment } from '@/interfaces/equipment.interface'
import type { Caregiver } from '@/interfaces/caregiver.interface'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const isAccepted = ref(false)
    const AddCaregiver = ref(false)
    const addedEquipment = ref<Equipment[]>([])
    const addedCaregivers = ref<Caregiver[]>([])
    const EHBO_count = ref(0)

    const {
      loading: eventLoading,
      result: event,
      error: eventError,
    } = useQuery(GET_EVENT_BY_ID, { id: route.params.id })

    const {
      loading: caregiverLoading,
      result: caregivers,
      error: caregiverError,
    } = useQuery(ALL_CAREGIVERS, { id: route.params.id })

    const {
      loading: equipmentLoading,
      result: equipments,
      error: equipmentError,
    } = useQuery(ALL_EQUIPMENT)

    const handleAddEvent = () => {
      isAccepted.value = true
      console.log(isAccepted)
      console.log(event.value.event)
    }

    const handleNewCaregiver = () => {
      console.log('new caregiver')
      AddCaregiver.value = true
      console.log(caregivers)
    }

    const handleAssigned = (idOfPerson: string) => {
      console.log(idOfPerson)
      if (addedCaregivers.value.length === 0) {
        for (const caregiver of caregivers.value.caregivers) {
          if (caregiver.id === idOfPerson) {
            addedCaregivers.value.push(caregiver)
          }
        }
      } else {
        for (const caregiver of caregivers.value.caregivers) {
          if (caregiver.id === idOfPerson) {
            if (addedCaregivers.value.includes(caregiver)) {
              const index = addedCaregivers.value.indexOf(caregiver)
              if (index > -1) {
                addedCaregivers.value.splice(index, 1)
              }
              return
            }
            addedCaregivers.value.push(caregiver)
          }
        }
      }
    }

    const handleEquipmentCount = (action: string) => {
      if (action === 'minus') {
        console.log('minus')
        if (EHBO_count.value === 0) {
          return
        }
        EHBO_count.value--
      } else {
        console.log('plus')
        EHBO_count.value++
      }
    }

    return {
      eventLoading,
      event: event,
      eventError,
      caregiverLoading,
      caregivers: caregivers,
      caregiverError,
      equipmentLoading,
      equipments: equipments,
      equipmentError,
      isAccepted,
      AddCaregiver,
      EHBO_count,
      addedCaregivers,
      handleAddEvent,
      handleNewCaregiver,
      handleAssigned,
      handleEquipmentCount,
    }
  },
}
</script>
