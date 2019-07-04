import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SWeather from "../components/weather";
import Titles from "../components/titles";
import Form from "../components/form";

import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      city: "",
      long: "",
      lat: "",
      inputCity: "",
      description: undefined,
      error: undefined,
      icon: "",
      weather: {}
    };
  }

  getCurrentWeather = () => {
    let _this = this;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(p => {
        var lat = p.coords.latitude;
        var long = p.coords.longitude;
        console.log(lat);

        fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            long +
            "&appid=2bf63b97329b9fab7d24bf66e160db11"
        )
          .then(response => {
            return response.json();
          })
          .then(json => {
            _this.setState({
              city: json.name,
              weather: json.main,
              description: json.weather[0].description,
              icon: json.weather[0].icon
            });
          })
          .catch(error => console.error(error));
      });
    } else {
      alert("Please enter your city");
    }
  };

  componentDidMount() {
    this.getCurrentWeather();
    this.getWeather();
  }
  getWeather = async e => {
    e.preventDefault();
    if (e.target.elements.city.value.length > 0) {
      var city = e.target.elements.city.value;
    } else {
      var city = this.state.city;
    }

    let _this = this;
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=2bf63b97329b9fab7d24bf66e160db11"
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        _this.setState({
          city: json.name,
          weather: json.main,
          description: json.weather[0].description,
          icon: json.weather[0].icon
        });
      })
      .catch(error => console.error(error));
  };

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="main container">
            <div className=" row text-center">
              <div className="col">
                <div className="col-xs-5 title-container">
                  <Titles />

                  <div className="col-xs-7 form-container">
                    <SWeather
                      temperature={this.state.weather.temp}
                      city={this.state.city}
                      country={this.props.country}
                      pressure={this.state.weather.pressure}
                      humidity={this.state.weather.humidity}
                      description={this.state.description}
                      error={this.state.error}
                      ikon={this.state.icon}
                    />

                    <Form getWeather={this.getWeather} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
