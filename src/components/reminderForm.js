import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import SwapVert from "@material-ui/icons/SwapVert";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import Search from "@material-ui/icons/Search";
import { format } from "date-fns";

const tableIcons = {
  Filter: () => <FilterList />,
  Search: () => <Search />,
  ResetSearch: () => <Clear />,
  SortArrow: () => <SwapVert />,
  Clear: () => <Clear />
};


export default class reminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders:{}
     
    };

  }
  componentDidMount() {
    this.setState({reminders: this.props.reminders});
  }

  getWeather = (city) => {
    let weather = "";
    const ApiKey = "469d1adb2769408051227ecab599bde7";
    const url = `api.openweathermap.org/data/2.5/weather?`;
    axios
      .get(url, {
        "q":city,
        "appid": ApiKey,
      })
      .then(response => {
        console.log("response",response)

        this.setState({
          reminders:  response.data.main.description,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
          error: true
        });
      });
    console.log( this.state.weather)
  };

  getflag = (country, style = "shiny", size = 24) => {
    // styles flat and shiny, sizez 64 48 32 24 16
    let flag;
    axios
      .get(`https://www.countryflags.io/${country}/${style}/${size}.png`, {         
      header: {
          "Access-Control-Allow-Origin": "*",
          crossorigin: true
        }
      })
      .then(response => {
        flag = response;
        console.log("flag", flag);
      })
      .catch(err => {
        console.log(err);
      });
    return flag;
  };

 
  render() {
    return (
      <MaterialTable
        icons={tableIcons}
        title={`${"    Reminders         "}`}
        columns={[
          { title: "Title", field: "title", sorting: false },
          { title: "Description", field: "text", sorting: false },
          {
            title: "Start",
            field: "start",
            type: "datetime",
            render: rowData => format(new Date(rowData.start), "dd MMMM HH:mm")
          },
          {
            title: "Ends",
            field: "end",
            type: "datetime",
            render: rowData => format(new Date(rowData.end), "dd MMMM HH:mm")
          },
          {
            title: "City",
            field: "city",
            render: rowData =>
              /*  ${this.getflag(rowData.city.split(",")[1])} */ `${
                rowData.city.split(",")[0]
              } `
          },
          {
            title: "Weather",
            field: "weather",
            sorting: false,

            render: rowData =>
              `${this.getWeather(rowData.city.split(",")[0])} ${rowData.weather.description} `
          },
          {
            title: "Color",
            field: "color",
            sorting: false,
            lookup: {
              "#03A9F4": "blue",
              "#FFEB3B": "yellow",
              "#F44336": "red",
              "#8BC34A": "green",
              "#FF7043": "orange",
              "#ffffff": "white"
            }
          }
        ]}
        editable={{
          onRowAdd: newData => {
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = this.state.reminders;
                data.push(newData);
                this.setState( {reminders: data} );
              }, 600);
            });
          },
           onRowUpdate: (
            newData,
            oldData
          ) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.reminders];
                data[data.indexOf(oldData)] = newData;
                this.setState({ reminders: data });
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.reminders];
                data.splice(data.indexOf(oldData), 1);
                this.setState({ reminders: data });
              }, 600);
            })
        }}
        data={this.state.reminders}
        options={{
          paging: false,
          draggable: false,
          search: false,
          rowStyle: rowData => ({
            backgroundColor: `${rowData.color}`,
            color: "#ffffff"
          }),
          headerStyle: {
            backgroundColor: '#2f74b5',
            color: '#FFF'
          }, 
          titleStyle: {
            alignContent: 'center',
            backgroundColor: '#2f74b5',
            color: '#FFF'

          }
        }}
     
      ></MaterialTable>
    );
  }
}
