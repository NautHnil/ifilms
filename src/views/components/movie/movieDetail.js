import _ from "lodash";
import React, { useContext, useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import { MovieContext } from "../../../contexts/movieContext";
import { ConfigContext } from "../../../contexts/configContext";
import GetColorFromImage from "../common/getColorFromImage";
import {
  convertSlug,
  decimalMinutesToTime,
  formatToCurrency,
  scrollTop,
} from "../../../utils";
import { SetMetaWeb } from "../common/setMetaWeb";
import MovieCredits from "./movieCredits";
import MovieMedia from "./movieMedia";
import MovieRecommendations from "./movieRecommendations";
import { voteAverage } from "../common/voteAverage";
import { CollectionContext } from "../../../contexts/collectionContext";
import Loading from "../common/loading";

const MovieDetailComponent = (props) => {
  // Context
  const {
    movieState: { movie, movieLoading },
    getMovieDetail,
  } = useContext(MovieContext);
  const {
    configState: { configs },
    getConfiguration,
  } = useContext(ConfigContext);
  const {
    collectionState: { collection },
    getCollectionDetail,
  } = useContext(CollectionContext);

  // State
  const [releaseMovieDate, setReleaseMovieDate] = useState([]);
  const [certification, setCertification] = useState("");
  const [params, setParams] = useState({
    append_to_response:
      "parts,credits,external_ids,images,keywords,recommendations,release_dates,videos",
  });
  const [tabType, setTabType] = useState("popular");

  const loadReleaseDate = () => {
    if (!movieLoading) {
      let iso_3166_1, release_date, certification;

      const filterISO = _.get(movie, "release_dates").results.filter(
        (item) => item.iso_3166_1 === "US"
      );

      if (filterISO.length > 0) {
        const filterReleaseDateType = filterISO[0].release_dates.filter(
          (el) => el.type === 3
        );

        if (filterReleaseDateType.length > 0) {
          release_date = filterReleaseDateType[0].release_date;
          certification = filterReleaseDateType[0].certification;
        } else {
          release_date = filterISO[0].release_dates[0].release_date;
          certification = filterISO[0].release_dates[0].certification;
        }

        iso_3166_1 = filterISO[0].iso_3166_1;
      } else {
        iso_3166_1 = _.get(movie, "release_dates").results[0].iso_3166_1;
        release_date = _.get(movie, "release_dates").results[0].release_dates[0]
          .release_date;
        certification = _.get(movie, "release_dates").results[0]
          .release_dates[0].certification;
      }

      setReleaseMovieDate({
        iso_3166_1,
        release_date,
      });

      setCertification(certification);
    }
  };

  // Get Data
  useEffect(() => {
    getConfiguration();
  }, []);

  useEffect(() => {
    getMovieDetail(props.id, params);
    setTabType("popular");
    scrollTop();
  }, [props.id]);

  useEffect(() => {
    loadReleaseDate();
    if (!_.isEmpty(movie) && !_.isEmpty(movie.belongs_to_collection)) {
      getCollectionDetail(movie.belongs_to_collection.id);
    }
  }, [movie]);

  const handleClickTab = (e, tab) => {
    e.preventDefault();
    setTabType(tab);
  };

  const getOriginalLanguage = (language) => {
    const lang = !_.isEmpty(_.get(movie.spoken_languages))
      ? movie.spoken_languages.find(({ iso_639_1 }) => iso_639_1 === language)
      : { english_name: "-" };

    return lang.english_name;
  };

  let renderBody;

  if (movieLoading) {
    renderBody = <Loading />;
  } else {
    renderBody = (
      <>
        {!_.isEmpty(movie) && !_.isEmpty(_.get(configs, "images")) && (
          <>
            {SetMetaWeb(movie)}

            <div
              className="entry-header"
              style={{
                backgroundImage: `url(${
                  _.get(configs, "images").secure_base_url
                }/${_.get(configs, "images").backdrop_sizes[2]}/${
                  movie.backdrop_path
                })`,
              }}
            >
              <GetColorFromImage
                image={`${_.get(configs, "images").secure_base_url}/${
                  _.get(configs, "images").poster_sizes[3]
                }/${movie.poster_path}`}
              >
                <div className="entry-header__content">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-3">
                        <div className="overflow-hidden">
                          <div className={`p-30 p-lg-0 rounded-md`}>
                            <img
                              className="rounded-md shadow-lg"
                              src={`${
                                _.get(configs, "images").secure_base_url
                              }/${_.get(configs, "images").poster_sizes[3]}/${
                                movie.poster_path
                              }`}
                              alt={movie.title}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-9">
                        <div className="mb-24">
                          <h1 className="fs-28 fs-lg-32 mb-3 mb-lg-0">
                            <span>{movie.title}</span>
                            {releaseMovieDate.release_date && (
                              <span className={`ml-2 font-weight-normal`}>
                                (
                                {moment(releaseMovieDate.release_date).format(
                                  "YYYY"
                                )}
                                )
                              </span>
                            )}
                          </h1>
                          <div className="d-flex flex-wrap flex-lg-nowrap align-items-center">
                            {certification && (
                              <div className="certification mr-2 fs-13">
                                <span className="d-inline-block border p-1 lh-1">
                                  {certification}
                                </span>
                              </div>
                            )}

                            <div className="release mr-3">
                              <i className="far fa-calendar fs-12 align-middle mr-1" />
                              <span className="align-middle">
                                {moment(releaseMovieDate.release_date).format(
                                  "MMM Do, YYYY"
                                )}
                              </span>

                              {releaseMovieDate.iso_3166_1 && (
                                <span className="align-middle ml-1">
                                  ({releaseMovieDate.iso_3166_1})
                                </span>
                              )}
                            </div>

                            {movie.runtime ? (
                              <div className="runtime order-lg-last">
                                <i className="far fa-clock fs-12 align-middle mr-1" />
                                <span className="align-middle">
                                  {decimalMinutesToTime(movie.runtime)}
                                </span>
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="genres w-100 w-lg-auto mt-2 mt-lg-0 mr-lg-3">
                              <i className="far fa-tags fs-12 align-middle mr-1" />
                              <span className="align-middle">
                                {!_.isEmpty(_.get(movie, "genres")) &&
                                  _.get(movie, "genres").map((genre, idx) => (
                                    <Fragment key={genre.id}>
                                      {idx !== 0 && ", "}
                                      <Link to={`#${genre.id}`}>
                                        {genre.name}
                                      </Link>
                                    </Fragment>
                                  ))}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Rating Score */}
                        <div className={`mb-24`}>
                          <div className={`d-flex align-items-center`}>
                            <div className={`d-flex align-items-center mr-20`}>
                              <div className={`mr-2`}>
                                {voteAverage(movie.vote_average, "lg")}
                              </div>
                              {/* <span>User Score</span> */}
                            </div>
                          </div>
                        </div>

                        {/* Overview */}
                        <div className={`mb-24`}>
                          {movie.tagline && (
                            <div className="text-secondary mb-2">
                              <i>{movie.tagline}</i>
                            </div>
                          )}
                          <h3 className="fs-18">Overview</h3>
                          <p>{movie.overview}</p>
                        </div>

                        {/* Top Crew */}
                        <div className={`entry-header__top-crew`}>
                          <MovieCredits
                            isCrew={true}
                            crew={_.get(movie, "credits").crew}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GetColorFromImage>
            </div>

            <div className={`entry-content py-30`}>
              <div className={`container`}>
                <div className={`row`}>
                  <article className={`col-lg-9`}>
                    {/* Top Cast */}
                    <section className={`mb-30 pb-30 border-bottom`}>
                      <div className={`d-flex align-items-center mb-3`}>
                        <h3
                          className={`font-weight-medium fs-22 text-capitalize mb-0 mr-auto`}
                        >
                          Top Billed Cast
                        </h3>
                        <Link
                          to={`./cast`}
                          className={`text-capitalize ml-3 text-movie-dark text-hover-movie-green`}
                        >
                          Full Cast & Crew
                        </Link>
                      </div>
                      <MovieCredits
                        isCast={true}
                        cast={_.get(movie, "credits").cast}
                        configs={configs}
                      />
                    </section>

                    {/* Media */}
                    <section
                      className={`${
                        !_.isEmpty(movie.belongs_to_collection) ||
                        !_.isEmpty(_.get(movie.recommendations, "results"))
                          ? "mb-30 pb-30 border-bottom"
                          : ""
                      }`}
                    >
                      <div className={`d-flex align-items-center mb-3`}>
                        <h3
                          className={`font-weight-medium fs-22 text-capitalize mb-0 mr-30`}
                        >
                          Media
                        </h3>
                        <div>
                          <ul className="nav justify-content-end justify-content-lg-start">
                            <li className="nav-item">
                              <Link
                                className={`nav-link text-hover-movie-green py-2 py-lg-0${
                                  tabType === "popular"
                                    ? " active text-movie-green"
                                    : " text-movie-dark"
                                }`}
                                to={`#most-popular`}
                                onClick={(e) => handleClickTab(e, "popular")}
                              >
                                Most Popular
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className={`nav-link text-hover-movie-green py-2 py-lg-0${
                                  tabType === "videos"
                                    ? " active text-movie-green"
                                    : " text-movie-dark"
                                }`}
                                to={`#videos`}
                                onClick={(e) => handleClickTab(e, "videos")}
                              >
                                Videos ({movie.videos.results.length})
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className={`nav-link text-hover-movie-green py-2 py-lg-0${
                                  tabType === "backdrops"
                                    ? " active text-movie-green"
                                    : " text-movie-dark"
                                }`}
                                to={`#backdrops`}
                                onClick={(e) => handleClickTab(e, "backdrops")}
                              >
                                Backdrops ({movie.images.backdrops.length})
                              </Link>
                            </li>
                            <li className="nav-item">
                              <Link
                                className={`nav-link text-hover-movie-green py-2 py-lg-0${
                                  tabType === "posters"
                                    ? " active text-movie-green"
                                    : " text-movie-dark"
                                }`}
                                to={`#posters`}
                                onClick={(e) => handleClickTab(e, "posters")}
                              >
                                Posters ({movie.images.posters.length})
                              </Link>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <MovieMedia
                        title={movie.title}
                        type={tabType}
                        videos={movie.videos}
                        images={movie.images}
                        configs={configs}
                      />
                    </section>

                    {/* Collection */}
                    {!_.isEmpty(movie.belongs_to_collection) &&
                      !_.isEmpty(collection) && (
                        <section>
                          <div
                            className={`${
                              !_.isEmpty(
                                _.get(movie.recommendations, "results")
                              )
                                ? "mb-30 pb-30 border-bottom"
                                : ""
                            }`}
                          >
                            <div
                              className={`d-flex position-relative bg-default-style${
                                _.isEmpty(
                                  movie.belongs_to_collection.backdrop_path
                                ) && " bg-default-style-img"
                              } overlay overflow-hidden rounded-md p-24`}
                              style={
                                !_.isEmpty(
                                  movie.belongs_to_collection.backdrop_path
                                )
                                  ? {
                                      backgroundImage: `url(${
                                        _.get(configs, "images").secure_base_url
                                      }/${
                                        _.get(configs, "images")
                                          .backdrop_sizes[2]
                                      }/${
                                        movie.belongs_to_collection
                                          .backdrop_path
                                      })`,
                                    }
                                  : {}
                              }
                            >
                              <div className={`my-auto py-50 w-100`}>
                                <h3 className={`d-block fs-22 text-white mb-1`}>
                                  {movie.belongs_to_collection.name}
                                </h3>
                                <p
                                  className={`text-white mb-3 pr-lg-50 pr-xl-100 fs-14`}
                                >
                                  {_.get(collection, "overview")}
                                </p>
                                <Link
                                  to={`/collection/${
                                    movie.belongs_to_collection.id
                                  }-${convertSlug(
                                    movie.belongs_to_collection.name
                                  )}`}
                                  className={`btn bg-movie-green rounded-pill text-uppercase`}
                                >
                                  View The Collection
                                </Link>
                              </div>
                            </div>
                          </div>
                        </section>
                      )}

                    {/* Recommendations */}
                    {!_.isEmpty(_.get(movie.recommendations, "results")) && (
                      <section>
                        <div className={`d-flex align-items-center mb-3`}>
                          <h3
                            className={`font-weight-medium fs-22 text-capitalize mb-0 mr-30`}
                          >
                            Recommendations
                          </h3>
                        </div>
                        <div>
                          <MovieRecommendations
                            recommendations={_.get(movie, "recommendations")}
                            configs={configs}
                          />
                        </div>
                      </section>
                    )}
                  </article>

                  <aside className={`col-lg-3`}>
                    {/* Other information movie */}
                    <div className={`mt-30 mt-lg-0`}>
                      <div className={`mb-3`}>
                        <label
                          className={`d-block font-weight-bold text-capitalize mb-0`}
                        >
                          Social Network
                        </label>

                        {!_.isEmpty(movie.external_ids) ? (
                          <>
                            {movie.external_ids.facebook_id && (
                              <a
                                className={`fs-24 mr-3`}
                                href={`https://www.facebook.com/${movie.external_ids.facebook_id}`}
                                target={`_blank`}
                              >
                                <i className={`fab fa-facebook-square`} />
                              </a>
                            )}
                            {movie.external_ids.instagram_id && (
                              <a
                                className={`fs-24 mr-3`}
                                href={`https://twitter.com/${movie.external_ids.instagram_id}`}
                                target={`_blank`}
                              >
                                <i className={`fab fa-instagram`} />
                              </a>
                            )}
                            {movie.external_ids.twitter_id && (
                              <a
                                className={`fs-24 mr-3`}
                                href={`https://instagram.com/${movie.external_ids.twitter_id}`}
                                target={`_blank`}
                              >
                                <i className={`fab fa-twitter`} />
                              </a>
                            )}
                          </>
                        ) : (
                          ""
                        )}

                        {movie.homepage ? (
                          <a
                            className={`fs-24`}
                            href={movie.homepage}
                            target={`_blank`}
                          >
                            <i className={`fas fa-link`} />
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>

                      {movie.original_title !== movie.title && (
                        <div className={`mb-3`}>
                          <label
                            className={`d-block font-weight-bold text-capitalize mb-0`}
                          >
                            Original Title
                          </label>
                          <span>{movie.original_title}</span>
                        </div>
                      )}
                      <div className={`mb-3`}>
                        <label
                          className={`d-block font-weight-bold text-capitalize mb-0`}
                        >
                          Status
                        </label>
                        <span>{movie.status}</span>
                      </div>
                      <div className={`mb-3`}>
                        <label
                          className={`d-block font-weight-bold text-capitalize mb-0`}
                        >
                          Original Language
                        </label>
                        <span>
                          {getOriginalLanguage(movie.original_language)}
                        </span>
                      </div>
                      <div className={`mb-3`}>
                        <label
                          className={`d-block font-weight-bold text-capitalize mb-0`}
                        >
                          Budget
                        </label>
                        <span>
                          {movie.budget > 0
                            ? formatToCurrency(movie.budget)
                            : "-"}
                        </span>
                      </div>
                      <div className={`mb-3`}>
                        <label
                          className={`d-block font-weight-bold text-capitalize mb-0`}
                        >
                          Revenue
                        </label>
                        <span>
                          {movie.revenue > 0
                            ? formatToCurrency(movie.revenue)
                            : "-"}
                        </span>
                      </div>
                      <div>
                        <label
                          className={`d-block font-weight-bold text-capitalize mb-0`}
                        >
                          Keywords
                        </label>
                        <div>
                          {_.get(movie, "keywords").keywords.map((keyword) => (
                            <Link
                              key={keyword.id}
                              className={`badge badge-light border rounded mr-2 mb-2 py-2 px-2`}
                              to={`/keyword/${keyword.id}-${keyword.name}`}
                            >
                              <i className={`fas fa-tag mr-1 align-middle`} />
                              <span className={`align-middle`}>
                                {keyword.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return <Fragment>{renderBody}</Fragment>;
};

MovieDetailComponent.propTypes = {
  id: PropTypes.number.isRequired,
};

export default React.memo(MovieDetailComponent);
