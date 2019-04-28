import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#171717',
      light: '#343434',
      dark: '#0d0d0d',
      contrastText: '#fff',
    },
    secondary: {
      main: '#b73e45',
      light: '#cb676d',
      dark: '#8b2f34',
      contrastText: '#fff',
    },
  },
});
