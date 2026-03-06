import React, { Component } from "react";
import Weather from "./Weather";

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      search: ""
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const term = this.state.search.trim();
    if (!term) {
      return;
    }
    this.props.history.push(`/search/${term}`);
  };

  render() {
    return (
      <section className="home">
        <div className="container">
          <div className="hero-card">
            <div className="hero-copy">
              <p className="hero-eyebrow">Live weather, without the noise</p>
              <h1>Forecasts that feel clear and quick.</h1>
              <p className="hero-subtitle">
                Search any city to get a clean snapshot of current conditions
                and a six-day outlook.
              </p>
              <form className="search-form" onSubmit={this.onSubmit}>
                <div className="search-field">
                  <input
                    type="text"
                    name="search"
                    className="search-input"
                    placeholder="Find your location..."
                    value={this.state.search}
                    onChange={this.onChange}
                  />
                  <button type="submit" className="btn btn-primary">
                    Find
                  </button>
                </div>
                <div className="search-hint">
                  Try: London, Tokyo, San Francisco
                </div>
              </form>
            </div>
            <div className="hero-panel">
              <div className="hero-metric">
                <span className="hero-label">Source</span>
                <span className="hero-value">MetaWeather</span>
              </div>
              <div className="hero-metric">
                <span className="hero-label">Units</span>
                <span className="hero-value">Celsius</span>
              </div>
              <div className="hero-metric">
                <span className="hero-label">Updates</span>
                <span className="hero-value">On demand</span>
              </div>
            </div>
          </div>

          <div className="section-header">
            <h2>Featured Cities</h2>
            <p>Quick snapshots from places people check the most.</p>
          </div>
          <div className="weather-grid">
            <Weather id="2344116" />
            <Weather id="638242" />
            <Weather id="44418" />
            <Weather id="565346" />
            <Weather id="560743" />
            <Weather id="9807" />
          </div>
        </div>
      </section>
    );
  }
}
