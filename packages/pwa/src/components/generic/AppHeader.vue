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
      <div class="i-ic-round-person icon icon-5 color-red"></div>
    </div>
  </nav>

  <!-- Header for the caregiver flow -->
  <nav
    v-else-if="
      $route.path.includes(`caregiver`) || $route.path.includes(`auth/login`)
    "
    class="nav-red md:w-13rem xl:w-15rem"
  >
    <div class="flex flex-col justify-between h-full">
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo in white"
        class="pt-3 mx-auto w-3rem"
        width="90"
        height="90"
      />

      <h2 class="ml-7 mt-0 subtitle-white text-start">Event</h2>
      <ul class="ml-7">
        <div class="h-0.05rem bg-beige w-90% mt-1"></div>
        <li class="body-white my-6">Ongoing Cases</li>
        <li class="body-white my-6">My cases</li>
        <li class="body-white my-6">Available Equipment</li>
        <li class="body-white my-6">Available Staff</li>
        <li class="body-white my-6">My closed cases</li>
      </ul>

      <h2 class="ml-7 subtitle-white text-start">All</h2>
      <ul class="ml-7 mt-0">
        <div class="h-0.05rem bg-beige w-90% mt-1"></div>
        <li class="body-white my-6">My Events</li>
        <li class="body-white my-6">All cases</li>
      </ul>

      <div class="flex flex-col justify-center items-center m-3">
        <img
          src="/dummyProfile.png"
          alt="login (for Caregivers)"
          class="pb-3 mx-auto w-5rem"
          width="90"
          height="90"
        />
        <p class="align-center body-beige">Profile</p>
      </div>
    </div>
  </nav>

  <!-- header for the visitors flow -->
  <nav
    v-else
    class="nav-red h-4rem w-full fixed sm:h-full w-3rem sm:w-5rem bottom-0"
  >
    <div
      class="flex flex-row sm:flex-col items-center justify-evenly sm:justify-between h-full mb-2 sm:m-0 sm:p-0"
    >
      <div
        class="i-material-symbols-arrow-back-rounded icon icon-5 color-beige"
      ></div>
      <div class="bg-beige w-.5 h-full sm:hidden"></div>
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo"
        class="sm:pb-3 h-3rem sm:h-5rem sm:w-90% sm:mx-auto"
      />
    </div>
  </nav>
</template>

<script setup lang="ts">
const nav: string = `wide`
</script>
