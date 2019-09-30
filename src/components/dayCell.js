import React from "react";
import { isWeekend, isSameMonth, format, parse } from "date-fns";
import { TableCell, Typography, ListItem } from "@material-ui/core";

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
    /*     onClick={(props.onDateClick(parse(props.day, "d/mm/yyyy", "d" )))}
     */
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
      {`${format(props.day, "d")} ${props.weather}`}
    </span>

    {props.reminders !== null}{" "}
    {props.reminders.map(e => {
      return (
        <ListItem>
          <Typography>
            {e.start}-{e.end}`
          </Typography>
          <Typography>{e.title}</Typography>
        </ListItem>
      );
    })}
    <span>AVALAIBLE</span>
  </TableCell>
);

export default dayCell;
