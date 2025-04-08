import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const theme = createTheme({
  typography: {
    fontFamily: '"Pretendard", "Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: '"Pretendard", sans-serif',
      fontWeight: 600,
    },
    button: {
      fontFamily: '"Pretendard", sans-serif',
      fontWeight: 500,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <App />
    </LocalizationProvider>
  </ThemeProvider>
);
