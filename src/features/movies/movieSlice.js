import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKey } from "../../common/apis/movieAPIKey";
import movieAPI from "../../common/apis/movieAPI";

export const searchAsyncMovies = createAsyncThunk(
  "movies/searchAsyncMovies",
  async (term) => {
    const response = await movieAPI.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieAPI.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await movieAPI.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncShowDetail = createAsyncThunk(
  "movies/fetchAsyncShowDetail",
  async (id) => {
    const response = await movieAPI.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialStateValue = {
  movies: {},
  shows: {},
  detail: {},
  search: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState: initialStateValue,
  reducers: {
    removeSelectedDetail: (state) => {
      state.selectedDetail = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("movies Fullfilled");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("shows Fullfilled");
      return { ...state, shows: payload };
    },
    [fetchAsyncShowDetail.fulfilled]: (state, { payload }) => {
      console.log("detail Fullfilled");
      return { ...state, detail: payload };
    },
    [searchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("search Fullfilled");
      return { ...state, search: payload };
    },
  },
});

export const { removeSelectedDetail } = movieSlice.actions;
export const searchMovies = (state) => state.movies.search;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getAllShowDetail = (state) => state.movies.detail;

export default movieSlice.reducer;
