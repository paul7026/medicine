import { createTheme } from '@mui/material'

import themeLocales from './themeLocales'

let theme = createTheme(
  {
    palette: {
      primary: {
        main: '#4DD0E1', // vibrant cyan
        dark: '#26C6DA', // active accent
      },
      secondary: {
        light: '#B2EBF2',
        '400': '#80DEEA',
        main: '#4DD0E1',
        '600': '#26C6DA',
        dark: '#004D56',
      },
      background: {
        default: '#F5F9FA', // <-- neutral soft gray-cyan (different from nav)
        paper: '#FFFFFF',
      },
      text: {
        primary: '#0F1214',
        secondary: '#3B474D',
      },
      divider: '#B2EBF2',
    },

    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            '&:hover': {
              textDecoration: 'underline',
              color: '#26C6DA',
            },
          },
        },
      },
    },
  },
  { ...themeLocales }
)

theme = createTheme(theme, {
  palette: {
    whiteColor: theme.palette.augmentColor({
      color: {
        main: '#FFFFFF',
      },
      name: 'whiteColor',
    }),

    blackColor: theme.palette.augmentColor({
      color: {
        main: '#0F1214',
      },
      name: 'blackColor',
    }),
  },
})

export default theme
