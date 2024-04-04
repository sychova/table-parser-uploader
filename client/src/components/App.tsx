import "../App.css";
import { createTheme, Grid, ThemeProvider } from "@mui/material";
import { useState, useEffect } from "react";

import FileUploader from "./FileUploader";
import UploadHistory from "./UploadHistory";
import { UploadDb } from "./constants/interfaces";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [uploads, setUploads] = useState<UploadDb[]>([]);

  console.log("uploads", uploads);

  const handleGetUploads = async () => {
    try {
      const response = await fetch("http://localhost:5000/uploads", {
        method: "GET",
      });

      const data = await response.json();

      setUploads(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetUploads();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
        <FileUploader uploads={uploads} setUploads={setUploads} />
        <UploadHistory uploads={uploads} />
      </Grid>
    </ThemeProvider>
  );
}
