<template>
  <article class="ml-5rem bg-beige">
    <h1 class="title-red">What happened?</h1>
    <p class="subtitle-red">What kind of help do you need?</p>
    <section class="flex flex-wrap justify-center items-center">
      <div v-for="item in categories" class="bg-red rounded-xl p-3 m-3 w-1/4">
        <EmergencyCard
          :image="item.image"
          :title="item.text"
          :category="item.category"
          v-model="caseInput.typeAccident"
          @click="handleNewCase(item.category)"
          :value="item.category"
        />
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import EmergencyCard from '@/components/EmergencyCard.vue'
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import { ADD_CASE } from '@/graphql/case.mutation'
import useRealtime from '@/composables/useRealtime'
import type { Case } from '@/interfaces/case.interface'

export default {
  components: { EmergencyCard },
  setup() {
    const { push } = useRouter()
    const { mutate: addCase } = useMutation(ADD_CASE)
    const { emit } = useRealtime()
    const categories = [
      {
        text: 'Unconscious',
        category: 'unconscious',
        // icon: 'i-ic-baseline-phone',
        // subtitle: 'You will be called for urgent aid',
        image: 'unconscious.svg',
      },
      { text: 'Fell', image: 'fell.svg', category: 'fell' },
      {
        text: 'Drug and/or alcohol abuse',
        category: 'drugs',
        image: 'drugs.svg',
      },
      { text: 'Heavy bleeding', category: 'bleed', image: 'bleed.svg' },
      { text: 'Allergic reaction', category: 'allergy', image: 'allergy.svg' },
      {
        text: "I don't know, something else",
        category: 'other',
        image: 'otherInjury.svg',
      },
    ]

    const caseInput = ref({
      date: new Date(),
      typeAccident: '',
      eventId: 'tempEventId2',
    })
    const handleNewCase = async (category: string) => {
      caseInput.value.typeAccident = category
      const result = await addCase({
        caseInput: caseInput.value,
      })
      // add case in the carevigers dashboard
      emit('case:created', result?.data?.createCase as Case)
      console.log('HEEEEEEEREEEEEEEEEEEE')

      // send caseId to the map
      const caseId = result?.data?.createCase.id
      push({ path: `/map/${caseId}` })
    }

    return {
      caseInput,
      handleNewCase,
      categories,
    }
  },
}
</script>

<style scoped>
/* Your CSS styles here */
</style>
