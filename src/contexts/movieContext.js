import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { TYPES } from "../actions/types";
import { movieReducer } from "../reducers/movieReducer";
import { API } from "../services/API";

export const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [movieState, dispatch] = useReducer(movieReducer, {
    movieLoading: true,
    movie: [],
  });

  // Call API
  const getMoviePopular = async (params) => {
    try {
      if (!params) {
        params = {};
      }

      const { page, language } = params;
      const queryData = { page, language };

      ["page", "language"].forEach((field) => {
        if (queryData[field] === undefined) {
          delete queryData[field];
        }
      });

      const queryString = Object.keys(queryData)
        .reduce(function (a, k) {
          a.push(k + "=" + encodeURIComponent(queryData[k]));
          return a;
        }, [])
        .join("&");

      const response = await API.get(
        `/discover/movie${queryString ? `?${queryString}` : ""}`
      );

      if (response.data) {
        dispatch({
          type: TYPES.ACTIONS.MOVIE_POPULAR_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPES.ACTIONS.MOVIE_POPULAR_API_FAIL,
      });
    }
  };

  const getMovieDetail = async (movie_id, params) => {
    try {
      if (!params) {
        params = {};
      }

      const { append_to_response, language } = params;
      const queryData = { append_to_response, language };

      ["append_to_response", "language"].forEach((field) => {
        if (queryData[field] === undefined) {
          delete queryData[field];
        }
      });

      const queryString = Object.keys(queryData)
        .reduce(function (a, k) {
          a.push(k + "=" + encodeURIComponent(queryData[k]));
          return a;
        }, [])
        .join("&");

      const response = await API.get(
        `/movie/${movie_id}${queryString ? `?${queryString}` : ""}`
      );

      if (response.data) {
        dispatch({
          type: TYPES.ACTIONS.MOVIE_DETAIL_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPES.ACTIONS.MOVIE_DETAIL_API_FAIL,
      });
    }
  };

  // Context data
  const movieContextData = {
    movieState,
    getMoviePopular,
    getMovieDetail,
  };

  // Return provider
  return (
    <MovieContext.Provider value={movieContextData}>
      {children}
    </MovieContext.Provider>
  );
};

MovieContextProvider.propTypes = {
  children: PropTypes.any,
};

export default MovieContextProvider;
