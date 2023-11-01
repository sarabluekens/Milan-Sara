<template>
  <div class="ml-3.5rem md:ml-5rem bg-beige h-100vh">
    <h1 class="title-black">New event</h1>
    <section class="grid grid-cols-5 mx-auto w-1/2">
      <label class="body-black col-span-1">Event name</label>
      <input
        type="text"
        placeholder="Event name"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">Address</label>
      <input
        type="text"
        placeholder="Address"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">PostalCode</label>
      <input
        type="text"
        placeholder="PostalCode"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">City</label>
      <input
        type="text"
        placeholder="City"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">Dates</label>
      <input
        type="date"
        placeholder="Dates"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">Start time</label>
      <input
        type="time"
        placeholder="Start time"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">End time</label>
      <input
        type="time"
        placeholder="End time"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">Contactperson</label>
      <input
        type="text"
        placeholder="Contactperson"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">Email</label>
      <input
        type="email"
        placeholder="Email"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">Phone number</label>
      <input
        type="tel"
        placeholder="Phone number"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1">Btw number</label>
      <input
        type="text"
        placeholder="Btw number"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <label class="body-black col-span-1"
        >Expected visitor / staff count</label
      >
      <input
        type="number"
        placeholder="Expected visitor / staff count"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
      <div class="flex flex-row col-span-5 text-center">
        <label class="body-black col-span-1">Children</label>
        <input
          type="radio"
          placeholder="Children"
          class="border-1 border-black bg-white col-span-2"
        />Yes
        <input
          type="radio"
          placeholder="Children"
          class="border-1 border-black bg-white col-span-2"
        />No
      </div>
      <label class="body-black col-span-1">Maps</label>
      <input
        type="file"
        placeholder="Maps"
        class="border-1 border-black w-2/3 h-10 ml-3 bg-white col-span-4"
      />
    </section>
  </div>
</template>
