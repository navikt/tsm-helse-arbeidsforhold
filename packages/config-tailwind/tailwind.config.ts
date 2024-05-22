import { Config } from 'tailwindcss'
import naviktTailwindPreset from '@navikt/ds-tailwind'

export default {
    presets: [naviktTailwindPreset],
    theme: {
        extend: {},
    },
    plugins: [],
} satisfies Omit<Config, 'content'>
