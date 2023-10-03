<template>
  <div>
    <h1>HI, {{ firebaseUser?.displayName }}</h1>
  </div>
</template>

<script setup lang="ts">
import useFirebase from '@/composables/useFirebase'

const { firebaseUser } = useFirebase()

firebaseUser.value?.getIdToken().then(token => {
  console.log(`{"Authorization": "Bearer ${token}"}`)
})
</script>
