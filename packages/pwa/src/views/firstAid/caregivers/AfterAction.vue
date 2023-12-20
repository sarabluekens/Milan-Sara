<template>
  <section class="ml-15rem">
    <h1 class="title-red">After action rapport</h1>
    <p class="subtitle-pink">Please fill in all the fields</p>
    <form @submit.prevent="handleAfterAction">
      <section
        v-if="progress === 1"
        class="h-60vh w-80% m-auto mt-1rem flex flex-col gap-5"
      >
        <h2 class="subtitle-red text-left">The accident</h2>

        <div class="flex justify-between">
          <label class="subbody-black" for="caseWhatHappened"
            >What happened?</label
          >
          <textarea
            v-model.lazy="afterAction.whatHappened"
            type="area"
            placeholder="Describe the accident"
            id="caseWhatHappened"
            class="largeInput-pink"
          ></textarea>
        </div>
        <div class="flex justify-between">
          <label class="subbody-black" for="caseDiagnose"
            >Medical diagnose</label
          >
          <textarea
            v-model.lazy="afterAction.diagnose"
            type="area"
            placeholder="Describe the injuries after your medical examination."
            id="caseDiagnose"
            class="largeInput-pink"
          ></textarea>
        </div>
        <div class="flex justify-between">
          <label class="subbody-black" for="caseCare"
            >What care did you give?</label
          >
          <textarea
            v-model.lazy="afterAction.providedCare"
            type="area"
            placeholder="Describe how you provided care for the victim."
            id="caseCare"
            class="largeInput-pink"
          ></textarea>
        </div>
        <div
          class="h-4vh w-1/2 flex justify-center items-center gap-3 self-center mt-2vh"
        >
          <p class="subbody-red">The accident</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-pink">Follow up care</p>
          <div class="w-3rem h-0.1rem bg-pink"></div>
          <p class="subbody-pink">Materials</p>
        </div>
        <button
          type="submit"
          class="bg-red self-center rounded-md px-10 py-3 body-white mt-1vh hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
        >
          Go to follow up care
        </button>
      </section>

      <!-- Second part -->
      <section
        v-else-if="progress === 2"
        class="h-60vh w-80% m-auto mt-4rem flex flex-col gap-5"
      >
        <h2 class="subtitle-red text-left">After Care</h2>
        <!--  -->
        <div>
          <p class="subbody-black">Should the patient return for a check-up?</p>
          <label for="caseCheckUp" class="border-2 border-red rounded-xl">
            <input
              id="caseCheckUp"
              type="radio"
              v-model="afterAction.checkUp"
              value="true"
              class="w-3vw h-3vh"
            />
            Yes
          </label>
          <label for="caseReferred">
            <input
              id="caseReferred"
              type="radio"
              v-model="afterAction.referred"
              value="false"
            />
            No
          </label>
        </div>

        <!--  -->
        <div class="flex justify-between">
          <label class="subbody-black" for="caseWhatHappened"
            >What happened?</label
          >
          <input
            v-model.lazy="afterAction.whatHappened"
            type="radio"
            placeholder="Describe the accident"
            id="caseWhatHappened"
            class="largeInput-pink"
          />
        </div>
        <div class="flex justify-between">
          <label class="subbody-black" for="caseDiagnose"
            >Medical diagnose</label
          >
          <input
            v-model.lazy="afterAction.diagnose"
            type="radio"
            placeholder="Describe the injuries after your medical examination."
            id="caseDiagnose"
            class="largeInput-pink"
          />
        </div>
        <div class="flex justify-between">
          <label class="subbody-black" for="caseCare"
            >What care did you give?</label
          >
          <input
            v-model.lazy="afterAction.providedCare"
            type="radio"
            placeholder="Describe how you provided care for the victim."
            id="caseCare"
            class="largeInput-pink"
          />
        </div>
        <div
          class="h-4vh w-1/2 flex justify-center items-center gap-3 self-center mt-2vh"
        >
          <p class="subbody-red">The accident</p>
          <div class="w-3rem h-0.1rem bg-red"></div>
          <p class="subbody-pink">Follow up care</p>
          <div class="w-3rem h-0.1rem bg-pink"></div>
          <p class="subbody-pink">Materials</p>
        </div>
        <button
          type="submit"
          class="bg-red self-center rounded-md px-10 py-3 body-white mt-1vh hover:bg-red/90 focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
        >
          Go to follow up care
        </button>
      </section>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(2)
const afterAction = ref({
  whatHappened: '',
  diagnose: '',
  providedCare: '',
  checkUp: false,
  referred: false,
  personalInsurance: false,
  eventInsurance: false,
})
const handleAfterAction = () => {
  console.log('after action')
}
</script>

<style scoped></style>
