import { createTheme } from "@mui/material/styles";

// Light Theme
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Blue primary
    },
    secondary: {
      main: "#dc004e", // Pink secondary
    },
    background: {
      default: "#f4f6f8", // Light gray background
      paper: "#ffffff", // White for cards/tables
    },
    text: {
      primary: "#333333", // Darker text for readability
      secondary: "#555555",
    },
    action: {
      hover: "#f0f0f0",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#333333",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        },
      },
    },
  },
});

// Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Light blue primary
    },
    secondary: {
      main: "#f48fb1", // Pink secondary
    },
    background: {
      default: "#121212", // Dark gray background
      paper: "#1e1e1e", // Lighter dark for contrast
    },
    text: {
      primary: "#ffffff",
      secondary: "#bbbbbb",
    },
    action: {
      hover: "#333333",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          color: "#ffffff",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ffffff",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#333333",
          },
        },
      },
    },
  },
});
