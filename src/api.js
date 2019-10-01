import React, { Component } from 'react';

export default class api extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
    };
  }


 position = async () => {
  await navigator.geolocation.getCurrentPosition(
    position => this.setState({ 
      latitude: position.coords.latitude, 
      longitude: position.coords.longitude
    },  newState =>
    console.log(newState), 
    )
  )
}

getWeather = (city) => {
  const ApiKey = "469d1adb2769408051227ecab599bde7"
  const url = "https://api.openweathermap.org/data/2.5/weather"
  const axios = require('axios').default;
  let position = city || this.state
axios.get(url, {
  params: {
    id: position,
    appid:ApiKey
  }
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
})
.finally(function () {
  // always executed
}); 

  };

  getflag = (country, style = 'shiny', size = 24) => { // styles flat and shiny, sizez 64 48 32 24 16
    return `https://www.countryflags.io/${country}/${style}/${size}.png`; // https://countryflags.io/
    }
 
}