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

  <!-- test header for hamburger menu -->
  <nav
    v-else-if="$route.path.includes(`test`)"
    :class="showMenu ? 'bg-red py-4' : 'bg-beige w-full py-1'"
    class="md:flex-col-reverse items-center justify-around sticky h-full w-85% px-4 text-subtitle text-beige md:w-15rem md:py-0 md:bg-red"
  >
    <div
      :class="showMenu ? 'mb-3' : 'flex-row-reverse my-1'"
      class="flex justify-between items-center ml-7"
    >
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo in white"
        :class="{ hidden: !showMenu }"
        class="w-1/8"
        width="90"
        height="90"
      />
      <img
        src="/redCross.svg"
        alt="Red Cross logo in white"
        :class="{ hidden: showMenu }"
        class="w-1/8 md:hidden"
        width="90"
        height="90"
      />
      <div
        :class="showMenu ? 'i-ci-close-lg' : 'i-ci-hamburger-lg text-red'"
        class="icon-3 icon color-beige md:hidden block align-right"
        @click="showMenu = !showMenu"
      ></div>
    </div>

    <section
      :class="{ hidden: !showMenu }"
      class="h-full md:flex md:flex-col md:items-center md:h-auto"
    >
      <h2 class="ml-7 mt-0 subtitle-white text-start">Event</h2>
      <ul class="ml-7">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li class="body-white my-5 md:my-6">Ongoing Cases</li>
        <li class="body-white my-5 md:my-6">My cases</li>
        <li class="body-white my-5 md:my-6">Available Equipment</li>
        <li class="body-white my-5 md:my-6">Available Staff</li>
        <li class="body-white my-5 md:my-6">My closed cases</li>
      </ul>

      <h2 class="ml-7 subtitle-white text-start">All</h2>
      <ul class="ml-7 mt-0">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li class="body-white my-5 md:my-6">My Events</li>
        <li class="body-white my-5 md:my-6">All cases</li>
      </ul>

      <div class="flex flex-col justify-center items-center m-3">
        <img
          src="/dummyProfile.png"
          alt="login (for Caregivers)"
          class="pb-3 mx-auto w-1/4"
          width="90"
          height="90"
        />
        <p class="align-center body-beige">Profile</p>
      </div>
    </section>
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
import { ref } from 'vue'

let showMenu = ref(false)
</script>
