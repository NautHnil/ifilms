import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { collectionReducer } from "../reducers/collectionReducer";
import { API } from "../services/API";
import { TYPES } from "../actions/types";

export const CollectionContext = createContext();

const CollectionContextProvider = ({ children }) => {
  // Reducer
  const [collectionState, dispatch] = useReducer(collectionReducer, {
    collectionLoading: true,
    collection: [],
  });

  // Call API
  const getCollectionDetail = async (collection_id, params) => {
    try {
      if (!params) {
        params = {};
      }

      const { language } = params;
      const queryData = { language };

      ["language"].forEach((field) => {
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
        `/collection/${collection_id}${queryString ? `?${queryString}` : ""}`
      );

      if (response.data) {
        dispatch({
          type: TYPES.ACTIONS.COLLECTION_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPES.ACTIONS.COLLECTION_API_FAIL,
      });
    }
  };

  // Context Data
  const collectionContextData = {
    collectionState,
    getCollectionDetail,
  };

  // Return Provider
  return (
    <CollectionContext.Provider value={collectionContextData}>
      {children}
    </CollectionContext.Provider>
  );
};

CollectionContextProvider.propTypes = {
  children: PropTypes.any,
};

export default CollectionContextProvider;
