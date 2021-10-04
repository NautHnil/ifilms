import axios from "axios";

const endpoint = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_ACCESS_TOKEN;

const get = (path, data = {}, headers = null) => {
  return axios
    .get(`${endpoint}${path}`, {
      timeout: 20000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      if (!error.response) {
        error.response = {
          data: {
            error_code: 102,
            message: "No response",
          },
        };
      }

      throw error;
    });
};

const post = (path, data = {}, headers = null) => {
  return axios
    .post(`${endpoint}${path}`, data, {
      timeout: 20000,
    })
    .catch((error) => {
      if (!error.response) {
        error.response = {
          data: {
            error_code: 102,
            message: "No response",
          },
        };
      }

      throw error;
    });
};

export const API = { get, post };
