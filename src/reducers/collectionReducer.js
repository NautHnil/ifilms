import { TYPES } from "../actions/types";

export const collectionReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case TYPES.ACTIONS.COLLECTION_API_SUCCESS:
      return {
        ...state,
        collectionLoading: false,
        collection: payload,
      };

    case TYPES.ACTIONS.COLLECTION_API_FAIL:
      return {
        ...state,
        collectionLoading: false,
        collection: [],
      };

    default:
      return state;
  }
};
