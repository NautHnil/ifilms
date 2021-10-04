import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { voteAverage } from "../common/voteAverage";
import { convertSlug } from "../../../utils";

const CardItem = (props) => {
  const {
    id,
    title,
    name,
    overview,
    poster_path,
    vote_average,
    release_date,
    first_air_date,
    configs,
    type,
    layout,
  } = props;

  return (
    <>
      {layout === "grid" ? (
        <div className="card h-100 rounded-lg shadow-sm">
          <div>
            <Link
              to={`/${type}/${id}-${
                title || name ? convertSlug(title ? title : name) : ""
              }`}
              className={`d-block`}
            >
              {poster_path ? (
                <img
                  className="card-img-top card-img-top__custom mb-2 rounded-lg shadow-custom"
                  src={`${_.get(configs, "images").secure_base_url}/${
                    _.get(configs, "images").poster_sizes[3]
                  }/${poster_path}`}
                  alt={title ? title : name}
                />
              ) : (
                <span
                  className={`d-flex h-100 bg-movie-light card-img-top card-img-top__custom mb-2 rounded-lg shadow-custom`}
                  style={{
                    minHeight: 323,
                  }}
                >
                  <i className={`m-auto fs-48 fas fa-image text-secondary`} />
                </span>
              )}
            </Link>
          </div>
          <div className="card-body position-relative d-flex flex-column p-2">
            {type !== "collection" && (
              <div className="position-absolute" style={{ top: -55, left: 7 }}>
                {voteAverage(vote_average, "sm")}
              </div>
            )}

            <h2 className="fs-16 m-0 my-auto">
              <Link
                to={`/${type}/${id}-${
                  title || name ? convertSlug(title ? title : name) : ""
                }`}
                className="d-block text-movie-green"
              >
                {title ? title : name}
              </Link>
            </h2>

            {type === "movie" && (
              <div className="card-text fs-14 text-secondary">
                {release_date
                  ? moment(release_date).format("MMM Do, YYYY")
                  : "Upcoming"}
              </div>
            )}

            {type === "tv" && (
              <div className="card-text fs-14 text-secondary">
                {first_air_date
                  ? moment(first_air_date).format("MMM Do, YYYY")
                  : "Upcoming"}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card rounded shadow-sm mb-24">
          <div className="row no-gutters align-items-center">
            <div className="col-lg-2">
              <Link
                to={`/${type}/${id}-${
                  title || name ? convertSlug(title ? title : name) : ""
                }`}
                className={`d-block`}
              >
                {poster_path ? (
                  <img
                    className={`rounded-left border-right`}
                    src={`${_.get(configs, "images").secure_base_url}${
                      _.get(configs, "images").poster_sizes[5]
                    }${poster_path}`}
                    alt={title ? title : name}
                  />
                ) : (
                  <span
                    className={`d-flex h-100 bg-movie-light`}
                    style={{
                      minHeight: 200,
                    }}
                  >
                    <i className={`m-auto fs-48 fas fa-image text-secondary`} />
                  </span>
                )}
              </Link>
            </div>
            <div className="col-lg-10">
              <div className="card-body">
                <h2 className="card-title fs-16 m-0 my-auto">
                  <Link
                    to={`/${type}/${id}-${
                      title || name ? convertSlug(title ? title : name) : ""
                    }`}
                    className="d-block text-movie-green"
                  >
                    {title ? title : name}
                  </Link>
                </h2>

                {overview && (
                  <p className="card-text mb-0 line-clamp line-clamp--5">
                    {overview}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

CardItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  name: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  vote_average: PropTypes.number,
  release_date: PropTypes.string,
  first_air_date: PropTypes.string,
  configs: PropTypes.object,
  type: PropTypes.string,
  layout: PropTypes.string,
};

CardItem.defaultProps = {
  id: 0,
  title: "",
  name: "",
  overview: "",
  poster_path: "",
  vote_average: 0,
  release_date: "",
  first_air_date: "",
  configs: {},
  type: "movie",
  layout: "grid",
};

export default CardItem;
