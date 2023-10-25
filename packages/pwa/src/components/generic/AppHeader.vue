<template class="h-full fixed">
  <!-- Header for the homepage -->
  <nav
    v-if="$route.path === `/`"
    class="nav-beige h-4rem w-full fixed sm:h-full w-3rem sm:w-5rem bottom-0"
  >
    <div
      class="flex flex-row sm:flex-col items-center justify-evenly sm:justify-between h-full mb-2 sm:m-0 sm:p-0"
    >
      <img
        src="/redCross.svg"
        alt="Red Cross logo"
        class="sm:pt-3 h-3rem sm:h-5rem sm:w-90% sm:mx-auto"
      />
      <div class="bg-red w-.5 h-full sm:hidden"></div>
      <img
        src="/login.svg"
        alt="login (for Caregivers)"
        class="sm:pb-3 h-3rem sm:h-5rem sm:w-70% sm:mx-auto"
      />
    </div>
  </nav>

  <!-- Header for the caregiver flow -->
  <nav v-else-if="$route.path.includes(`caregiver`)" class="nav-red w-15rem">
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

  <!-- header for the visitors flow -->
  <nav v-else class="nav-red w-10rem hidden">
    <div class="flex flex-col justify-between h-full">
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo"
        class="pt-3 w-90% mx-auto"
      />

      <div class="i-material-symbols-person text-red"></div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const nav: string = `wide`
</script>
