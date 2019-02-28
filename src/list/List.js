import React from "react";
import { handleResponse } from "../helpers";
import Loading from "../Common/loading";
import { API_URL } from "../config";

import "./List.css";
import "../Common/grid.css";

class List extends React.Component {
  static propTypes = {};

  constructor() {
    super();

    this.state = {
      loading: false,
      results: [],
      genres: [],
      error: "error",
      filterValue: 3
    };

    this.filterList = this.filterList.bind(this);
  }

  componentDidMount() {
    const apyKey = "daeec18d2a4ac71a7f207c6e07ca1a47";
    this.setState({
      loading: true
    });

    // fetching data from API
    fetch(`${API_URL}${apyKey}&language=en-US&page=1`)
      .then(handleResponse)
      .then(data => {
        this.setState({
          results: data.results,
          loading: false,
          error: null
        });
      })
      .then(
        fetch(
          //fetching genres list
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apyKey}&language=en-US`
        )
          .then(handleResponse)
          .then(gen => {
            this.setState({
              genres: gen.genres,
              loading: false
            });

            console.log("Succes Genres", this.state);
          })
      )

      .catch(error => {
        this.setState({
          error: error.status_message,
          loading: false
        });
      });
  }

  //filter movies
  filterList(e) {
    this.setState({
      filterValue: e.target.value
    });
  }

  render() {
    const { loading, error, results } = this.state;

    //render loading comnonent
    if (loading) {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      );
    }
    // render error message, if error occured while fetching data
    if (error) {
      return <div className="error">{error}</div>;
    }

    const imagePath = "https://image.tmdb.org/t/p/w500";

    return (
      <div className="container clearfix">
        <div className="selectHolder">
          <label for="filterVotes">Filter by Rating</label>
          <select id="filterVotes" onChange={this.filterList}>
            <option value="">All Movies</option>
            <option value="10">10</option>
            <option value="9">9</option>
            <option value="8">8</option>
            <option value="7">7</option>
            <option value="6">6</option>
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
          </select>
        </div>
        <div className="listHolder">
          {results
            .filter(item => item.vote_average >= this.state.filterValue) // filter by vote_average
            .sort((a, b) => b.popularity - a.popularity) //sorting by popularity
            .map(movie => (
              <div
                key={movie.id}
                className="movie-holder col-20 t-col-33 m-col-50"
              >
                <img src={`${imagePath}${movie.poster_path}`} />
                <span className="votes">{movie.vote_average}</span>
                <p>{movie.title}</p>
                <div className="genreHolder">
                  {/* matching genres results with genres list */}
                  {movie.genre_ids.map(genre => (
                    <span key={genre}>
                      {this.state.genres.filter(gen => {
                        if (genre === gen.id) {
                          genre = gen.name;
                        }
                      })}
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default List;
