import React, { Component } from "react";
import MaterialTable from "material-table";
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
      reminders: []
    };
  }

  componentDidMount() {
    this.setState({ reminders: this.props.reminders });
    
  }

  render() {
    return (
      <MaterialTable
        icons={tableIcons}
        title={`${"    Reminders         "}`}
        data={this.state.reminders}
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
              `${rowData.city.split(",")[0]}`
            
          },
          {
            title: "Weather",
            field: "weather",
            sorting: false,
            render: rowData => (rowData.weather===undefined)? "unavalaible": `${rowData.weather.temp}º - ${rowData.weather.info}`
          },
          {
            title: "Color",
            field: "color",
            sorting: true,
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
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                const data = [...this.state.reminders];
               
                data.push(newData);
                this.setState({ reminders: data });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
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
        options={{
          paging: false,
          draggable: false,
          search: false,
          addRowPosition:"first",
          rowStyle: rowData => ({
            backgroundColor: `${rowData.color}`,
            color: "#ffffff"
          }),
          headerStyle: {
            backgroundColor: "#2f74b5",
            color: "#FFF"
          },
          titleStyle: {
            alignContent: "center",
            backgroundColor: "#2f74b5",
            color: "#FFF"
          }
        }}
      ></MaterialTable>
    );
  }
}
