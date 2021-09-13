import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      // main: green.A200,
    },
    secondary: {
      main: '#912dff',
      dark: '#5a56d6',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'orange',
      // contrastText: '#222222'
    },
  },
  typography: {
    // htmlFontSize: 10,
    fontFamily: ['Press Start 2P', 'Raleway', 'HelveticaNeue', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    subtitle1: {
      fontSize: '1.5rem',
    },
    body1: {
      fontSize: '1.5rem',
    },
  },
});

export default theme;
