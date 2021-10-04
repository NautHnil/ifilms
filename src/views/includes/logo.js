import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <Link to={`/`} className="navbar-brand">
        iFilms
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </>
  );
};

export default Logo;
