import { red } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "'IBM Plex Sans', sans-serif",
    h1: {
      fontFamily: "'IBM Plex Mono', sans-serif",
      fontSize: '60px',
      lineHeight: '2.5',
      letterSpacing: '4.8px',
      fontWeight: '400'
    },
    h2: {
      fontFamily: "'IBM Plex Mono', sans-serif",
      lineHeight: '2',
      letterSpacing: '3.6px',
      fontWeight: '400'
    },
    h3: {
      fontFamily: "'IBM Plex Mono', sans-serif",
      lineHeight: '1.3',
      letterSpacing: '3.2px',
      fontWeight: '300'
    },
    h4: {
      fontFamily: "'IBM Plex Mono', sans-serif"
    },
    body1: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      lineHeight: '1.2'
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
      default: '#eeeded'
    },
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    error: {
      main: red.A400
    }
  }
})

export default theme
