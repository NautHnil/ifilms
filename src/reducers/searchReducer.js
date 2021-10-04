import { TYPES } from "../actions/types";

export const searchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPES.ACTIONS.SEARCH_MOVIE_API_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchMovieResult: payload,
      };

    case TYPES.ACTIONS.SEARCH_MOVIE_API_FAIL:
      return {
        ...state,
        searchLoading: false,
        searchMovieResult: {},
      };

    case TYPES.ACTIONS.SEARCH_TV_API_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchTvResult: payload,
      };

    case TYPES.ACTIONS.SEARCH_TV_API_FAIL:
      return {
        ...state,
        searchLoading: false,
        searchTvResult: {},
      };

    case TYPES.ACTIONS.SEARCH_COLLECTION_API_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchCollectionResult: payload,
      };

    case TYPES.ACTIONS.SEARCH_COLLECTION_API_FAIL:
      return {
        ...state,
        searchLoading: false,
        searchCollectionResult: {},
      };

    case TYPES.ACTIONS.SEARCH_MULTI_API_SUCCESS:
      return {
        ...state,
        searchLoading: false,
        searchMultiResult: payload,
      };

    case TYPES.ACTIONS.SEARCH_MULTI_API_FAIL:
      return {
        ...state,
        searchLoading: false,
        searchMultiResult: {},
      };

    default:
      return state;
  }
};
