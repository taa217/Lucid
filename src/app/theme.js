import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: { fontWeight: 600, fontSize: '3rem' },
    h2: { fontWeight: 500, fontSize: '2.5rem' },
    body1: { fontSize: '1.0rem', lineHeight: 1.4 },
  },
});

export default theme;
