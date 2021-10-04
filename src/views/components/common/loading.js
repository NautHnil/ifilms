import React from "react";
import PropTypes from "prop-types";

const Loading = ({ type }) => {
  return (
    <div
      className={`d-flex position-${type} bg-white w-100 h-100`}
      style={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
      <div className="spinner-border text-primary m-auto" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

Loading.propTypes = {
  type: PropTypes.string,
};

Loading.defaultProps = {
  type: "fixed",
};

export default Loading;
