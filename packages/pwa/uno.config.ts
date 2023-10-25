import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss'
// import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetIcons({}),
    presetUno(),

    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        inter: 'Inter',
        inria: ['Inria Sans:300'],
      },
    }),
  ],
  theme: {
    colors: {
      white: '#FFFAFA',
      beige: '#F5E9E9',
      pink: '#E8C1C1',
      red: '#A60C0C',
      black: '#262C30',
    },
  },
  shortcuts: [
    // screen-sizes (tot...): sm: 640px, md:768px, lg:1024px, xl:1280px
    [
      /^title-(.*)$/,
      ([, c]) =>
        `font-inria text-${c} text-2.5rem md:text-4.4rem lg:text-5rem text-center`,
    ],
    [
      /^subtitle-(.*)$/,
      ([, c]) =>
        `font-inria text-${c} text-1.4rem md:text-2rem lg:text-2.2rem text-center`,
    ],
    [
      /^body-(.*)$/,
      ([, c]) =>
        `font-inter text-${c} text-1rem md:text-1.1rem lg:text-1.2rem `,
    ],
    [
      /^subbody-(.*)$/,
      ([, c]) =>
        `font-inter text-${c} text-0.8rem md:text-0.9rem lg:text-1rem `,
    ],
    [/^nav-(.*)$/, ([, c]) => `w-3.5rem md:w-5rem h-full absolute bg-${c}`],
  ],
})
