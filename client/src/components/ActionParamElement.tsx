import { Box, Fab, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActionParamElement(props: any) {
  const { action, setActionParamSets } = props;

  const handleDeleteActionParamSetDelete = async (keyId: any) => {
    setActionParamSets((actionParamSets: any) => [
      ...actionParamSets.filter((element: any) => element.keyId !== keyId),
    ]);
  };

  console.log("action", action);

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
      <Typography>{action.action}</Typography>
      <Typography>{action.param}</Typography>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          onClick={() => handleDeleteActionParamSetDelete(action.keyId)}
        >
          <DeleteIcon />
        </Fab>
      </Box>
    </Box>
  );
}
