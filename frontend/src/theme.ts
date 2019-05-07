import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#b73e45',
      light: '#cb676d',
      dark: '#9f353c',
      contrastText: '#fff',
    },
    secondary: {
      main: '#fafafa',
      light: '#343434',
      dark: '#0d0d0d',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'serif',
    title: {
      fontSize: 24,
      fontFamily: 'Roboto',
      fontWeight: 300,
    },
    subtitle1: {
      fontFamily: 'sans-serif',
    },
    headline: {
      fontFamily: 'sans-serif',
    },
    subheading: {
      fontSize: '1.1rem',
    },
  },
});
