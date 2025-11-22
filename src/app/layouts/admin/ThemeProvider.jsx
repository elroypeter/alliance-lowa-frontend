import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#048049', // Your primary green
    },
    secondary: {
      main: '#003d7f', // Your secondary blue
    },
    background: {
      default: '#f9fbfd', // Current admin background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    // Prevent MUI styles from affecting web pages
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderWidth: '1px',
            },
            '&.Mui-focused fieldset': {
              borderWidth: '1px',
            },
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '@global': {
          // Prevent Bootstrap from affecting MUI components in admin layout
          '.admin-layout': {
            '& .MuiTextField-root': {
              '& input, & textarea': {
                border: 'none !important',
                outline: 'none !important',
                boxShadow: 'none !important',
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: '1px solid rgba(0, 0, 0, 0.23) !important',
                borderWidth: '1px !important',
              },
              '&:hover fieldset': {
                border: '1px solid rgba(0, 0, 0, 0.87) !important',
                borderWidth: '1px !important',
              },
              '&.Mui-focused fieldset': {
                border: '2px solid #048049 !important',
                borderWidth: '2px !important',
              },
            },
            '& .MuiInputBase-input': {
              border: 'none !important',
              outline: 'none !important',
              boxShadow: 'none !important',
            },
          },
        },
      },
    },
  },
});

export default function AdminThemeProvider({ children }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

