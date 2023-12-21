<template class="h-full fixed">
  <!-- Header for the homepage -->
  <nav
    v-if="$route.path === `/`"
    class="nav-red h-4rem w-full fixed sm:h-full w-3rem sm:w-5rem bottom-0 border-t-2"
  ></nav>

  <nav
    v-else-if="$route.path.includes(`home`)"
    class="nav-beige h-4rem w-full fixed sm:h-full w-3rem sm:w-5rem bottom-0 border-t-2"
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

  <!-- header for the caregivers flow -->
  <nav
    v-else-if="
      $route.path.includes(`caregiver`) || $route.path.includes(`auth/login`)
    "
    :class="showMenu ? 'bg-red py-4 h-max' : 'bg-beige w-full py-1 h-auto'"
    class="fixed flex-col items-stretch justify-between z-1 w-85% px-4 text-subtitle text-beige md:text-title md:flex-col-reverse md:py-0 md:h-full md:bg-red md:w-15rem xl:w-17rem"
  >
    <div
      :class="showMenu ? 'mb-3' : 'flex-row-reverse my-1'"
      class="flex justify-between items-center ml-7 h-auto"
    >
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo in white"
        :class="{ hidden: !showMenu }"
        class="w-1/8 md:inline md:mx-auto md:mt-5 md:w-1/4 md:h-auto lg:w-1/3"
        width="90"
        height="90"
      />
      <img
        src="/redCross.svg"
        alt="Red Cross logo in white"
        :class="{ hidden: showMenu }"
        class="w-3rem md:hidden"
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
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 mt-0 subtitle-white text-start">Event</h2>
      <ul class="ml-3">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li class="body-white my-10% sm:my-5% md:my-6">Ongoing Cases</li>
        <li class="body-white my-10% sm:my-5% md:my-6">My cases</li>
        <li class="body-white my-10% sm:my-5% md:my-6">Available Equipment</li>
        <li class="body-white my-10% sm:my-5% md:my-6">Available Staff</li>
        <li class="body-white my-10% sm:my-5% md:my-6">My closed cases</li>
      </ul>
    </section>
    <section
      :class="{ hidden: !showMenu }"
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 subtitle-white text-start">All</h2>
      <ul class="ml-3 mt-0">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li class="body-white my-10% sm:my-5% md:my-6">My Events</li>
        <li class="body-white my-10% sm:my-5% md:my-6">All cases</li>
      </ul>
    </section>
    <section
      :class="{ hidden: !showMenu }"
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <div class="flex flex-col justify-center items-center m-3">
        <img
          src="/dummyProfile.png"
          alt="login (for Caregivers)"
          class="pb-3 mx-auto w-1/4 md:w-1/2"
          width="90"
          height="90"
        />
        <p class="align-center body-beige">Profile</p>
      </div>
    </section>
  </nav>

  <!-- header for the admin flow -->
  <nav
    v-else-if="$route.path.includes(`admin`)"
    :class="showMenu ? 'bg-red py-4 h-full' : 'bg-beige w-full py-1 h-auto'"
    class="absolute flex-col items-stretch justify-between z-1 w-85% px-4 text-subtitle text-beige md:text-title md:flex-col-reverse md:py-0 md:h-full md:bg-red md:w-15rem xl:w-17rem"
  >
    <div
      :class="showMenu ? 'mb-3' : 'flex-row-reverse my-1'"
      class="flex justify-between items-center ml-7 h-auto"
    >
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo in white"
        :class="{ hidden: !showMenu }"
        class="w-1/8 md:inline md:mx-auto md:mt-5 md:w-1/4 md:h-auto lg:w-1/3"
        width="90"
        height="90"
      />
      <img
        src="/redCross.svg"
        alt="Red Cross logo in white"
        :class="{ hidden: showMenu }"
        class="w-3rem md:hidden"
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
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 mt-0 subtitle-white text-start">Event</h2>
      <ul class="ml-3">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li
          class="body-white my-10% sm:my-5% md:my-6 cursor-pointer"
          @click="handlePush('/admin/event')"
        >
          All events
        </li>
        <li class="body-white my-10% sm:my-5% md:my-6 cursor-pointer">
          Pending events
        </li>
        <li class="body-white my-10% sm:my-5% md:my-6">Succesful events</li>
        <li class="body-white my-10% sm:my-5% md:my-6">Cancelled events</li>
      </ul>
    </section>
    <section
      :class="{ hidden: !showMenu }"
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 mt-0 subtitle-white text-start">Staff</h2>
      <ul class="ml-3">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li
          class="body-white my-10% sm:my-5% md:my-6 cursor-pointer"
          @click="handlePush('/admin/staff')"
        >
          All staff
        </li>
      </ul>
    </section>
    <section
      :class="{ hidden: !showMenu }"
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 mt-0 subtitle-white text-start">Equipment</h2>
      <ul class="ml-3">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li
          class="body-white my-10% sm:my-5% md:my-6 cursor-pointer"
          @click="handlePush('/admin/equipment')"
        >
          All equipment
        </li>
      </ul>
    </section>
    <section
      :class="{ hidden: !showMenu }"
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 mt-0 subtitle-white text-start">Case</h2>
      <ul class="ml-3">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li
          class="body-white my-10% sm:my-5% md:my-6 cursor-pointer"
          @click="handlePush('/admin/case')"
        >
          All cases
        </li>
        <li class="body-white my-10% sm:my-5% md:my-6">Ongoing cases</li>
        <li class="body-white my-10% sm:my-5% md:my-6">Closed cases</li>
      </ul>
    </section>
  </nav>

  <!-- header for the company flow -->
  <nav
    v-else-if="$route.path.includes(`company`)"
    :class="showMenu ? 'bg-red py-4 h-full' : 'bg-beige w-full py-1 h-auto'"
    class="absolute flex-col items-stretch justify-between z-1 w-85% px-4 text-subtitle text-beige md:text-title md:flex-col-reverse md:py-0 md:h-full md:bg-red md:w-15rem xl:w-17rem"
  >
    <div
      :class="showMenu ? 'mb-3' : 'flex-row-reverse my-1'"
      class="flex justify-between items-center ml-7 h-auto"
    >
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo in white"
        :class="{ hidden: !showMenu }"
        class="w-1/8 md:inline md:mx-auto md:mt-5 md:w-1/4 md:h-auto lg:w-1/3"
        width="90"
        height="90"
      />
      <img
        src="/redCross.svg"
        alt="Red Cross logo in white"
        :class="{ hidden: showMenu }"
        class="w-3rem md:hidden"
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
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 mt-0 subtitle-white text-start">Event</h2>
      <ul class="ml-3">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li class="body-white my-10% sm:my-5% md:my-6 cursor-pointer">
          All events
        </li>
        <li
          class="body-white my-10% sm:my-5% md:my-6 cursor-pointer"
          @click="handlePush('event/add')"
        >
          Create new event
        </li>
        <li class="body-white my-10% sm:my-5% md:my-6">Succesful events</li>
        <li class="body-white my-10% sm:my-5% md:my-6">Cancelled events</li>
      </ul>
    </section>
    <section
      :class="{ hidden: !showMenu }"
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 mt-0 subtitle-white text-start">Equipment</h2>
      <ul class="ml-3">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li
          class="body-white my-10% sm:my-5% md:my-6 cursor-pointer"
          @click="handlePush('/admin/equipment')"
        >
          All equipment
        </li>
      </ul>
    </section>
    <section
      :class="{ hidden: !showMenu }"
      class="h-auto md:flex md:flex-col md:h-auto md:items-stretch"
    >
      <h2 class="ml-3 mt-0 subtitle-white text-start">Case</h2>
      <ul class="ml-3">
        <div class="h-0.05rem bg-beige w-80% mt-1"></div>
        <li
          class="body-white my-10% sm:my-5% md:my-6 cursor-pointer"
          @click="handlePush('/admin/case')"
        >
          All cases
        </li>
      </ul>
    </section>
  </nav>

  <!-- header for the visitors flow -->
  <nav
    v-else-if="$route.path.includes(`flicker`)"
    class="nav-red h-4rem w-full fixed sm:h-full w-3rem sm:w-5rem bottom-0"
  >
    <div
      class="flex flex-row sm:flex-col items-center justify-evenly sm:justify-between h-full mb-2 sm:m-0 sm:p-0"
    >
      <button
        @click="$router.push('/')"
        class="i-material-symbols-other-houses icon icon-4 color-beige"
      ></button>
      <div class="bg-beige w-.5 h-full sm:hidden"></div>
      <img
        src="/whiteCross.svg"
        alt="Red Cross logo"
        class="sm:pb-3 h-3rem sm:h-5rem sm:w-90% sm:mx-auto"
      />
    </div>
  </nav>

  <nav
    v-else
    class="nav-red h-4rem w-full fixed sm:h-full w-3rem sm:w-5rem bottom-0"
  >
    <div
      class="flex flex-row sm:flex-col items-center justify-evenly sm:justify-between h-full mb-2 sm:m-0 sm:p-0"
    >
      <button
        @click="$router.go(-1)"
        class="i-material-symbols-arrow-back-rounded icon icon-5 color-beige"
      ></button>
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
import { useRouter } from 'vue-router'

const { push } = useRouter()

const showMenu = ref(false)

const handlePush = (path: string) => {
  push(path)
}
</script>
