import React, { useEffect, useState } from "react";
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
  const [actions, setActions] = useState<any[]>([]);
  const [action, setAction] = useState("");
  const [param, setParam] = useState("");

  const handleGetAllActions = async () => {
    try {
      const response = await fetch("http://localhost:5000/actions", {
        method: "GET",
      });

      const data = await response.json();

      setActions(data);
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    handleGetAllActions();
  }, []);

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
            {actions.map((actionItem) => (
              <MenuItem value={actionItem.name}>{actionItem.name}</MenuItem>
            ))}
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
