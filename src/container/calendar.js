import React, { Component, useState } from "react";
import * as dateFns from "date-fns";
import CalendarHeader from "../components/calendarHeader";
import { Container, Typography, TableCell, TableRow } from "@material-ui/core";
import "./../App.css";
import DayModal from "../components/dayModal";
import DayCell from "../components/dayCell";

export default class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      open: false,
      selectedValue: "",
      reminders: {}
    };
  }

  onDateClick = day => {
    this.handleClickOpen();
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  };
  prevMonth = () => {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  };

  getWeather = () => {};

  addReminder = () => {};

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ open: false, selectedDate: value });
  };

  rendergrid = () => {
    const { currentMonth } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <DayCell
            props={{
              onClick: this.onDateClick(
                dateFns.parse(cloneDay, "d/mm/yyyy", dateFormat)
              ),
              day: day,
              weather: "SOLEADO",
              events: null,
              monthStart: monthStart
            }}
          />
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <TableRow style={{ flexGrow: 1 }} key={day}>
          {days}
        </TableRow>
      );
      days = [];
    }
    return rows;
  };

  render() {
    return (
      <Container>
        <CalendarHeader
          props={{
            currentMonth: dateFns.format(this.state.currentMonth, "MMMM yyyy"),
            nextMonth: this.nextMonth,
            prevMonth: this.prevMonth
          }}
        />
        <Container>{this.rendergrid()}</Container>

        <DayModal
          selectedValue={this.state.selectedDate}
          open={this.state.open}
          onClose={this.handleClose}
        />
      </Container>
    );
  }
}
