import { TYPES } from "../actions/types";

export const configReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPES.ACTIONS.CONFIGURATION_API_SUCCESS:
      return {
        ...state,
        configsLoading: false,
        configs: payload,
      };

    case TYPES.ACTIONS.CONFIGURATION_API_FAIL:
      return {
        ...state,
        configsLoading: false,
        configs: [],
      };

    default:
      return state;
  }
};
