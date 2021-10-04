import { useState } from "react";
import { useLocation } from "react-router";
import { API } from "../services/API";

export const useFetchAPI = async (
  URL,
  params,
  METHOD = "GET",
  field_id = null,
  otherURL = null
) => {
  if (!params) {
    params = {};
  }

  let response;
  const queryData = params;
  const arrObjectKeysParam = Object.keys(params);

  arrObjectKeysParam.forEach((field) => {
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

  if (METHOD.trim().toUpperCase() === "GET") {
    response = await API.get(
      `${URL}${field_id ? `/${field_id}` : ""}${
        otherURL ? `/${otherURL}` : ""
      }${queryString ? `?${queryString}` : ""}`
    );
  }

  return response;
};

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

export const useVisible = (position) => {
  const [toggle, setToggle] = useState(false);

  const toggleElement = () => {
    const scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if (scrolled > position) {
      setToggle(true);
    } else if (scrolled <= position) {
      setToggle(false);
    }
  };

  window.addEventListener("scroll", toggleElement);

  return toggle;
};
