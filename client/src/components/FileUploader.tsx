import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import ActionsConfig from "./ActionParamAdd";
import ActionConfig from "./ActionParamElement";
import Title from "./Title";

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

export default function FileUploader(props: any) {
  const { uploads, setUploads } = props;

  const [file, setFile] = useState<File | null>(null);
  const [extension, setExtension] = useState("");
  const [isAllowedExtension, setIsAllowedExtension] = useState(true);
  const [actionParamSets, setActionParamSets] = useState<
    { id: number; keyId: string; action: string; param: string }[]
  >([]);

  const handleUploadExtensionValidation = async (e: any) => {
    const ALLOWED_EXTENSIONS = [".csv", ".xlsx", ".xls"];
    const file = e.target.files[0];

    const extension = file!.name.slice(file!.name.lastIndexOf("."));
    setExtension(extension);

    setIsAllowedExtension(ALLOWED_EXTENSIONS.includes(extension));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && isAllowedExtension) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const formData: any = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5000/uploads", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    setUploads([...uploads, data]);
    setFile(null);
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
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Select file
              <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                  handleUploadExtensionValidation(e);
                  handleFileChange(e);
                }}
              />
            </Button>

            {file && (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                onClick={handleUpload}
                disabled={!isAllowedExtension}
              >
                Upload file
              </Button>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          {file && isAllowedExtension && (
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

          {!isAllowedExtension && (
            <Alert sx={{ display: "flex", margin: 2 }} severity="error">
              Wrong file extension.
              <br />
              Supported extensions: .csv, .xlsx, .xls
            </Alert>
          )}
        </Grid>
        <Grid item xs={12}>
          {file && extension === ".csv" && (
            <>
              {actionParamSets.length > 0 && (
                <>
                  <Title>Selected actions</Title>
                  {actionParamSets.map((action, index, arr) => (
                    <ActionConfig
                      key={action.keyId}
                      action={action}
                      actionParamSets={actionParamSets}
                      setActionParamSets={setActionParamSets}
                    />
                  ))}
                </>
              )}

              <ActionsConfig
                actionParamSets={actionParamSets}
                setActionParamSets={setActionParamSets}
              />
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
