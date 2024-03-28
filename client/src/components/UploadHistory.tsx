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
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Import type</TableCell>
                  <TableCell align="right">Actions</TableCell>
                  <TableCell align="right">Upload date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploads.map((upload: any) => (
                  <TableRow
                    key={upload.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {upload.name}
                    </TableCell>
                    <TableCell align="right">{upload.importType}</TableCell>
                    <TableCell align="right">
                      {upload.actionParams
                        .map((elem: any) => {
                          return elem.action?.name;
                        })
                        .join(" | ")}
                    </TableCell>
                    <TableCell align="right">{upload.createdDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Grid>
  );
}
