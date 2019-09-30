import React, { Component } from "react";
import PropTypes from "prop-types";
import * as dateFns from "date-fns";
import { Container, TableCell } from "@material-ui/core";

export default class daysGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentMonth : this.props,
        selectedDate :this.props
    };
  }

  rendergrid = () => {
    const monthStart = dateFns.startOfMonth(this.props.currentMonth);
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
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, this.state.selectedDate)
                ? "selected"
                : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return rows
  };

  render() {
    return <TableCell >{this.rendergrid()}</TableCell>;
  }
}
