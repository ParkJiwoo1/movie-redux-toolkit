import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { useDispatch } from "react-redux";
import {
  searchAsyncMovies,
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../features/movies/movieSlice";
import { Person } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { searchMovies } from "../../features/movies/movieSlice";
function Header() {
  const dispatch = useDispatch();
  const [term, setTerm] = useState("");
  const movies = useSelector(searchMovies);

  useEffect(() => {
    dispatch(searchAsyncMovies(term));
  }, [dispatch, term]);

  const submitHandler = (e) => {
    e.preventDefault();
    //console.log(term);
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term));
    setTerm("");
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">movie app</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">search</button>
        </form>
        {movies.Response === "True" ? (
          <div className="Data-result">
            {movies.Search.map((value, key) => {
              return (
                <Link to={`/movie/${value.imdbID}`}>
                  <p key={value.imdbID} onClick={() => setTerm("")}>
                    {value.Title}
                  </p>
                </Link>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="user-image">
        <Person fontSize="large" />
      </div>
    </div>
  );
}

export default Header;
