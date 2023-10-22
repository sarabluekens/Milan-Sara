<template>
  <nav v-if="nav === `inversed`" class="nav-beige">
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

  <nav v-else-if="nav === `small`" class="nav-red">
    <div class="flex flex-col justify-between h-full">
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo"
        class="pt-3 w-90% mx-auto"
      />

      <div class="i-material-symbols-person text-red"></div>
    </div>
  </nav>

  <nav v-else-if="nav === `wide`" class="nav-red w-15rem">
    <div class="flex flex-col justify-between h-full">
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo in white"
        class="pt-3 mx-auto"
        width="90"
        height="90"
      />
      <ul class="ml-6">
        <h2 class="subtitle-white text-start">Event</h2>
        <div class="h-0.05rem bg-beige w-90% mt-1"></div>
        <li class="i-material-symbols-person body-white my-8">Ongoing Cases</li>
        <li class="i-material-symbols-person body-white my-8">My cases</li>
        <li class="i-material-symbols-person body-white my-8">
          Available Equipment
        </li>
        <li class="body-white my-8">Available Staff</li>
        <li class="body-white my-8">My closed cases</li>
      </ul>
      <ul class="ml-6">
        <h2 class="subtitle-white text-start">All</h2>
        <div class="h-0.05rem bg-beige w-90% mt-1"></div>

        <li class="i-material-symbols-person body-white my-8">My Events</li>

        <li class="i-material-symbols-person body-white my-8">All cases</li>
      </ul>
      <div class="flex flex-col justify-center items-center m-3">
        <img
          src="/dummyProfile.png"
          alt="login (for Caregivers)"
          class="pb-3 mx-auto"
          width="90"
          height="90"
        />
        <p class="align-center subtitle-beige">Profile</p>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const nav: string = `wide`
</script>
