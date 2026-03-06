import React, { Component } from "react";
import axios from "axios";
import ConsolidatedWeather from "./ConsolidatedWeather";

export default class DetailedWeather extends Component {
  constructor() {
    super();

    this.state = {
      detailedweather: [],
      cityname: "",
      loading: true,
      error: ""
    };
  }

  componentDidMount() {
    this.fetchForecast(this.props.match.params.woeid);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.woeid !== this.props.match.params.woeid) {
      this.fetchForecast(this.props.match.params.woeid);
    }
  }

  fetchForecast = woeid => {
    this.setState({ loading: true, error: "" });
    const url = `weather/weather.php?command=location&woeid=${woeid}`;
    axios
      .get(url)
      .then(res => {
        this.setState({
          detailedweather: res.data.consolidated_weather,
          cityname: res.data.title,
          loading: false
        });
      })
      .catch(() =>
        this.setState({
          loading: false,
          error: "We could not load the forecast right now."
        })
      );
  }
  render() {
    return (
      <section className="forecast">
        <div className="container">
          <div className="section-header">
            <h2>6-Day Outlook</h2>
            <p>{this.state.cityname}</p>
          </div>
          {this.state.loading ? (
            <div className="forecast-loading">
              <div className="loading-bar" />
              <div className="loading-bar wide" />
              <div className="loading-bar" />
            </div>
          ) : this.state.error ? (
            <div className="forecast-error">
              <h3>Forecast unavailable</h3>
              <p>{this.state.error}</p>
            </div>
          ) : (
            <div className="forecast-grid">
              {this.state.detailedweather.map(day => (
                <ConsolidatedWeather
                  key={day.id || day.applicable_date}
                  temp={day.the_temp}
                  maxtemp={day.max_temp}
                  mintemp={day.min_temp}
                  date={day.applicable_date}
                  status={day.weather_state_name}
                  humidity={day.humidity}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}
