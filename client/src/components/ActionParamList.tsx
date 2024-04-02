import { Box, Fab, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActionConfig(props: any) {
  const { action, param } = props;

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
      <Typography>{action}</Typography>
      <Typography>{param}</Typography>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab size="small" color="secondary" aria-label="add">
          <DeleteIcon />
        </Fab>
      </Box>
    </Box>
  );
}
