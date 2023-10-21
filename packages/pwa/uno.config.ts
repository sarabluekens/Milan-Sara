import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        inter: 'Inter',
        inria: ['Inria Sans:400'],
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
        `font-inria text-${c} text-2rem md:text-2.8rem lg:text-3.5rem font-bold`,
    ],
    [
      /^subtitle-(.*)$/,
      ([, c]) => `font-inria text-${c} text-1.4rem md:text-2rem lg:text-2.7rem`,
    ],
    [
      /^body-(.*)$/,
      ([, c]) =>
        `font-inter text-${c} text-1rem md:text-1.1rem lg:text-1.3rem `,
    ],
    [
      /^subbody-(.*)$/,
      ([, c]) =>
        `font-inter text-${c} text-0.8rem md:text-0.9rem lg:text-1rem `,
    ],
  ],
})
