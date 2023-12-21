<template>
  <section class="md:ml-15rem md:pt-0 pt-5rem">
    <h1 class="title-red leading-tight md:leading-normal">
      After action report
    </h1>
    <p class="subtitle-pink md:pt-0 pt-2rem">Please fill in all the fields</p>
    <form @submit.prevent="handleAfterAction">
      <!-- Accident -->
      <section
        v-if="progress == 1"
        class="h-60vh w-80% m-auto mt-1rem flex flex-col gap-5"
      >
        <h2 class="subtitle-red text-left">The accident</h2>

        <div class="flex flex-col md:flew-row justify-between">
          <label class="body-black my-1 md:my-0" for="caseWhatHappened"
            >What happened?</label
          >
          <textarea
            v-model.lazy="afterAction.whatHappened"
            type="area"
            placeholder="Describe the accident"
            id="caseWhatHappened"
            class="largeInput-pink w-80vw md:w-auto"
          ></textarea>
        </div>
        <div class="flex flex-col md:flew-row justify-between">
          <label class="body-black my-1 md:my-0" for="caseDiagnose"
            >Medical diagnose</label
          >
          <textarea
            v-model.lazy="afterAction.diagnose"
            type="area"
            placeholder="Describe the injuries after your medical examination."
            id="caseDiagnose"
            class="largeInput-pink w-80vw md:w-auto"
          ></textarea>
        </div>
        <div class="flex flex-col md:flew-row justify-between">
          <label class="body-black my-1 md:my-0" for="caseCare"
            >What care did you give?</label
          >
          <textarea
            v-model.lazy="afterAction.providedCare"
            type="area"
            placeholder="Describe how you provided care for the victim."
            id="caseCare"
            class="largeInput-pink w-80vw md:w-auto"
          ></textarea>
        </div>
        <div
          class="h-4vh flex justify-center items-center gap-3 self-center mt-2vh opacity-0 md:opacity-100"
        >
          <p class="md:subbody-red">The accident</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="md:subbody-pink">Follow up care</p>
          <div class="w-3rem h-0.1rem bg-pink"></div>
          <p class="subbody-pink">Materials</p>
        </div>
        <button
          class="bg-red self-center rounded-md mb-3rem md:m-0 px-10 py-3 body-white mt-1vh hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
          @click="progress = 2"
        >
          Go to follow up care
        </button>
      </section>

      <!-- Follow up care -->
      <section
        v-else-if="progress == 2"
        class="h-60vh w-80% m-auto mt-4rem flex flex-col gap-5"
      >
        <h2 class="subtitle-red text-left">After Care</h2>

        <!-- Checkup radio -->
        <div
          class="flex flex-col m-auto md:flex-row justify-between items-center gap-3 w-80%"
        >
          <p class="body-black pb-3 lg:w-2/3">
            Should the patient return for a check-up?
          </p>
          <div class="m-auto flex md:flex-col">
            <input
              type="radio"
              id="caseCheckUpTrue"
              v-bind:value="true"
              class="peer/checkupTrue focus:accent-red checked:accent-red opacity-0"
              name="caseCheckUp"
              v-model="afterAction.checkUp"
            />
            <label
              for="caseCheckUpTrue"
              class="bg-none rounded-xl border-1 border-red subtitle-black px-5 py-1 cursor-pointer peer-checked/checkupTrue:color-white peer-checked/checkupTrue:bg-red peer-focus/checkupTrue:ring-2 peer-focus/checkupTrue:ring-offset-3 peer-focus/checkupTrue:ring-red"
              >Yes</label
            >
            <input
              type="radio"
              id="caseCheckUpFalse"
              v-bind:value="false"
              class="peer/checkupFalse focus:accent-red checked:accent-red opacity-0"
              name="caseCheckUp"
              v-model="afterAction.checkUp"
            />
            <label
              for="caseCheckUpFalse"
              class="bg-none rounded-xl border-1 border-red subtitle-black px-5 py-1 cursor-pointer peer-checked/checkupFalse:color-white peer-checked/checkupFalse:bg-red peer-focus/checkupFalse:ring-2 peer-focus/checkupFalse:ring-offset-3 peer-focus/checkupFalse:ring-red"
              >No</label
            >
          </div>
        </div>

        <!-- Referred radio -->
        <div
          class="flex flex-col m-auto md:flex-row justify-between items-center gap-3 w-80%"
        >
          <p class="body-black pb-3 lg:w-2/3">
            Was the victim referred to a doctor or hospital?
          </p>
          <div class="m-auto flex md:flex-col">
            <input
              type="radio"
              id="caseReferredTrue"
              v-bind:value="true"
              class="peer/referredTrue focus:accent-red checked:accent-red opacity-0"
              name="caseReferred"
              v-model="afterAction.referred"
            />
            <label
              for="caseReferredTrue"
              class="bg-none rounded-xl border-1 border-red subtitle-black px-5 py-1 cursor-pointer peer-checked/referredTrue:color-white peer-checked/referredTrue:bg-red peer-focus/referredTrue:ring-2 peer-focus/referredTrue:ring-offset-3 peer-focus/referredTrue:ring-red"
              >Yes</label
            >
            <input
              type="radio"
              id="caseReferredFalse"
              v-bind:value="false"
              class="peer/referredFalse focus:accent-red checked:accent-red opacity-0"
              name="caseReferred"
              v-model="afterAction.referred"
            />
            <label
              for="caseReferredFalse"
              class="bg-none rounded-xl border-1 border-red subtitle-black px-5 py-1 cursor-pointer peer-checked/referredFalse:color-white peer-checked/referredFalse:bg-red peer-focus/referredFalse:ring-2 peer-focus/referredFalse:ring-offset-3 peer-focus/referredFalse:ring-red"
              >No</label
            >
          </div>
        </div>

        <!-- Personal insurance radio -->
        <div
          class="flex flex-col m-auto md:flex-row justify-between items-center gap-3 w-80%"
        >
          <p class="body-black pb-3 lg:w-2/3">
            Did the accident require the personal insurance of the victim?
          </p>
          <div class="m-auto flex md:flex-col">
            <input
              type="radio"
              id="casePersonalInsuranceTrue"
              v-bind:value="true"
              class="peer/personalTrue focus:accent-red checked:accent-red opacity-0"
              name="casePersonalInsurance"
              v-model="afterAction.personalInsurance"
            />
            <label
              for="casePersonalInsuranceTrue"
              class="bg-none rounded-xl border-1 border-red subtitle-black px-5 py-1 cursor-pointer peer-checked/personalTrue:color-white peer-checked/personalTrue:bg-red peer-focus/personalTrue:ring-2 peer-focus/personalTrue:ring-offset-3 peer-focus/personalTrue:ring-red"
              >Yes</label
            >
            <input
              type="radio"
              id="casePersonalInsuranceFalse"
              v-bind:value="false"
              class="peer/personalFalse focus:accent-red checked:accent-red opacity-0"
              name="casePersonalInsurance"
              v-model="afterAction.personalInsurance"
            />
            <label
              for="casePersonalInsuranceFalse"
              class="bg-none rounded-xl border-1 border-red subtitle-black px-5 py-1 cursor-pointer peer-checked/personalFalse:color-white peer-checked/personalFalse:bg-red peer-focus/personalFalse:ring-2 peer-focus/personalFalse:ring-offset-3 peer-focus/personalFalse:ring-red"
              >No</label
            >
          </div>
        </div>

        <!-- Event insurance radio -->
        <div
          class="flex flex-col m-auto md:flex-row justify-between items-center gap-3 w-80%"
        >
          <p class="body-black pb-3 lg:w-2/3">
            Did the accident require the insurance of the event?
          </p>
          <div class="m-auto flex md:flex-col">
            <input
              type="radio"
              id="caseEventInsuranceTrue"
              v-bind:value="true"
              class="peer/eventTrue focus:accent-red checked:accent-red opacity-0"
              name="caseEventInsurance"
              v-model="afterAction.eventInsurance"
            />
            <label
              for="caseEventInsuranceTrue"
              class="bg-none rounded-xl border-1 border-red subtitle-black px-5 py-1 cursor-pointer peer-checked/eventTrue:color-white peer-checked/eventTrue:bg-red peer-focus/eventTrue:ring-2 peer-focus/eventTrue:ring-offset-3 peer-focus/eventTrue:ring-red"
              >Yes</label
            >
            <input
              type="radio"
              id="caseEventInsuranceFalse"
              v-bind:value="false"
              class="peer/eventFalse focus:accent-red checked:accent-red opacity-0"
              name="caseEventInsurance"
              v-model="afterAction.eventInsurance"
            />
            <label
              for="caseEventInsuranceFalse"
              class="bg-none rounded-xl border-1 border-red subtitle-black px-5 py-1 cursor-pointer peer-checked/eventFalse:color-white peer-checked/eventFalse:bg-red peer-focus/eventFalse:ring-2 peer-focus/eventFalse:ring-offset-3 peer-focus/eventFalse:ring-red"
              >No</label
            >
          </div>
        </div>

        <div
          class="h-4vh w-1/2 flex justify-center items-center gap-3 self-center mt-2vh opacity-0 md:opacity-100"
        >
          <p class="subbody-red">The accident</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-red">Follow up care</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-pink">Materials</p>
        </div>
        <button
          class="bg-red self-center rounded-md px-10 py-3 body-white mt-1vh hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
          @click="handleClick"
        >
          Go to materials
        </button>
      </section>

      <!-- Materials -->
      <section
        v-if="progress === 3"
        class="h-60vh w-80% m-auto mt-1rem flex flex-col gap-5"
      >
        <h2 class="subtitle-red text-left">Materials</h2>
        <p class="body-black">What materials were used for this case?</p>

        <div v-for="item in eventEquipment">
          <div
            class="flex justify-between items-center w-full bg-pink/30 rounded-xl p-2"
          >
            <p class="body-black">{{ item.name }}</p>

            <div class="flex items-center">
              <button
                class="border-2 border-red w-12vw sm:w-8vw md:w-4vw h-auto rounded-xl text-center subtitle-red cursor-pointer focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
                @click="
                  item.count < item.amount ? (item.count += 1) : item.count
                "
              >
                +
              </button>

              <p class="body-black px-5">{{ item.count }}</p>

              <button
                class="border-2 border-red w-12vw sm:w-8vw md:w-4vw h-auto rounded-xl text-center subtitle-red cursor-pointer focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
                @click="item.count != 0 ? (item.count -= 1) : (item.count = 0)"
              >
                -
              </button>
            </div>
          </div>
        </div>

        <div
          class="h-4vh w-1/2 flex justify-center items-center gap-3 self-center mt-2vh opacity-0 md:opacity-100"
        >
          <p class="subbody-red">The accident</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-red">Follow up care</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-red">Materials</p>
        </div>

        <button
          class="bg-red self-center rounded-md px-10 py-3 body-white mt-1vh hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
          @click="handleAfterForm"
        >
          Save case information
        </button>
      </section>
    </form>
  </section>
</template>

<script setup lang="ts">
import { CASE_BY_ID } from '@/graphql/case.query'
import { GET_EQUIPMENT_BY_CASE_ID } from '@/graphql/equipment.query'
import { useQuery, useMutation } from '@vue/apollo-composable'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UPDATE_CASE_AFTER_ACTION } from '@/graphql/case.mutation'
// UPDATE_CASE_AFTER_ACTION
//
const router = useRouter()
const { push } = useRouter()
const { mutate: updateCaseAfterAction } = useMutation(UPDATE_CASE_AFTER_ACTION)

const caseId = router.currentRoute.value.params.caseId
const progress = ref(1)
const afterAction = ref({
  whatHappened: '',
  diagnose: '',
  providedCare: '',
  checkUp: false,
  referred: false,
  personalInsurance: false,
  eventInsurance: false,
  usedMaterials: [],
})
console.log(caseId)

const {
  loading: equipmentLoading,
  result: equipment,
  error: equipmentError,
} = useQuery(GET_EQUIPMENT_BY_CASE_ID, {
  caseId: caseId as string,
})

const {
  loading: caseLoading,
  result: currentCase,
  error: caseError,
} = useQuery(CASE_BY_ID, {
  id: caseId,
})

const eventEquipment = ref<{ name: String; amount: number; count: number }[]>(
  [],
)

const checkEquipmentAvailability = () => {
  console.log(equipment.value.equipmentByCaseId)

  for (const item of equipment.value.equipmentByCaseId) {
    const name = item.name
    console.log(currentCase.value.caseById.eventId)
    console.log(item.reservedStock)

    for (const equipment of item.reservedStock) {
      if (
        equipment.eventId.includes(currentCase.value.caseById.eventId as string)
      )
        if (eventEquipment.value.length === 0) {
          eventEquipment.value.push({
            name,
            amount: equipment.amount,
            count: 0,
          })
        } else {
          for (const newEquipment of eventEquipment.value)
            if (newEquipment.name === name) {
              newEquipment.amount += equipment.amount
            } else {
              eventEquipment.value.push({
                name,
                amount: equipment.amount,
                count: 0,
              })
            }
        }
    }

    console.log(eventEquipment.value)
  }
}

const handleClick = () => {
  progress.value = 3
  checkEquipmentAvailability()
}

const handleAfterAction = () => {
  console.log('after action')
}

const handleAfterForm = () => {
  updateCaseAfterAction({
    updateCaseInput: {
      caseId: caseId as string,
      accidentDescription: afterAction.value.whatHappened,
      diagnose: afterAction.value.diagnose,
      careGiven: afterAction.value.providedCare,
      checkUpRequired: afterAction.value.checkUp as boolean,
      referred: afterAction.value.referred,
      personalEnsurance: afterAction.value.personalInsurance,
      eventEnsurance: afterAction.value.eventInsurance,
      usedMaterials: eventEquipment.value,
    },
  })
  push({ path: `/caregiver/dashboard` })
}
</script>

<style scoped></style>
