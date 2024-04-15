import { Box, Fab, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { ActionParamSet } from "./constants/interfaces";

export default function ActionParamElement({
  actionParamSet,
  setActionParamSets,
}: {
  actionParamSet: ActionParamSet;
  setActionParamSets: Function;
}) {
  const handleDeleteActionParamSetDelete = async (keyId: string) => {
    setActionParamSets((actionParamSets: ActionParamSet[]) => [
      ...actionParamSets.filter(
        (element: ActionParamSet) => element.keyId !== keyId
      ),
    ]);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
    >
      <Typography>{actionParamSet.action}</Typography>
      <Typography>{actionParamSet.param}</Typography>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          onClick={() => handleDeleteActionParamSetDelete(actionParamSet.keyId)}
        >
          <DeleteIcon />
        </Fab>
      </Box>
    </Box>
  );
}
