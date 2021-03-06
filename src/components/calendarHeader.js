import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Before from "@material-ui/icons/NavigateBefore";
import Next from "@material-ui/icons/NavigateNext";
import IconButton from "@material-ui/core/IconButton";
import { Divider, Container, Table } from "@material-ui/core";

const calendarHeader = ({ props }) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const dayHeader = weekdays.map(day => {
    return (
      <th
        key={day}
        style={{ color: "#ffffff", maxWidth: "14.3%", width: "200px" }}
      >
        {day}
      </th>
    );
  });


  return (
    <Container style={{ width: "fit-content" }}>
      <AppBar position="static" style={{ backgroundColor: "#2f74b5" }}>
        <Toolbar style={{ alignItems: "center", justifyContent: "center" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={props.prevMonth}
          >
            <Before />
          </IconButton>

          <Typography variant="h2" color="initial">
            {props.currentMonth}
          </Typography>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={props.nextMonth}
          >
            <Next />
          </IconButton>
          <Divider />
       
        </Toolbar>
      </AppBar>
      <Table style={{ backgroundColor: "#2F73B9", flexGrow: 1 }}>
        <thead>
          <tr>{dayHeader}</tr>
        </thead>
      </Table>
    </Container>
  );
};

export default calendarHeader;
