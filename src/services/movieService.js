import { API } from "./API";

export const getMoviePopularService = (params) => {
  try {
    if (!params) {
      params = {};
    }
    return API.get("/movie/popular");
  } catch (e) {
    return e;
  }
};

export const getMovieDetailService = (id) => {
  try {
    return API.get(`/movie/${id}`);
  } catch (e) {
    return e;
  }
};

export const getMovieReleaseDateService = (id) => {
  try {
    return API.get(`/movie/${id}/release_dates`);
  } catch (e) {
    return e;
  }
};

export const getMovieCreditsService = (id) => {
  try {
    return API.get(`/movie/${id}/credits`);
  } catch (e) {
    return e;
  }
};
