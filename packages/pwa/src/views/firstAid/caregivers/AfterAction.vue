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
        <div class="flex justify-between items-center gap-3 w-80%">
          <p class="body-black pb-3">
            Should the patient return for a check-up?
          </p>
          <div>
            <input
              type="radio"
              id="caseCheckUpTrue"
              value="true"
              class="peer/checkupTrue focus:accent-red checked:accent-red opacity-0"
              name="caseCheckUp"
              v-model="afterAction.checkUp"
            />
            <label
              for="caseCheckUpTrue"
              class="bg-none rounded-xl border-1 border-red subtitle-black w-7vw h-7vh px-5 py-1 cursor-pointer peer-checked/checkupTrue:color-white peer-checked/checkupTrue:bg-red peer-focus/checkupTrue:ring-2 peer-focus/checkupTrue:ring-offset-3 peer-focus/checkupTrue:ring-red"
              >Yes</label
            >
            <input
              type="radio"
              id="caseCheckUpFalse"
              value="false"
              class="peer/checkupFalse focus:accent-red checked:accent-red opacity-0"
              name="caseCheckUp"
              v-model="afterAction.checkUp"
            />
            <label
              for="caseCheckUpFalse"
              class="bg-none rounded-xl border-1 border-red subtitle-black w-7vw h-7vh px-5 py-1 cursor-pointer peer-checked/checkupFalse:color-white peer-checked/checkupFalse:bg-red peer-focus/checkupFalse:ring-2 peer-focus/checkupFalse:ring-offset-3 peer-focus/checkupFalse:ring-red"
              >No</label
            >
          </div>
        </div>

        <!-- Referred radio -->
        <div class="flex justify-between items-center gap-3 w-80%">
          <p class="body-black pb-3">
            Was the victim referred to a doctor or hospital?
          </p>
          <div>
            <input
              type="radio"
              id="caseReferredTrue"
              value="true"
              class="peer/referredTrue focus:accent-red checked:accent-red opacity-0"
              name="caseReferred"
              v-model="afterAction.referred"
            />
            <label
              for="caseReferredTrue"
              class="bg-none rounded-xl border-1 border-red subtitle-black w-7vw h-7vh px-5 py-1 cursor-pointer peer-checked/referredTrue:color-white peer-checked/referredTrue:bg-red peer-focus/referredTrue:ring-2 peer-focus/referredTrue:ring-offset-3 peer-focus/referredTrue:ring-red"
              >Yes</label
            >
            <input
              type="radio"
              id="caseReferredFalse"
              value="false"
              class="peer/referredFalse focus:accent-red checked:accent-red opacity-0"
              name="caseReferred"
              v-model="afterAction.referred"
            />
            <label
              for="caseReferredFalse"
              class="bg-none rounded-xl border-1 border-red subtitle-black w-7vw h-7vh px-5 py-1 cursor-pointer peer-checked/referredFalse:color-white peer-checked/referredFalse:bg-red peer-focus/referredFalse:ring-2 peer-focus/referredFalse:ring-offset-3 peer-focus/referredFalse:ring-red"
              >No</label
            >
          </div>
        </div>

        <!-- Personal insurance radio -->
        <div class="flex justify-between items-center gap-3 w-80%">
          <p class="body-black pb-3">
            Did the accident require the personal insurance of the victim?
          </p>
          <div>
            <input
              type="radio"
              id="casePersonalInsuranceTrue"
              value="true"
              class="peer/personalTrue focus:accent-red checked:accent-red opacity-0"
              name="casePersonalInsurance"
              v-model="afterAction.personalInsurance"
            />
            <label
              for="casePersonalInsuranceTrue"
              class="bg-none rounded-xl border-1 border-red subtitle-black w-7vw h-7vh px-5 py-1 cursor-pointer peer-checked/personalTrue:color-white peer-checked/personalTrue:bg-red peer-focus/personalTrue:ring-2 peer-focus/personalTrue:ring-offset-3 peer-focus/personalTrue:ring-red"
              >Yes</label
            >
            <input
              type="radio"
              id="casePersonalInsuranceFalse"
              value="false"
              class="peer/personalFalse focus:accent-red checked:accent-red opacity-0"
              name="casePersonalInsurance"
              v-model="afterAction.personalInsurance"
            />
            <label
              for="casePersonalInsuranceFalse"
              class="bg-none rounded-xl border-1 border-red subtitle-black w-7vw h-7vh px-5 py-1 cursor-pointer peer-checked/personalFalse:color-white peer-checked/personalFalse:bg-red peer-focus/personalFalse:ring-2 peer-focus/personalFalse:ring-offset-3 peer-focus/personalFalse:ring-red"
              >No</label
            >
          </div>
        </div>

        <!-- Event insurance radio -->
        <div class="flex justify-between items-center gap-3 w-80%">
          <p class="body-black pb-3">
            Did the accident require the insurance of the event?
          </p>
          <div>
            <input
              type="radio"
              id="caseEventInsuranceTrue"
              value="true"
              class="peer/eventTrue focus:accent-red checked:accent-red opacity-0"
              name="caseEventInsurance"
              v-model="afterAction.eventInsurance"
            />
            <label
              for="caseEventInsuranceTrue"
              class="bg-none rounded-xl border-1 border-red subtitle-black w-7vw h-7vh px-5 py-1 cursor-pointer peer-checked/eventTrue:color-white peer-checked/eventTrue:bg-red peer-focus/eventTrue:ring-2 peer-focus/eventTrue:ring-offset-3 peer-focus/eventTrue:ring-red"
              >Yes</label
            >
            <input
              type="radio"
              id="caseEventInsuranceFalse"
              value="false"
              class="peer/eventFalse focus:accent-red checked:accent-red opacity-0"
              name="caseEventInsurance"
              v-model="afterAction.eventInsurance"
            />
            <label
              for="caseEventInsuranceFalse"
              class="bg-none rounded-xl border-1 border-red subtitle-black w-7vw h-7vh px-5 py-1 cursor-pointer peer-checked/eventFalse:color-white peer-checked/eventFalse:bg-red peer-focus/eventFalse:ring-2 peer-focus/eventFalse:ring-offset-3 peer-focus/eventFalse:ring-red"
              >No</label
            >
          </div>
        </div>

        <div
          class="h-4vh w-1/2 flex justify-center items-center gap-3 self-center mt-2vh"
        >
          <p class="subbody-red">The accident</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-red">Follow up care</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-pink">Materials</p>
        </div>
        <button
          class="bg-red self-center rounded-md px-10 py-3 body-white mt-1vh hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
          @click="progress = 3"
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
        <p class="body-pink">What materials were used for this case?</p>

        <div
          class="flex justify-between items-center w-full bg-pink/30 rounded-xl p-2"
        >
          <p class="body-black">Flamigel</p>
          <div class="flex items-center">
            <button
              class="border-2 border-red w-4vw h-auto rounded-xl text-center subtitle-red cursor-pointer focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
              @click="countMaterial += 1"
            >
              +
            </button>

            <p class="body-black px-5">{{ countMaterial }}</p>

            <button
              class="border-2 border-red w-4vw h-auto rounded-xl text-center subtitle-red cursor-pointer focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
              @click="
                countMaterial != 0 ? (countMaterial -= 1) : (countMaterial = 0)
              "
            >
              -
            </button>
          </div>
        </div>
        <div
          class="h-4vh w-1/2 flex justify-center items-center gap-3 self-center mt-2vh"
        >
          <p class="subbody-red">The accident</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-red">Follow up care</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-red">Materials</p>
        </div>

        <button
          class="bg-red self-center rounded-md px-10 py-3 body-white mt-1vh hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
          @click="progress = 3"
        >
          Save case information
        </button>
      </section>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(1)
const countMaterial = ref(0)
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
const handleAfterAction = () => {
  console.log('after action')
}

// const handleMinus = (countMaterial: number) => {
//   if (countMaterial > 0) {
//     countMaterial -= 1
//   }
// }
</script>

<style scoped></style>
