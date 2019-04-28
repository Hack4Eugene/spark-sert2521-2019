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
      main: '#171717',
      light: '#343434',
      dark: '#0d0d0d',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: 'Rubik',
    title: {
      fontFamily: 'EB Garamond',
      fontSize: 24,
    },
  },
});
