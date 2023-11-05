<template>
  <article class="ml-7rem">
    <h1 class="title-red">What happened?</h1>
    <p class="subtitle-red">What kind of help do you need?</p>
    <section class="flex flex-wrap justify-center items-center">
      <div v-for="item in items" class="bg-red rounded-xl p-3 m-3 w-1/4">
        <EmergencyCard
          :image="item.image"
          :title="item.text"
          :icon="item.icon"
          :subtitle="item.subtitle"
          :category="item.category"
        />
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import EmergencyCard from '../../../components/generic/emergencyCard.vue'

const { push } = useRouter()

const items = [
  {
    text: 'Unconscious',
    category: 'unconscious',
    icon: 'i-ic-baseline-phone',
    subtitle: 'You will be called for urgent aid',
    image: 'unconscious.svg',
  },
  { text: 'Fell', image: 'fell.svg', category: 'fell' },
  { text: 'Drug and/or alcohol abuse', category: 'drugs', image: 'drugs.svg' },
  { text: 'Heavy bleeding', category: 'bleed', image: 'bleed.svg' },
  { text: 'Allergic reaction', category: 'allergy', image: 'allergy.svg' },
  {
    text: "I don't know, something else",
    category: 'otherInjury',
    image: 'otherInjury.svg',
  },
]
const setCategory: any = async (category: string) => {
  push({ path: '/map', params: { categoryName: category } })
}
</script>

<style scoped>
/* Your CSS styles here */
</style>
