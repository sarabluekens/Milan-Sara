<template>
  <nav v-if="nav === `inversed`" class="nav-beige">
    <h1 class="hidden">Home</h1>

    <div class="flex flex-col justify-between h-full">
      <img
        src="/redCross.svg"
        alt="Red Cross logo"
        class="pt-3 w-90% mx-auto"
      />
      <img
        src="/login.svg"
        alt="login (for Caregivers)"
        class="pb-3 w-70% mx-auto"
      />
    </div>
  </nav>

  <nav v-else-if="nav === `small`">
    <h1>small jgnosgbrzog</h1>
  </nav>

  <nav v-else-if="nav === `wide`">
    <h1>wide jgnosgbrzog</h1>
  </nav>
</template>

<script setup lang="ts">
const nav: string = `inversed`
</script>
