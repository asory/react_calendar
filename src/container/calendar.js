import React, { Component } from "react";
import { addMonths, subMonths, format, endOfWeek } from "date-fns";
import * as dateFns from "date-fns";
import CalendarHeader from "../components/calendarHeader";
import { Container, Divider, TableCell, TableRow } from "@material-ui/core";
import DaysGrid from "../components/daysGrid";
import "./../App.css";

export default class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date()
    };
  }

  onDateClick = day => {
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

  /*  renderCell = () => {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);
  };
 */
  rendergrid = () => {
    const { currentMonth, selectedDate } = this.state;
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
          <TableCell style={{border: '1px solid black', maxWidth: "14.3%", width: "200px" , height:"100px"}}
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
           /*  onClick={() => this.onDateClick(dateFns.parse(cloneDay))} */
           >
             <span className="number">{formattedDate}</span>
{/*              <span className="bg">{formattedDate}</span>
 */}       </TableCell>
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
    return rows
  };

  render() {
    return (
      <Container>
        <CalendarHeader
          props={{
            currentMonth: format(this.state.currentMonth, "MMMM"),
            nextMonth: this.nextMonth,
            prevMonth: this.prevMonth
          }}
        />
           <Container>{this.rendergrid()}    </Container> 
       {/*  <DaysGrid
          props={{
            currentMonth: format(this.state.currentMonth, "MMMM"),
            selectedDate: this.state.selectedDate
          }} 
        />*/}
      </Container>
    );
  }
}
