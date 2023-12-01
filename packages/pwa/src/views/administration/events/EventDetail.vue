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
        <section class="grid grid-cols-4 gap-5">
          <div
            v-for="caregiver in addedCaregivers"
            class="border-1 border-red w-50 text-center mb-4"
          >
            <div
              class="i-material-symbols-person icon icon-6 color-red mx-auto"
            ></div>
            <p class="body-black">
              {{ `${caregiver.firstName} ${caregiver.lastName}` }}
            </p>
            <p class="subbody-black">{{ caregiver.profession }}</p>
          </div>
          <div
            class="border-1 border-red w-50 text-center mb-4"
            @click="handleNewCaregiver"
          >
            <div
              class="i-material-symbols-person-add icon icon-6 color-red mx-auto"
            ></div>
            <p class="body-black">Add caregiver</p>
          </div>
        </section>
      </section>
      <section v-if="AddCaregiver" class="text-right bg-white my-2 p-2">
        <p class="body-black text-left mb-2" for="maps">
          Add
          {{
            Math.round(
              event.event.expectedVisitorStaffCount / 500 -
                addedCaregivers.length,
            )
          }}
          caregiver(s)
        </p>
        <section class="grid grid-cols-4 gap-5">
          <div v-for="caregiver in caregivers.caregivers">
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
        <button
          @click="closeAssigned()"
          class="h-12 px-2 w-24 bg-red subbody-white col-span-1"
        >
          Accept
        </button>
      </section>
      <section>
        <label class="body-black col-span-1 col-start-1" for="maps"
          >Equipment</label
        >
        <section class="grid grid-cols-4">
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
              <button
                @click="handleEquipmentCount('minus', 'EHBO')"
                class="i-mdi-minus-thick icon icon-2 color-red"
              >
                minus
              </button>
              <p class="subbody-black">{{ EHBO_count }}</p>
              <button
                @click="handleEquipmentCount('plus', 'EHBO')"
                class="i-mdi-plus-thick icon icon-2 color-red"
              >
                plus
              </button>
            </div>
          </div>
          <div class="border-1 border-red w-50 text-center mb-4">
            <p class="body-black">Wound kit</p>
            <p>consists of:</p>
            <li class="grid grid-cols-4 mb-4">
              <p class="subbody-black col-span-2">Bandage:</p>
              <p class="subbody-black col-span-1">{{ woundKit.bandage }}</p>
              <p class="subbody-black col-span-2">Ointment</p>
              <p class="subbody-black col-span-1">{{ woundKit.ointment }}</p>
              <p class="subbpdy-black col-span-2">Pill</p>
              <p class="subbody-black col-span-1">{{ woundKit.pill }}</p>
            </li>
            <div class="flex flex-row justify-between">
              <button
                @click="handleEquipmentCount('minus', 'Wound')"
                class="i-mdi-minus-thick icon icon-2 color-red"
              >
                minus
              </button>
              <p class="subbody-black">{{ woundKit.wound_count }}</p>
              <button
                @click="handleEquipmentCount('plus', 'Wound')"
                class="i-mdi-plus-thick icon icon-2 color-red"
              >
                plus
              </button>
            </div>
          </div>
        </section>
      </section>
      <button
        @click="handleUpdateEquipment()"
        class="h-12 px-2 w-1/2 bg-red subbody-white col-span-1 mx-auto"
      >
        Add Caregivers & equipment to event
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_EVENT_BY_ID } from '@/graphql/event.query'
import { ALL_CAREGIVERS } from '@/graphql/caregiver.query'
import { ALL_EQUIPMENT } from '@/graphql/equipment.query'
import { UPDATE_EQUIPMENT } from '@/graphql/equipment.mutation'
import type { Equipment } from '@/interfaces/equipment.interface'
import type { Caregiver } from '@/interfaces/caregiver.interface'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  setup() {
    const route = useRoute()
    const isAccepted = ref(false)
    const AddCaregiver = ref(false)
    const addedCaregivers = ref<Caregiver[]>([])
    const addedEquipment = ref<Equipment[]>([])
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

    const { mutate: updateEquipment } = useMutation(UPDATE_EQUIPMENT)

    const woundKit = ref({
      bandage: 5,
      ointment: 10,
      pill: 20,
      wound_count: 0,
    })

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
            } else if (
              addedCaregivers.value.length <
              Math.round(event.value.event.expectedVisitorStaffCount / 500)
            ) {
              addedCaregivers.value.push(caregiver)
            }
          }
        }
      }
    }

    const closeAssigned = () => {
      AddCaregiver.value = false
    }

    const handleEquipmentCount = (action: string, type: string) => {
      switch (type) {
        case 'EHBO':
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
          break
        case 'Wound':
          if (action === 'minus') {
            console.log('minus')
            if (woundKit.value.wound_count === 0) {
              return
            }
            woundKit.value.wound_count--
          } else {
            console.log('plus')
            woundKit.value.wound_count++
          }
          break
      }
    }

    const handleUpdateEquipment = () => {
      console.log(woundKit.value.ointment * woundKit.value.wound_count)
      console.log(equipments.value.equipments)
      if (woundKit.value.wound_count > 0) {
        for (const equipment of equipments.value.equipments) {
          console.log(equipment.reservedStock)
          if (equipment.name === 'Flamigel') {
            addedEquipment.value.push(equipment)
          }
        }
        for (const equipment of addedEquipment.value) {
          console.log(addedEquipment.value)
          console.log(equipment)
          updateEquipment({
            updateEquipmentInput: {
              id: equipment.id,
              totalStock:
                equipment.totalStock -
                woundKit.value.wound_count * woundKit.value.ointment,
              reservedStock: {
                eventId: event.value.event.id,
                amount: woundKit.value.wound_count * woundKit.value.ointment,
              },
            },
          })
        }
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
      woundKit,
      addedCaregivers,
      handleAddEvent,
      handleNewCaregiver,
      handleAssigned,
      closeAssigned,
      handleEquipmentCount,
      handleUpdateEquipment,
    }
  },
}
</script>
