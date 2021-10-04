import React from "react";
import Home, { Movie, MovieDetail, SearchPage } from "../views/pages";

const routesConfig = [
  {
    name: "Search",
    path: "/search",
    render: function Component(props) {
      return <SearchPage {...props} />;
    },
    exact: true,
  },
  {
    name: "Movie Detail",
    path: "/movie/:id",
    render: function Component(props) {
      return <MovieDetail {...props} />;
    },
    exact: true,
  },
  {
    name: "Movie",
    path: "/movie",
    render: function Component(props) {
      return <Movie {...props} />;
    },
    exact: true,
  },
  {
    name: "Home",
    path: "/",
    render: function Component(props) {
      return <Home {...props} />;
    },
    exact: true,
  },
  {
    name: "Page Not Found",
    path: "*",
    render: function Component(props) {
      return (
        <section className={`pt-30 pb-50`}>
          <div className={`container`}>
            <h2>Page not found.</h2>
          </div>
        </section>
      );
    },
  },
];

export default routesConfig;
