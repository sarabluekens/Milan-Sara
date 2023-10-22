<template>
  <div class="ml-3.5rem md:ml-5rem bg-red h-100vh">
    <h1 class="title-beige">First aid</h1>
    <p class="subtitle-beige">What help do you need?</p>

    <section
      class="flex sm:h-60vh h-90vh sm:flex-row flex-col sm:justify-evenly"
    >
      <div
        class="p-4 bg-beige m-auto w-80% sm:w-40% h-full rounded-lg px-8 flex flex-col justify-around items-center"
      >
        <h2
          class="color-red font-inria text-2.2rem md:text-2.7rem lg:text-3.5rem px-4 text-center"
        >
          I can walk to a first aid post.
        </h2>
        <img
          src="/canWalk.svg"
          alt="Running shoes speeding off Icon"
          class="mt-16"
        />
      </div>
      <div
        class="p-4 bg-beige m-auto w-80% sm:w-40% h-full rounded-lg px-8 flex flex-col justify-around items-center"
      >
        <h2
          class="color-red font-inria text-2.2rem md:text-2.7rem lg:text-3.5rem px-4 text-center"
        >
          I can't walk, I need help.
        </h2>

        <img src="/cantWalk.svg" alt="Broken running shoes Icon" />
      </div>
    </section>
  </div>
</template>

<script lang="ts"></script>
