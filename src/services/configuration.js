import { API } from "./API";

export const getConfigurationService = () => {
  try {
    const res = API.get("/configuration");
    return res;
  } catch (e) {
    return e;
  }
};
