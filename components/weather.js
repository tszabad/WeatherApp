import React from "react";

const SWeather = props => {
  return (
    <div className="container text-center">
      <h3> {props.city}</h3>
      <h5> {props.description}</h5>
      <img src={"http://openweathermap.org/img/w/" + props.ikon + ".png"} />
      <h1>
        {Math.round(props.temperature - 273.15)} <span>&#8451;</span>
      </h1>
      <p>Humidity: {props.humidity} %</p>
      <p>Pressure: {props.pressure} Pa</p>
    </div>
  );
};

export default SWeather;
