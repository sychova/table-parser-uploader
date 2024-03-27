import React, { ReactElement } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import Title from "./Title";

export default function UploadHistory(props: any): ReactElement {
  const { uploads } = props;

  return (
    <Grid
      item
      sm={12}
      md={7}
      lg={8}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        width: "100%",
        backgroundColor: { xs: "transparent", sm: "background.default" },
        alignItems: "start",
        pt: { xs: 2, sm: 4 },
        px: { xs: 2, sm: 10 },
        gap: { xs: 4, md: 8 },
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Title>Uploads History</Title>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Upload date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.map((upload: any) => {
                  console.log("upload", upload);
                  return (
                    <TableRow
                      key={upload.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {upload.id}
                      </TableCell>
                      <TableCell align="right">{upload.name}</TableCell>
                      <TableCell align="right">{upload.createdDate}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}
