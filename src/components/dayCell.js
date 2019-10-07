import React from "react";
import { isWeekend, isSameMonth, format } from "date-fns";
import { TableCell } from "@material-ui/core";

const dayCell = ({ props }) => (
  <TableCell
    style={{
      verticalAlign: "top",
      border: "1px solid black",
      maxWidth: "14.3%",
      width: "200px",
      height: "140px",
      backgroundColor: `${isWeekend(props.day) ? "#f2f2f2" : "#ffffff"}`
    }}
    key={props.day}
    onClick={props.onDateClick}
  >
    <span
      style={{
        fontWeight: "bold",
        color: `${
          !isSameMonth(props.day, props.monthStart)
            ? "#D5D5D5"
            : isWeekend(props.day)
            ? "#2F73B9"
            : "Black"
        }`
      }}
    >
      {" "}
      {`${format(props.day, "d")} `}
    </span>
    <h4 style={{ alignSelf: "flexEnd", color: "blue" }}>
      {" "}
      {props.reminders > 0 ? props.reminders : " "}
    </h4>
  </TableCell>
);

export default dayCell;
