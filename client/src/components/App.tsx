import "../App.css";
import { createTheme, Grid, ThemeProvider } from "@mui/material";

import FileUploader from "./FileUploader";
import UploadHistory from "./UploadHistory";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
        <FileUploader />
        <UploadHistory />
      </Grid>
    </ThemeProvider>
  );
}
