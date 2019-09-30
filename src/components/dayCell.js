import React from "react";
import Typography from "@material-ui/core/Typography";

const dayCell = ({ props }) => (
  <div>
     <Typography>{props.day}</Typography>
     <Typography>{props.weather}</Typography>
    
  </div>
);

export default dayCell;
