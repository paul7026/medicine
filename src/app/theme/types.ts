declare module '@mui/material/styles' {
  interface Palette {
    whiteColor: Palette['primary']
    blackColor: Palette['primary']
  }

  interface PaletteOptions {
    whiteColor?: PaletteOptions['primary']
    blackColor?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    whiteColor: true
    blackColor: true
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    whiteColor: true
    blackColor: true
  }
}
