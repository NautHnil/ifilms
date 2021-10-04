import React from "react";
import { Route, Switch } from "react-router-dom";
import routesConfig from "../../configs/routers";

const Switcher = () => {
  return (
    <Switch>
      {routesConfig.map((route, idx) => (
        <Route key={idx} {...route} />
      ))}
    </Switch>
  );
};

Switcher.displayName = "Switcher";

export default Switcher;
