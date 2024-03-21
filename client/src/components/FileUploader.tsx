import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const response = await fetch("http://localhost:5000/uploads", {
      method: "POST",
      headers: {
        "Content-Type": file!.type,
        "Content-Length": `${file!.size}`,
      },
      body: file,
    });
  };

  return (
    <Grid
      item
      xs={12}
      sm={5}
      lg={4}
      sx={{
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        backgroundColor: "background.paper",
        borderRight: { sm: "none", md: "1px solid" },
        borderColor: { sm: "none", md: "divider" },
        alignItems: "start",
        pt: 4,
        px: 10,
        gap: 4,
      }}
    >
      <Box
        component="form"
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Select a file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>

        {file && (
          <Card sx={{ display: "flex", margin: 2 }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h5" variant="h6">
                {file.name}
              </Typography>
              <Typography>{file.type}</Typography>
              <Typography>{file.size}</Typography>
            </CardContent>
          </Card>
        )}

        {file && (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            onClick={handleUpload}
          >
            Upload the file
          </Button>
        )}
      </Box>
    </Grid>
  );
}
