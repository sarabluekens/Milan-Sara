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
    class="flex flex-wrap md:flex-col-reverse items-center justify-between sticky h-full py-4 md:py-0 px-4 text-subtitle text-beige bg-red"
  >
    <img
      src="/whiteCross.svg"
      alt="Red cross logo"
      class=""
      width="30"
      height="30"
    />
    <div
      :class="showMenu ? '' : ` hidden `"
      class="h-full md:flex md:items-center md:h-auto"
      id="menu"
    >
      <ul class="text-body text-beige pt-4 md:flex md:justify-between md:pt-0">
        <li>
          <a class="md:p-4 py-2 block hover:text-red" href="#">Features</a>
        </li>
        <li>
          <a class="md:p-4 py-2 block hover:text-red" href="#">Pricing</a>
        </li>
        <li>
          <a class="md:p-4 py-2 block hover:text-red" href="#">Customers</a>
        </li>
        <li>
          <a class="md:p-4 py-2 block hover:text-red" href="#">Blog</a>
        </li>
        <li>
          <a class="md:p-4 py-2 block hover:text-red" href="#">Sign Up</a>
        </li>
      </ul>
    </div>

    <div
      @click="clickHandler"
      class="i-ci-hamburger-lg icon-2 icon color-beige md:hidden block"
      id="menu-button"
    ></div>
  </nav>
  <!-- second test header for hamburger meny -->
  <nav v-else-if="$route.path.includes(`test`)">
    <Slide>
      <a id="home" href="#">
        <span>Home</span>
      </a>
      <a id="home" href="#">
        <span>Home</span>
      </a>
      <a id="home" href="#">
        <span>Home</span>
      </a>
      <a id="home" href="#">
        <span>Home</span>
      </a>
      <a id="home" href="#">
        <span>Home</span>
      </a>
    </Slide>
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
let showMenu: boolean = false

const clickHandler = () => {
  showMenu = !showMenu
  console.log(showMenu)
}
</script>
