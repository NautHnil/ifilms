import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink
          to={`/movie`}
          className="nav-link"
          activeClassName={`active text-movie-green`}
        >
          Movies
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to={`/tv`}
          className="nav-link"
          activeClassName={`active text-movie-green`}
        >
          TV Shows
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink
          to={`/person`}
          className="nav-link"
          activeClassName={`active text-movie-green`}
        >
          People
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/more`} className="nav-link">
          More
        </NavLink>
      </li>
    </ul>
  );
};

export default Navigation;
