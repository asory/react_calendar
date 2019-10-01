import React, { Component } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import SwapVert from "@material-ui/icons/SwapVert";
import Clear from "@material-ui/icons/Clear";
import FilterList from "@material-ui/icons/FilterList";
import Search from "@material-ui/icons/Search";
import { format } from "date-fns";
import { parseISO, lightFormat } from "date-fns/esm";

const tableIcons = {
  Filter: () => <FilterList />,
  Search: () => <Search />,
  ResetSearch: () => <Clear />,
  SortArrow: () => <SwapVert />,
  Clear: () => <Clear />
};

const reminders = [
  {
    start: "2019-09-01 00:00:00",
    end: "2019-09-01 02:00:00",
    title: "New Year Party",
    city: "Santiago,Chile",
    text: "Call to every one",
    color: "Orange",
    weather: {}
  },
  {
    start: "2019-09-16 01:00:00",
    end: "2019-09-16 02:00:00",
    title: "New Year Wishes",
    city: " Santiago,Chile",
    text: "Call to every one",
    color: "Blue",
    weather: {}
  },
  {
    start: "2019-10-02 00:30:00",
    end: "2019-10-02 01:30:00",
    title: "Parag Birthday Party",
    city: " Barquisimeto,Venezuela ",
    text: "Call him",
    color: "Yellow",
    weather: {}
  },
  {
    start: "2019-10-02 01:30:00",
    end: "2019-10-02 02:20:00",
    title: "My Birthday Party",
    city: "Merida,Venezuela",
    text: " Bring your gifts ",
    color: "red",
    weather: {}
  },
  {
    start: "2019-10-09 04:10:00",
    end: "2019-10-09 04:40:00",
    title: "Expo 2019",
    city: "Tokyo,Japan",
    text: " ANIME RULES ",
    color: "Yellow",
    weather: {}
  }
];

export default class reminderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminders: reminders,
      isLoading: true,
      error: false,
      weather: {}
    };
  }

  loadData = () => {
    const ApiKey = "469d1adb2769408051227ecab599bde7";
    const url = "api.openweathermap.org/data/2.5/forecast?";
    axios
      .get(url, {
        units: "metric",
        APPID: ApiKey
      })
      .then(response => {
        this.setState({
          weather: response.data.main,
          isLoading: false
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false,
          error: true
        });
      });
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

  componentDidMount() {
    /*     this.loadData();
     */
  }

  render() {
    return (
      <MaterialTable
        icons={tableIcons}
        title={`${"    Reminders         "}`}
        columns={[
          { title: "Title", field: "title", sorting: false },
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
              ` ${this.getflag(rowData.city.split(",")[1])} ${
                rowData.city.split(",")[0]
              } `
          },
          {
            title: "Weather",
            field: "weather",
            sorting: false,

            render: rowData => `${rowData.weather.main} ${rowData.weather.description} `
          },
          { title: "Description", field: "text", sorting: false },
          {
            title: "Color",
            field: "color",
            sorting: false,
            lookup: {
              blue: "Blue",
              yellow: "Yellow",
              red: "Red",
              green: "Green",
              orange: "Orange"
            }
          }
        ]}
        editable={{
         /*  onRowAdd: newData => {
            console.log("STAS", newData);
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = this.state.reminders;
                data.push(newData);
                this.setState( {reminders: data} );
              }, 600);
            });
          },
          */ onRowUpdate: (newData, oldData) =>
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
          search: false
          /*           selection: true
           */
        }}
        /* actions={[
          { 
            rowStyle: rowData => ({
              backgroundColor: rowData.color
            }),
            tooltip: 'Remove All Selected Users',
            icon: 'delete',
            onClick: ({ editable }, data) => alert('You want to delete ' + data.length + ' rows')
          }
        ]} */
      ></MaterialTable>
    );
  }
}
