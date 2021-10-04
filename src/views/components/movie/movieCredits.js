import _ from "lodash";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const MovieCredits = (props) => {
  const { isCast, isCrew, isCredits, cast, crew, configs } = props;

  // State
  const [crewUnique, setCrewUnique] = useState([]);

  // Get data
  useEffect(() => {
    if (!_.isEmpty(crew)) {
      const unique = Array.from(new Set(crew.map(({ name }) => name))).map(
        (name) => {
          return crew.find((c) => c.name === name);
        }
      );
      const topCrewPopularity = unique.filter(
        ({ popularity }) => popularity > 1.8
      );
      if (topCrewPopularity.length > 0) {
        setCrewUnique(topCrewPopularity);
      } else {
        setCrewUnique(unique);
      }
    }
  }, [crew]);

  return (
    <>
      {isCrew && (
        <div className={`row row-cols-2 row-cols-lg-3`}>
          {!_.isEmpty(crewUnique) &&
            crewUnique.slice(0, 6).map((item) => {
              return (
                <div key={item.id} className={`col mb-3`}>
                  <div className={`font-weight-bold`}>
                    <Link to={`./crew`}>{item.name}</Link>
                  </div>
                  <div className={`fs-13`}>{item.job}</div>
                </div>
              );
            })}
        </div>
      )}

      {isCast && (
        <div className={`mx--10 position-relative`}>
          <div className={`overflow-x`}>
            <div className={`d-flex`}>
              {!_.isEmpty(cast) &&
                cast.slice(0, 9).map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`px-10 pb-10`}
                      style={{ minWidth: 160, width: 160 }}
                    >
                      <div
                        className={`d-flex flex-column shadow-sm h-100 border rounded`}
                      >
                        {!_.isEmpty(configs) &&
                        !_.isEmpty(item.profile_path) ? (
                          <Link to={`./cast`} className={`d-block text-dark`}>
                            <img
                              src={`${
                                _.get(configs, "images").secure_base_url
                              }/${_.get(configs, "images").profile_sizes[1]}/${
                                item.profile_path
                              }`}
                              alt={item.name}
                              className={`rounded-top`}
                            />
                          </Link>
                        ) : (
                          <Link
                            to={`./cast`}
                            className={`d-block text-dark`}
                            style={{ height: 207 }}
                          >
                            <div
                              className={`d-flex bg-movie-light rounded-top h-100`}
                            >
                              <i
                                className={`fas fa-user fs-48 text-secondary m-auto`}
                              />
                            </div>
                          </Link>
                        )}

                        <div className={`p-2`}>
                          <div
                            className={`font-weight-bold mb-1`}
                            style={{ lineHeight: 1.3 }}
                          >
                            <Link
                              to={`./cast`}
                              className={`d-block text-movie-dark text-hover-movie-green`}
                            >
                              {item.name}
                            </Link>
                          </div>
                          <div className={`fs-13`}>{item.character}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              {!_.isEmpty(cast) && cast.length > 9 && (
                <div
                  className={`px-10 align-self-center`}
                  style={{ minWidth: 140 }}
                >
                  <Link to={`#more`} className={`d-block text-center`}>
                    <span className={`mr-1`}>View More</span>
                    <i className={`far fa-long-arrow-right`} />
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className={`scroll-fade`} />
        </div>
      )}

      {isCredits ? "" : ""}
    </>
  );
};

MovieCredits.propTypes = {
  isCast: PropTypes.bool,
  isCrew: PropTypes.bool,
  isCredits: PropTypes.bool,
  cast: PropTypes.array,
  crew: PropTypes.array,
  configs: PropTypes.object,
};

export default React.memo(MovieCredits);
