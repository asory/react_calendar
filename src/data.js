import axios from "axios";

const API_KEY = "469d1adb2769408051227ecab599bde7";
  
function data(city) {
  let c = `${city.split(",")[0]}`;
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/find?q=${c}&units=metric&appid=${API_KEY}`
    )
    .then(response => {
      let weather = {
        info: response.data.list[0],
        temp: response.data.list[0].main.temp,
        clouds: response.data.list[0].weather[0].description
      };
      console.log("weather", weather);

      return weather;
    })
    .catch(error => {
      console.log("Error", error);
    });
}
export default data;
