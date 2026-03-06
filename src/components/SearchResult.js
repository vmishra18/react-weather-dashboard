import React, { Component } from "react";
import axios from "axios";
import Weather from "./Weather";

export default class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      result: [],
      loading: true,
      error: ""
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

  componentDidMount() {
    this.fetchResults(this.props.match.params.keyword);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.keyword !== this.props.match.params.keyword) {
      this.fetchResults(this.props.match.params.keyword);
    }
  }

  fetchResults = keyword => {
    this.setState({ search: keyword, loading: true, error: "" });
    const url = `/weather/weather.php?command=search&keyword=${keyword}`;
    axios
      .get(url)
      .then(res => {
        this.setState({ result: res.data, loading: false });
      })
      .catch(() =>
        this.setState({
          loading: false,
          error: "We could not find that location right now."
        })
      );
  };

  render() {
    return (
      <section className="search">
        <div className="container">
          <div className="section-header">
            <h2>Search Results</h2>
            <p>Find a city and get the latest conditions.</p>
          </div>
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
          </form>

          {this.state.loading ? (
            <div className="forecast-loading">
              <div className="loading-bar" />
              <div className="loading-bar wide" />
              <div className="loading-bar" />
            </div>
          ) : this.state.error ? (
            <div className="forecast-error">
              <h3>Search unavailable</h3>
              <p>{this.state.error}</p>
            </div>
          ) : !this.state.result[0] ? (
            <div className="empty-state">
              <h3>No results found</h3>
              <p>Try changing the keyword or searching a nearby city.</p>
            </div>
          ) : (
            <div className="weather-grid single">
              <Weather id={this.state.result[0].woeid} />
            </div>
          )}
        </div>
      </section>
    );
  }
}
