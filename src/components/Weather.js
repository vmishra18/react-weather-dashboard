import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getWeatherIcon } from "../utils/weatherIcons";

export default class Weather extends Component {
  constructor() {
    super();

    this.state = {
      cityname: "",
      id: "",
      temp: "",
      maxtemp: "",
      mintemp: "",
      logo: "",
      status: "",
      humidity: "",
      loading: true,
      error: ""
    };
  }

  componentDidMount() {
    this.loadWeather(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.loadWeather(this.props.id);
    }
  }

  loadWeather = id => {
    this.setState({ id, loading: true, error: "" });
    const url = `/weather/weather.php?command=location&woeid=${id}`;
    axios
      .get(url)
      .then(res => {
        const current = res.data.consolidated_weather[0];
        this.setState({
          cityname: res.data.title,
          status: current.weather_state_name,
          temp: Math.round(current.the_temp),
          maxtemp: Math.round(current.max_temp),
          mintemp: Math.round(current.min_temp),
          humidity: current.humidity,
          logo: getWeatherIcon(current.weather_state_name),
          loading: false
        });
      })
      .catch(() =>
        this.setState({
          loading: false,
          error: "Unable to load this city right now."
        })
      );
  }

  render() {
    const newTo = {
      pathname: `/weather/${this.state.id}`
    };
    return (
      <div
        className={`weather-card ${
          this.state.loading ? "is-loading" : ""
        }`}
      >
        {this.state.loading ? (
          <div className="weather-card__loading">
            <div className="loading-bar" />
            <div className="loading-bar wide" />
            <div className="loading-bar" />
          </div>
        ) : this.state.error ? (
          <div className="weather-card__error">
            <h3>Weather unavailable</h3>
            <p>{this.state.error}</p>
          </div>
        ) : (
          <>
            <div className="weather-card__top">
              <div>
                <h3>{this.state.cityname}</h3>
                <span className="status-pill">{this.state.status}</span>
              </div>
              <img src={this.state.logo} alt={this.state.status} />
            </div>
            <div className="weather-card__temps">
              <div>
                <span className="label">Now</span>
                <strong>{this.state.temp}°C</strong>
              </div>
              <div>
                <span className="label">High</span>
                <strong>{this.state.maxtemp}°C</strong>
              </div>
              <div>
                <span className="label">Low</span>
                <strong>{this.state.mintemp}°C</strong>
              </div>
            </div>
            <div className="weather-card__meta">
              <span>Humidity</span>
              <span>{this.state.humidity}%</span>
            </div>
            <Link to={newTo} className="btn btn-success btn-block">
              View Details
            </Link>
          </>
        )}
      </div>
    );
  }
}
