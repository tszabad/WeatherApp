import React from "react";

//v2 -
const Form = props => (
  <form onSubmit={props.getWeather}>
    <div className="col">
      <input
        className="form-control"
        type="text"
        name="city"
        placeholder="Enter a City..."
      />
    </div>
    <div className="col">
      <button className="btn btn-primary">Search</button>
    </div>
  </form>
);

export default Form;
