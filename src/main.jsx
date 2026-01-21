import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { useTranslation } from "react-i18next";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./fonts.css";
import "./i18n";
import App from "./App.jsx";

const getTheme = (language) => {
  const isRTL = language === 'ar';
  const fontFamily = isRTL 
    ? '"Cairo", "Century Gothic", "Arial", "Helvetica", sans-serif'
    : '"Century Gothic", "Arial", "Helvetica", sans-serif';

  return createTheme({
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
    fontFamily: fontFamily,
    fontWeight: 700,
    h1: {
      fontFamily: fontFamily,
      fontWeight: 700,
      fontSize: "3.5rem",
      lineHeight: 1.2,
      
    },
    h2: {
      fontFamily: fontFamily,
      fontWeight: 600,
      fontSize: "2.5rem",
      lineHeight: 1.3,
      

    },
    h3: {
      fontFamily: fontFamily,
      fontWeight: 600,
      fontSize: "2rem",
      lineHeight: 1.4,
      

    },
    h4: {
      fontFamily: fontFamily,
      fontWeight: 500,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      

    },
    h5: {
      fontFamily: fontFamily,
      fontWeight: 500,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      

    },
    h6: {
      fontFamily: fontFamily,
      fontWeight: 500,
      fontSize: "1rem",
      lineHeight: 1.4,
      

    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
            

        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
            

        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          fontFamily: fontFamily,
            

        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,

          fontWeight: 500,
          
          fontFamily: fontFamily,
          padding: "10px 24px",
        },
      },
    },
    // Inputs use Hanno globally
    MuiInputBase: {
      styleOverrides: {
        root: {
          
          fontFamily: fontFamily,
        },
        input: {
          
          fontFamily: fontFamily,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          
          fontFamily: fontFamily,
        },
        input: {
          
          fontFamily: fontFamily,
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
        },
        input: {
          fontFamily: fontFamily,
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
          
        },
        input: {
          fontFamily: fontFamily,
          
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
          fontWeight:isRTL ? 700 : 600
          
            },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
          fontWeight:isRTL ? 700 : 600
          
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
          
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          fontFamily: fontFamily,
          
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: fontFamily,
          
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
          fontFamily: fontFamily,
          
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
};

const ThemeWrapper = () => {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(() => getTheme(i18n.language));

  useEffect(() => {
    setTheme(getTheme(i18n.language));
  }, [i18n.language]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeWrapper />
  </StrictMode>
);
