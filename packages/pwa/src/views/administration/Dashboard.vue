<template>
  <div>
    <h1 class="title-beige">Good to see you again, {{ firebaseUser?.uid }}</h1>

    <section
      class="flex sm:h-60vh h-90vh sm:flex-row sm:justify-evenly sm:w-48vw m-auto"
    >
      <div class="flex border-2 h-32 w-72 p-2">
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full"
        >
          <h3>2</h3>
          <p>Succesful events</p>
        </div>
      </div>
      <div class="flex border-2 h-32 w-72 p-2">
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full"
        >
          <h3>725</h3>
          <p>Completed cases</p>
        </div>
      </div>
      <div class="flex border-2 h-32 w-72 p-2">
        <div
          class="border-2 m-auto flex flex-col justify-center items-center w-full h-full"
        >
          <h3>28</h3>
          <p>Pending events</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import useFirebase from '@/composables/useFirebase'
import { useRouter } from 'vue-router'

export default {
  setup() {
    // Composable
    const { firebaseUser } = useFirebase()

    return {
      firebaseUser,
    }
  },
}
</script>
