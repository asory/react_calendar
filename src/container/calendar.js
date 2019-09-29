import React, { Component } from "react";
import {addMonths,subMonths,format} from 'date-fns';
import CalendarHeader from "../components/calendarHeader";
import { Container } from "@material-ui/core";



export default class calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth:  new Date(),
      selectedDate: new Date()
    };
  }


  onDateClick = day => {};

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };
  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  render() {
    return (
      <div>
        <CalendarHeader props={{ currentMonth:format(this.state.currentMonth, "Mo-yyyy"),
        nextMonth:this.nextMonth,prevMonth:this.prevMonth}} />
      </div>
    );
  }
}
