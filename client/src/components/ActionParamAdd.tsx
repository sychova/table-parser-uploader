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
import { ActionParamSet, ActionDb } from "./constants/interfaces";

export default function ActionsConfig({
  actionParamSets,
  setActionParamSets,
}: {
  actionParamSets: ActionParamSet[];
  setActionParamSets: Function;
}) {
  const [actionsDb, setActionsDb] = useState<ActionDb[]>([]);
  const [action, setAction] = useState<number | "">("");
  const [param, setParam] = useState<number>();

  const handleGetAllActions = async () => {
    try {
      const response = await fetch("http://localhost:5000/actions", {
        method: "GET",
      });

      const data = await response.json();

      setActionsDb(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAction = () => {
    if (action && param) {
      setActionParamSets(() => [
        ...actionParamSets,
        {
          id: action,
          keyId: crypto.randomUUID(),
          action: actionsDb
            .filter((elem) => elem.id === action)
            .map((elem) => elem.name)[0],
          param: param,
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
            onChange={(e) => setAction(Number(e.target.value))}
          >
            <MenuItem value="">None</MenuItem>
            {actionsDb.map((actionItem) => (
              <MenuItem key={actionItem.id} value={actionItem.id}>
                {actionItem.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Parameter"
            value={param || ""}
            variant="outlined"
            onChange={(e) => setParam(Number(e.target.value))}
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
