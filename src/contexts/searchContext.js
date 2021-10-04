import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { searchReducer } from "../reducers/searchReducer";
import { TYPES } from "../actions/types";
import { useFetchAPI } from "../hooks";

export const SearchContext = createContext();

const SearchContextProvider = ({ children }) => {
  // Reducer
  const [searchState, dispatch] = useReducer(searchReducer, {
    searchLoading: true,
    searchMovieResult: {},
    searchTvResult: {},
    searchCollectionResult: {},
    searchMultiResult: {},
  });

  // Get API
  const GetSearchMovie = async (params) => {
    try {
      const response = await useFetchAPI("/search/movie", params);

      if (response.data) {
        dispatch({
          type: TYPES.ACTIONS.SEARCH_MOVIE_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPES.ACTIONS.SEARCH_MOVIE_API_FAIL,
      });
    }
  };

  const GetSearchTV = async (params) => {
    try {
      const response = await useFetchAPI("/search/tv", params);

      if (response.data) {
        dispatch({
          type: TYPES.ACTIONS.SEARCH_TV_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPES.ACTIONS.SEARCH_TV_API_FAIL,
      });
    }
  };

  const GetSearchCollection = async (params) => {
    try {
      const response = await useFetchAPI("/search/collection", params);

      if (response.data) {
        dispatch({
          type: TYPES.ACTIONS.SEARCH_COLLECTION_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPES.ACTIONS.SEARCH_COLLECTION_API_FAIL,
      });
    }
  };

  const GetSearchMulti = async (params) => {
    try {
      const response = await useFetchAPI("/search/multi", params);

      if (response.data) {
        dispatch({
          type: TYPES.ACTIONS.SEARCH_MULTI_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPES.ACTIONS.SEARCH_MULTI_API_FAIL,
      });
    }
  };

  // Context Data
  const searchContextData = {
    searchState,
    GetSearchMovie,
    GetSearchTV,
    GetSearchCollection,
    GetSearchMulti,
  };

  // Return Provider
  return (
    <SearchContext.Provider value={searchContextData}>
      {children}
    </SearchContext.Provider>
  );
};

SearchContextProvider.propTypes = {
  children: PropTypes.any,
};

export default SearchContextProvider;
