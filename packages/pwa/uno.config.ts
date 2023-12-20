import { defineConfig, presetUno, presetIcons, presetWebFonts } from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'

export default defineConfig({
  presets: [
    presetIcons({}),
    presetUno(),
    presetScrollbar({}),

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
        `font-inria text-${c} text-2.5rem md:text-4.4rem lg:text-5rem text-center -mb-1rem`,
    ],
    [
      /^subtitle-(.*)$/,
      ([, c]) =>
        `font-inria text-${c} text-1.4rem sm:text-1.8rem md:text-2rem lg:text-2.3rem text-center`,
    ],
    [
      /^label-(.*)$/,
      ([, c]) =>
        `font-inter text-${c} font-light text-1.2rem md:text-1.6rem lg:text-1.8rem `,
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
    [
      /^largeInput-(.*)$/,
      ([, c]) =>
        `border-2 border-${c} rounded-lg w-2/3 h-10rem ml-3 bg-${c}/30 col-span-4 placeholder:text-${c} p-[.5rem] subbody-${c} focus:outline-none focus:border-red/50 focus:ring-red/50 `,
    ],
    [/^nav-(.*)$/, ([, c]) => `w-3.5rem md:w-5rem h-full absolute bg-${c}`],
    [/^icon-(.*)$/, ([, c]) => `text-${c}rem leading-4 `],
  ],
  rules: [
    [
      'icon',
      {
        'vertical-align': '-0.125em',
        'text-align': 'center',
      },
    ],
  ],
})
