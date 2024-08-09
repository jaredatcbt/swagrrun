import { createTheme } from "@mui/material/styles";

const DarkTheme = createTheme({
  typography: {
    fontSize: 16,
    fontFamily: `"MuseoModerno","Roboto","Arial"`,
  },
  breakpoints: {
    values: {
      xs: 0,
      xsm: 420,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      awMd: 768,
      aw500: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        --onboard-white: black `,
    },
    // Name of the component
    MuiIconButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          "&:hover": {
            color: "#F22",
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          background: "transparent",
          padding: "10px",
          boxShadow: "0px 0px 4px 3px rgba(215,215,215,0.75) inset",
          borderRadius: "40px",
          marginTop: "1rem",
          "&:first-of-type": {
            borderRadius: "40px",
          },
          "&:last-of-type": {
            borderRadius: "40px",
          },
        },
      },
    },

    MuiTypography: {
      defaultProps: {
        fontFamily: `"MuseoModerno","Roboto","Arial"`,
      },
    },
  },

  palette: {
    mode: "dark",
    highlight: {
      main: "#E60E61",
      dark: "#A10000",
    },
    white: {
      main: "#FFFFFF",
      dark: "#AAAAAA"
    },
    background: {
      default: "#031021",
    },
    text: {
      primary: "#FFF",
    },
  },
});

export default DarkTheme;
