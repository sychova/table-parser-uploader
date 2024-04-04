import * as React from "react";
import Typography from "@mui/material/Typography";

import { TitleProps } from "./constants/interfaces";

export default function Title(props: TitleProps) {
  return (
    <Typography component="h2" variant="h6" color="primary">
      {props.children}
    </Typography>
  );
}
