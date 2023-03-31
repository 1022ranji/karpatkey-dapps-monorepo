import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 620,
      md: 900,
      lg: 1200,
      xl: 1536
    }
  },
  typography: {
    fontFamily: "'IBM Plex Mono', sans-serif",
    h1: {
      fontFamily: "'IBM Plex Mono', sans-serif",
      fontSize: '60px',
      lineHeight: '70px',
      fontWeight: '400',
      color: 'rgba(51, 51, 51, 1)'
    },
    h2: {
      fontFamily: "'IBM Plex Mono', sans-serif",
      fontSize: '48px',
      lineHeight: '42px',
      fontWeight: '400',
      color: 'rgba(51, 51, 51, 1)'
    },
    h3: {
      fontFamily: 'IBM Plex Sans',
      lineHeight: '1.3',
      letterSpacing: '3.2px',
      fontWeight: '300'
    },
    h4: {
      fontFamily: "'IBM Plex Mono', sans-serif"
    },
    body1: {
      fontFamily: "'IBM Plex Mono', sans-serif",
      fontSize: '18px',
      lineHeight: '23px',
      fontWeight: '400'
    },
    body2: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      lineHeight: '1.1'
    },
    subtitle1: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      lineHeight: '2',
      letterSpacing: '10%',
      fontWeight: '400'
    },
    subtitle2: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      lineHeight: '2',
      letterSpacing: '10%',
      fontWeight: '400'
    },
    button: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      lineHeight: '2',
      fontWeight: '600'
    }
  },
  palette: {
    background: {
      default: '#eeeded',
      paper: '#eeeded'
    },
    primary: {
      main: '#232323'
    },
    secondary: {
      main: '#6B6B6B'
    },
    error: {
      main: '#DF5C64'
    },
    warning: {
      main: '#F0B065'
    },
    info: {
      main: '#2196f3'
    },
    success: {
      main: '#54B9A1'
    },
    common: {
      black: '#232323',
      white: '#eeeded'
    }
  }
})

export const midGrey = '#bdbdbd'
export const lightGrey = '#d9d9d9'
export const darkGrey = '#6B6B6B'

export const fontFamily = {
  primary: " 'IBM Plex Mono', monospace",
  secondary: "'IBM Plex Sans', sans-serif",
  tertiary: "'IBM Plex Serif', serif",
  quaternary: "'Roboto', sans-serif"
}

export default theme
