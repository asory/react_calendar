import React from "react";
import { isWeekend, isSameMonth,format,parse } from "date-fns";
import { TableCell } from "@material-ui/core";

const dayCell = ({ props }) => (
    <TableCell
       style={{...styles.cell, backgroundColor:  `${ isWeekend(props.day) ? "#f2f2f2":"#ffffff"}`
       }}
      key={props.day}
      onClick={() => this.onDateClick(parse(props.day))}
       
    >
      <span  style={{  fontWeight: "bold", color: `${
      !isSameMonth(props.day, props.monthStart)
        ? "#D5D5D5"
        : isWeekend(props.day)
        ? "#2F73B9"
        : "Black"
    }`}}> {`${format(props.day, "d")} ${props.weather}`}</span>

     {/*  if({props.events !== null})
      {props.events.map(e => {
        return (
          <ListItem>
            <Typography>
              `${props.event.startHour}-${props.event.startHour}`
            </Typography>
            <Typography>{props.event.title}</Typography>
          </ListItem>
        );
      })} */}
    </TableCell>
);

const styles = makeStyles({
  cell: {
    verticalAlign:"top",
    border: "1px solid black",
    maxWidth: "14.3%",
    width: "200px",
    height: "140px",
  },
  number: {
    fontWeight: "bold",
   
  }, 
  weather:{

  }
}); 
export default dayCell;
