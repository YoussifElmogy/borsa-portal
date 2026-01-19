import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./fonts.css";
import App from "./App.jsx";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",
      light: "#000",
      dark: "#0d1f26",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#82b6b8",
      light: "#b3d4d6",
      dark: "#5a8082",
      contrastText: "#000000",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1e1b1b",
      secondary: "#000",
    },
  },
  typography: {
    fontFamily: '"Century Gothic", "Arial", "Helvetica", sans-serif',
    fontWeight: 700,
    h1: {
      fontFamily:
        '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.2,
      
    },
    h2: {
      fontFamily:
        '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: "2.5rem",
      lineHeight: 1.3,
      

    },
    h3: {
      fontFamily:
        '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.4,
      

    },
    h4: {
      fontFamily:
        '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      

    },
    h5: {
      fontFamily:
        '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      

    },
    h6: {
      fontFamily:
        '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.4,
      

    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
            

        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
            

        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
            

        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,

          fontWeight: 500,
          
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          padding: "10px 24px",
        },
      },
    },
    // Inputs use Hanno globally
    MuiInputBase: {
      styleOverrides: {
        root: {
          
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        input: {
          
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        input: {
          
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        input: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
        },
        input: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
            },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
              },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          '& .MuiInputBase-input': {
            fontFamily:
              '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
          },
        },
        option: {
          fontFamily:
            '"Hanno Mid-Century Modern", "Roboto", "Helvetica", "Arial", sans-serif',
          
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(26, 55, 65, 0.1)",
          
        }
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
