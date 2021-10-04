import _ from "lodash";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SearchResult from "./searchResult";
import { ConfigContext } from "../../../contexts/configContext";
import { SearchContext } from "../../../contexts/searchContext";
import { useVisible } from "../../../hooks";
import { scrollTop } from "../../../utils";

const SearchComponent = (props) => {
  const { query } = props;
  const initialState = {
    tabType: "movie",
    params: {
      query,
      page: 1,
      include_adult: false,
    },
  };

  // Context
  const {
    configState: { configsLoading, configs },
    getConfiguration,
  } = useContext(ConfigContext);
  const {
    searchState: {
      searchLoading,
      searchMovieResult,
      searchTvResult,
      searchCollectionResult,
    },
    GetSearchMovie,
    GetSearchTV,
    GetSearchCollection,
  } = useContext(SearchContext);

  // State
  const [tabType, setTabType] = useState(initialState.tabType);
  const [params, setParams] = useState(initialState.params);

  const stickyTop = useVisible(120);

  const getListSearchResult = (params) => {
    GetSearchMovie(params);
    GetSearchTV(params);
    GetSearchCollection(params);
  };

  const handleClickTab = (e, tab) => {
    e.preventDefault();
    setTabType(tab);
    scrollTop();
  };

  const onClickPage = (page, type) => {
    let newParams = { ...initialState.params, page };

    switch (type) {
      case "movie":
        return GetSearchMovie(newParams);

      case "tv":
        return GetSearchTV(newParams);

      case "collection":
        return GetSearchCollection(newParams);

      default:
        return "Nothing.";
    }
  };

  // Effect
  useEffect(() => {
    getConfiguration();
  }, []);

  useEffect(() => {
    setParams((prevState) => {
      let newParams = { ...prevState, query };
      getListSearchResult(newParams);
      return newParams;
    });
    setTabType(initialState.tabType);
  }, [query]);

  const renderSearchTypeResult = (type) => {
    let renderResult;

    switch (type) {
      case "movie":
        if (!searchLoading && !configsLoading) {
          renderResult = (
            <SearchResult
              searchData={searchMovieResult}
              configs={configs}
              type={type}
              onClickPage={onClickPage}
            />
          );
        }
        return renderResult;

      case "tv":
        if (!searchLoading && !configsLoading) {
          renderResult = (
            <SearchResult
              searchData={searchTvResult}
              configs={configs}
              type={type}
              onClickPage={onClickPage}
            />
          );
        }
        return renderResult;

      case "collection":
        if (!searchLoading && !configsLoading) {
          renderResult = (
            <SearchResult
              searchData={searchCollectionResult}
              configs={configs}
              type={type}
              layout={"list"}
              onClickPage={onClickPage}
            />
          );
        }
        return renderResult;

      default:
        return "Nothing.";
    }
  };

  return (
    <div className={`d-flex flex-column`}>
      <div className={`bx-heading d-flex align-items-center mb-24`}>
        <h2 className={`mb-0`}>
          Search results for &quot;
          <span className={`font-weight-light`}>{query}</span>&quot;
        </h2>
      </div>

      <div className={`row`}>
        <div className={`col-lg-3`}>
          <div
            className={`list-group sticky-top transition-2${
              stickyTop ? " pt-110" : ""
            }`}
          >
            <Link
              to={`#movie`}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center${
                tabType === "movie"
                  ? " active bg-movie-green-light border-movie-green-light"
                  : ""
              }${
                !searchLoading &&
                _.get(searchMovieResult, "total_results") === 0
                  ? " disabled"
                  : ""
              }`}
              onClick={(e) => handleClickTab(e, "movie")}
            >
              <span>Movies</span>
              <span
                className={`badge ${
                  tabType === "movie" ? "badge-light" : "badge-movie-green"
                } badge-pill`}
              >
                {!searchLoading && _.get(searchMovieResult, "total_results")}
              </span>
            </Link>
            <Link
              to={`#tv`}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center${
                tabType === "tv"
                  ? " active bg-movie-green-light border-movie-green-light"
                  : ""
              }${
                !searchLoading && _.get(searchTvResult, "total_results") === 0
                  ? " disabled"
                  : ""
              }`}
              onClick={(e) => handleClickTab(e, "tv")}
            >
              <span>TV Shows</span>
              <span
                className={`badge ${
                  tabType === "tv" ? "badge-light" : "badge-movie-green"
                } badge-pill`}
              >
                {!searchLoading && _.get(searchTvResult, "total_results")}
              </span>
            </Link>
            <Link
              to={`#collection`}
              className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center${
                tabType === "collection"
                  ? " active bg-movie-green-light border-movie-green-light"
                  : ""
              }${
                !searchLoading &&
                _.get(searchCollectionResult, "total_results") === 0
                  ? " disabled"
                  : ""
              }`}
              onClick={(e) => handleClickTab(e, "collection")}
            >
              <span>Collections</span>
              <span
                className={`badge ${
                  tabType === "collection" ? "badge-light" : "badge-movie-green"
                } badge-pill`}
              >
                {!searchLoading &&
                  _.get(searchCollectionResult, "total_results")}
              </span>
            </Link>
          </div>
        </div>

        <div className={`col-lg-9`}>{renderSearchTypeResult(tabType)}</div>
      </div>
    </div>
  );
};

SearchComponent.propTypes = {
  query: PropTypes.string.isRequired,
};

export default React.memo(SearchComponent);
