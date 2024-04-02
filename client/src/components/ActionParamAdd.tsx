import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Fab,
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import Title from "./Title";

export default function ActionsConfig({
  actionParamSets,
  setActionParamSets,
}: any) {
  const [action, setAction] = useState("");
  const [param, setParam] = useState("");

  const handleAddAction = () => {
    if (action && param) {
      setActionParamSets(() => [
        ...actionParamSets,
        {
          action,
          param,
        },
      ]);
    }
  };

  return (
    <>
      <Title>Add action</Title>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Action</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={action}
            label="Action"
            onChange={(e) => setAction(e.target.value)}
          >
            <MenuItem value={1}>Rotate around the X-axis</MenuItem>
            <MenuItem value={1}>Rotate around the Y-axis</MenuItem>
            <MenuItem value={1}>Rotate around the Z-axis</MenuItem>
            <MenuItem value={1}>Move along the X-axis</MenuItem>
            <MenuItem value={1}>Move along the Y-axis</MenuItem>
            <MenuItem value={1}>Move along the Z-axis</MenuItem>
            <MenuItem value={1}>Reflect over the X-axis</MenuItem>
            <MenuItem value={1}>Reflect over the Y-axis</MenuItem>
            <MenuItem value={1}>Reflect over the Z-axis</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Parameter"
            value={param}
            variant="outlined"
            onChange={(e) => setParam(e.target.value)}
          />
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            onClick={handleAddAction}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </>
  );
}
