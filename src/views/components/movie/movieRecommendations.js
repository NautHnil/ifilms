import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { convertSlug } from "../../../utils";
import { voteAverage } from "../common/voteAverage";

const MovieRecommendations = ({ recommendations, configs }) => {
  return (
    <div className={`position-relative mx--10`}>
      <div className={`overflow-x rounded-md`}>
        <div className={`d-flex`}>
          {!_.isEmpty(recommendations) &&
            !_.isEmpty(configs) &&
            _.get(recommendations, "results")
              .slice(0, 10)
              .map((item) => (
                <div key={item.id} className={`px-10`}>
                  <div
                    className={`h-100`}
                    style={{
                      width: 250,
                      minWidth: 250,
                    }}
                  >
                    <Link
                      className={`d-block`}
                      to={`/movie/${item.id}-${convertSlug(item.title)}`}
                    >
                      {item.backdrop_path ? (
                        <img
                          className={`rounded-md`}
                          src={`${_.get(configs, "images").secure_base_url}${
                            _.get(configs, "images").backdrop_sizes[0]
                          }${item.backdrop_path}`}
                          alt={item.title}
                          style={{
                            width: 250,
                            minWidth: 250,
                          }}
                        />
                      ) : (
                        <div
                          className={`d-flex bg-movie-light rounded-md`}
                          style={{
                            width: 250,
                            minWidth: 250,
                            height: 141,
                          }}
                        >
                          <i
                            className={`far fa-image fs-48 text-secondary m-auto`}
                          />
                        </div>
                      )}
                    </Link>
                    <div className={`py-2`}>
                      <div className={`d-flex align-items-center`}>
                        <h2
                          className={`fs-14 font-weight-normal mb-0 line-clamp line-clamp--1 mr-auto`}
                        >
                          <Link
                            className={`text-movie-dark text-hover-movie-green`}
                            to={`/movie/${item.id}-${convertSlug(item.title)}`}
                          >
                            {item.title}
                          </Link>
                        </h2>

                        <span className={`ml-10`}>
                          {voteAverage(item.vote_average, null, "simple")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div className={`scroll-fade`} />
    </div>
  );
};

MovieRecommendations.propTypes = {
  recommendations: PropTypes.object,
  configs: PropTypes.object,
};

MovieRecommendations.defaultProps = {
  recommendations: {},
  configs: {},
};

export default React.memo(MovieRecommendations);
