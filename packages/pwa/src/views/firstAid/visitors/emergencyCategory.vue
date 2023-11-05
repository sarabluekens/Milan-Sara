<template>
  <h1>What happened?</h1>
  <p>What kind of help do you need?</p>

  <div>
    <EmergencyCard
      image="dummyProfile.png"
      title="test card"
      subimage="dummyprofile.png"
      subtitle="test subtitle"
    />
  </div>
</template>

<script>
import EmergencyCard from '../../../components/generic/emergencyCard.vue'
export default {
  name: 'EmergencyCategory',
  components: {
    EmergencyCard,
  },
  // Your Vue component logic here
}
</script>

<style scoped>
/* Your CSS styles here */
</style>
