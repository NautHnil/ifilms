import { TYPES } from "../actions/types";

export const movieReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPES.ACTIONS.MOVIE_POPULAR_API_SUCCESS:
      return {
        ...state,
        movieLoading: false,
        movie: payload,
      };

    case TYPES.ACTIONS.MOVIE_POPULAR_API_FAIL:
      return {
        ...state,
        movieLoading: false,
        movie: [],
      };

    case TYPES.ACTIONS.MOVIE_DETAIL_API_SUCCESS:
      return {
        ...state,
        movieLoading: false,
        movie: payload,
      };

    case TYPES.ACTIONS.MOVIE_DETAIL_API_FAIL:
      return {
        ...state,
        movieLoading: false,
        movie: [],
      };

    default:
      return state;
  }
};
