import React, { Component } from "react";
import * as dateFns from "date-fns";
import CalendarHeader from "../components/calendarHeader";
import { Container, TableRow, TableBody } from "@material-ui/core";
import "./../App.css";
import DayCell from "../components/dayCell";
import ReminderForm from "../components/reminderForm";
const reminders = [
  {
    start: "2019-09-01 00:00:00",
    end: "2019-09-01 02:00:00",
    title: "New Year Party",
    city: "Santiago,Chile",
    text: "Call to every one",
    color: "#FF5722",
    weather: {}
  },
  {
    start: "2019-09-16 01:00:00",
    end: "2019-09-16 02:00:00",
    title: "New Year Wishes",
    city: " Santiago,Chile",
    text: "Call to every one",
    color: "#FFEB3B",
    weather: {}
  },
  {
    start: "2019-10-02 00:30:00",
    end: "2019-10-02 01:30:00",
    title: "Parag Birthday Party",
    city: " Barquisimeto,Venezuela ",
    text: "Call him",
    color: "#03A9F4",
    weather: {}
  },
  {
    start: "2019-10-02 01:30:00",
    end: "2019-10-02 02:20:00",
    title: "My Birthday Party",
    city: "Merida,Venezuela",
    text: " Bring your gifts ",
    color: "#F44336",
    weather: {}
  },
  {
    start: "2019-10-09 04:10:00",
    end: "2019-10-09 04:40:00",
    title: "Expo 2019",
    city: "Tokyo,Japan",
    text: " ANIME RULES ",
    color: "03A9F4",
    weather: {}
  }
];

export default class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      open: false,
      reminders:reminders
    };
  }
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
  

  todayReminders = day => {
    const reminders = this.state.reminders;
    let todayReminders = reminders.filter(rem =>
      dateFns.isSameDay(dateFns.parseISO(rem.start), dateFns.parseISO(day))
    );
  
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
              reminders: this.todayReminders(day).length,
              monthStart: monthStart
            }}
          />
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(<TableRow key={day}>{days}</TableRow>);
      days = [];
    }
    return rows;
  };

  render() {
    return (
      <Container style={{ width: "max-content" }}>
        <CalendarHeader
          props={{
            currentMonth: dateFns.format(this.state.currentMonth, "MMMM yyyy"),
            nextMonth: this.nextMonth,
            prevMonth: this.prevMonth
          }}
        />
        <Container style={{ width: "fit-content" }}>
          <TableBody style={{ flexGrow: 1 }}>{this.rendergrid()}</TableBody>
          <ReminderForm reminders={this.state.reminders } />

        </Container>
        
      </Container>
    );
  }
}
