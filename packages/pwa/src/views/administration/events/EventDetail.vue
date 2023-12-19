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
      <img
        class="col-span-4 h-auto"
        :src="event.event.mapsLink"
        alt="map of the event"
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
          <div v-for="caregiver in addedCaregivers">
            <StaffCard :caregiver="caregiver" />
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
          <div v-for="item in kits">
            <div
              v-if="item.available"
              class="border-1 border-red w-50 text-center mb-4"
            >
              <p class="body-black">{{ item.kitName }}</p>
              <p>consists of:</p>
              <li v-for="equipment in item.contents" class="grid grid-cols-4">
                <p class="subbody-black col-span-2">
                  {{ equipment.name }}
                </p>
                <p class="subbody-black col-span-1">{{ equipment.count }}</p>
              </li>
              <div class="flex flex-row justify-between mt-4">
                <button
                  @click="handleEquipmentCount('minus', item.kitName)"
                  class="i-mdi-minus-thick icon icon-2 color-red"
                >
                  minus
                </button>
                <p class="subbody-black">{{ item.count }}</p>
                <button
                  @click="handleEquipmentCount('plus', item.kitName)"
                  class="i-mdi-plus-thick icon icon-2 color-red"
                >
                  plus
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
      <button
        @click="handleUpdateEquipmentCaregiver()"
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
import type { Caregiver } from '@/interfaces/caregiver.interface'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import StaffCard from '@/components/StaffCard.vue'
import { UPDATE_CAREGIVER } from '@/graphql/caregiver.mutation'

export default {
  components: { StaffCard },
  setup() {
    const route = useRoute()
    const isAccepted = ref(false)
    const AddCaregiver = ref(false)
    const addedCaregivers = ref<Caregiver[]>([])
    const availableCaregivers = ref<Caregiver[]>([])
    const addedEquipment = ref<
      { categoryName: string; name: string; count: number }[]
    >([])
    const woundKit_count = ref(0)
    const woundKit_available = ref(true)
    const ehboKit_count = ref(0)
    const ehboKit_available = ref(true)

    const {
      loading: eventLoading,
      result: event,
      error: eventError,
    } = useQuery(GET_EVENT_BY_ID, { id: route.params.id })

    const {
      loading: caregiverLoading,
      result: caregivers,
      error: caregiverError,
    } = useQuery(ALL_CAREGIVERS)

    const {
      loading: equipmentLoading,
      result: equipments,
      error: equipmentError,
    } = useQuery(ALL_EQUIPMENT)

    const { mutate: updateEquipment } = useMutation(UPDATE_EQUIPMENT)
    const { mutate: updateCaregiver } = useMutation(UPDATE_CAREGIVER)

    const kits = ref([
      {
        kitName: 'unconsciousKit',
        contents: [
          { categoryName: 'Other', name: 'AED', count: 1 },
          { categoryName: 'Other', name: 'Spineboard', count: 1 },
          { categoryName: 'Pill', name: 'Motilium', count: 2 },
        ],
        count: 0,
        available: true,
      },
      {
        kitName: 'fellKit',
        contents: [
          { categoryName: 'Other', name: 'Spineboard', count: 1 },
          { categoryName: 'Pill', name: 'Paracetamol', count: 3 },
        ],
        count: 0,
        available: true,
      },
      {
        kitName: 'drugsKit',
        contents: [
          { categoryName: 'Other', name: 'AED', count: 1 },
          { categoryName: 'Pill', name: 'Naloxone', count: 5 },
          { categoryName: 'Pill', name: 'Motilium', count: 2 },
        ],
        count: 0,
        available: true,
      },
      {
        kitName: 'bleedKit',
        contents: [
          { categoryName: 'Bandage', name: 'Compress pads', count: 5 },
          { categoryName: 'Bandage', name: 'Bandage', count: 5 },
          { categoryName: 'Pill', name: 'Paracetamol', count: 3 },
          { categoryName: 'Ointment', name: 'Iso-Betadine', count: 2 },
        ],
        count: 0,
        available: true,
      },
      {
        kitName: 'allergyKit',
        contents: [
          { categoryName: 'Syringe', name: 'EpiPen', count: 1 },
          { categoryName: 'Pill', name: 'Paracetamol', count: 4 },
          { categoryName: 'Ointment', name: 'Flamigel', count: 2 },
        ],
        count: 0,
        available: true,
      },
      {
        kitName: 'otherKit',
        contents: [
          { categoryName: 'Other', name: 'AED', count: 1 },
          { categoryName: 'Other', name: 'Spineboard', count: 1 },
          { categoryName: 'Pill', name: 'Paracetamol', count: 10 },
          { categoryName: 'Pill', name: 'Motilium', count: 10 },
          { categoryName: 'Bandage', name: 'Compress pads', count: 4 },
          { categoryName: 'Ointment', name: 'Flamigel', count: 5 },
        ],
        count: 0,
        available: true,
      },
    ])

    const handleAddEvent = () => {
      isAccepted.value = true
      console.log(isAccepted)
      console.log(event.value.event)
      checkEquipmentAvailability()
      checkCaregiverAvailability()
    }

    const handleNewCaregiver = () => {
      console.log('new caregiver')
      AddCaregiver.value = true
      console.log(caregivers)
    }

    const checkCaregiverAvailability = () => {
      for (const caregiver of caregivers.value.caregivers) {
        if (caregiver.jobs.length === 0) {
          availableCaregivers.value.push(caregiver)
        } else {
          for (const job of caregiver.jobs) {
            for (const eventDate of event.value.event.dates) {
              if (!job.workdays.includes(eventDate.substring(0, 10))) {
                availableCaregivers.value.push(caregiver)
              }
            }
          }
        }
      }
      /*       for (const equipment of equipments.value.equipments) {
        for (const kitIem of kits.value) {
          for (const equipmentName of kitIem.contents) {
            if (equipment.name === equipmentName.name) {
              if (equipment.totalStock < equipmentName.count) {
                kitIem.available = false
              }
            }
          }
        }
      } */
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

    const checkEquipmentAvailability = () => {
      for (const equipment of equipments.value.equipments) {
        for (const kitIem of kits.value) {
          for (const equipmentName of kitIem.contents) {
            if (equipment.name === equipmentName.name) {
              if (equipment.totalStock < equipmentName.count) {
                kitIem.available = false
              }
            }
          }
        }
      }
    }

    const handleEquipmentCount = (action: string, type: string) => {
      for (const kitIem of kits.value) {
        if (kitIem.kitName === type) {
          if (action === 'plus') {
            kitIem.count++
          } else if (action === 'minus') {
            if (kitIem.count > 0) {
              kitIem.count--
            }
          }
        }
      }
    }

    const handleUpdateEquipmentCaregiver = () => {
      handleUpdateEquipment()
      handleUpdateCaregiver()
    }

    // This function updates the caregivers in the database
    const handleUpdateCaregiver = () => {
      console.log('update caregivers')
      for (const caregiver of addedCaregivers.value) {
        updateCaregiver({
          updateCaregiverInput: {
            caregiverId: caregiver.id,
            jobs: {
              eventId: event.value.event.id,
              workdays: event.value.event.dates,
            },
          },
        })
      }
    }

    // This function adds the equipment to an array so it can check if it already exists and if it does it adds the count to the existing equipment
    const handleUpdateEquipment = () => {
      for (const kitItem of kits.value) {
        if (kitItem.count > 0) {
          for (const equipment of equipments.value.equipments) {
            for (const equipmentItem of kitItem.contents) {
              if (equipment.name === equipmentItem.name) {
                console.log(kitItem.kitName, ': ', equipmentItem.name)
                if (addedEquipment.value.length === 0) {
                  addedEquipment.value.push({
                    categoryName: equipmentItem.categoryName,
                    name: equipmentItem.name,
                    count: kitItem.count * equipmentItem.count,
                  })
                } else if (addedEquipment.value.length > 0) {
                  let found = addedEquipment.value.find(
                    element => element.name === equipmentItem.name,
                  )
                  if (found) {
                    found.count += kitItem.count * equipmentItem.count
                  } else {
                    addedEquipment.value.push({
                      categoryName: equipmentItem.categoryName,
                      name: equipmentItem.name,
                      count: kitItem.count * equipmentItem.count,
                    })
                  }
                }
              }
            }
          }
        }
      }
      updateEquipmentFromArray()
    }

    // This function updates the equipment in the database
    const updateEquipmentFromArray = () => {
      console.log('update equipment')
      for (const equipment of equipments.value.equipments) {
        for (const equipmentItem of addedEquipment.value) {
          if (equipment.name === equipmentItem.name) {
            console.log(equipment.name, ': ', equipmentItem.name)
            updateEquipment({
              updateEquipmentInput: {
                id: equipment.id,
                totalStock: equipment.totalStock - equipmentItem.count,
                reservedStock: {
                  eventId: event.value.event.id,
                  amount: equipmentItem.count,
                },
              },
            })
          }
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
      kits,
      ehboKit_count,
      ehboKit_available,
      woundKit_count,
      woundKit_available,
      addedCaregivers,
      handleAddEvent,
      handleNewCaregiver,
      handleAssigned,
      closeAssigned,
      handleEquipmentCount,
      handleUpdateEquipmentCaregiver,
    }
  },
}
</script>
