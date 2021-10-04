import React, { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { TYPES } from "../actions/types";
import { API } from "../services/API";
import { configReducer } from "../reducers/configReducer";

export const ConfigContext = createContext();

const ConfigContextProvider = ({ children }) => {
  const [configState, dispatch] = useReducer(configReducer, {
    configsLoading: true,
    configs: [],
  });

  // Call API
  const getConfiguration = async (params) => {
    try {
      if (!params) {
        params = {};
      }

      const response = await API.get(`/configuration`);
      if (response.data) {
        dispatch({
          type: TYPES.ACTIONS.CONFIGURATION_API_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: TYPES.ACTIONS.CONFIGURATION_API_FAIL,
      });
    }
  };

  // Context data
  const configContextData = { configState, getConfiguration };

  // Return provider
  return (
    <ConfigContext.Provider value={configContextData}>
      {children}
    </ConfigContext.Provider>
  );
};

ConfigContextProvider.propTypes = {
  children: PropTypes.any,
};

export default ConfigContextProvider;
