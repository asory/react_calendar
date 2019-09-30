import React, { Component } from "react";
import * as dateFns from "date-fns";
import CalendarHeader from "../components/calendarHeader";
import { Container,  TableRow } from "@material-ui/core";
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
      reminders: [{
        start: '2019-09-30 01:30:00',
        end: '2019-09-30 02:20:00',
        title: 'My Birthday Party',
        city: 'Lets Enjoy',
        color: "Yellow"}]
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
    this.setState({ open: false, selectedValue: value });
  };

  todayReminders = day => {
     const reminders = this.state.reminders;
     console.log("start", reminders.startDate)
     console.log("day", day)

    let todayReminders = reminders.filter((rem) =>
      dateFns
        .isSameDay(rem.startDate, day)
    ).sort((a, b) => b.startDate - a.startDate);
    console.log("adasdasdas", todayReminders)
    return todayReminders;
  };
  rendergrid = () => {
    const { currentMonth } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        days.push(
          <DayCell
            props={{
              onDateClick: this.onDateClick,
              day: day,
              weather: "SOLEADO",
              reminders: this.todayReminders(day),
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
