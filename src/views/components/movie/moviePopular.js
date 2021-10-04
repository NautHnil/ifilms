import _ from "lodash";
import React, { useState, useEffect, useContext } from "react";
import { ConfigContext } from "../../../contexts/configContext";
import { MovieContext } from "../../../contexts/movieContext";
import CardItem from "../common/cardItem";
import Loading from "../common/loading";

const MoviePopular = () => {
  // Context
  const {
    movieState: { movie, movieLoading },
    getMoviePopular,
  } = useContext(MovieContext);
  const {
    configState: { configs, configsLoading },
    getConfiguration,
  } = useContext(ConfigContext);

  // State
  const [activePage, setActivePage] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    // language: "vi-VN",
  });
  const [listPageMovie, setListPageMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination
  const onClickPage = () => {
    let count = activePage;
    count++;
    setActivePage(count);
    setParams({
      ...params,
      page: count,
    });
    setIsLoading(true);
  };

  useEffect(() => getConfiguration(), []);

  // Get movie popular
  useEffect(() => getMoviePopular(params), [params]);

  useEffect(() => {
    setListPageMovie((prevState) => [...prevState, movie]);
    setIsLoading(false);
  }, [movie]);

  let renderBody;
  if (movieLoading) {
    renderBody = <Loading />;
  } else if (movie.length === 0) {
    renderBody = <div className={`text-center py-3`}>No data</div>;
  } else {
    if (!configsLoading) {
      renderBody = (
        <>
          {!_.isEmpty(listPageMovie) ? (
            listPageMovie.map((p, index) => (
              <div key={index} className="row row-cols-2 row-cols-lg-5">
                {!_.isEmpty(p)
                  ? _.get(p, "results").map((item, idx) => (
                      <div key={idx} className="col">
                        <div className="h-100 pb-30">
                          <CardItem {...item} configs={configs} />
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
            ))
          ) : (
            <div className="row row-cols-2 row-cols-lg-5">
              {!_.isEmpty(movie)
                ? _.get(movie, "results").map((item, idx) => (
                    <div key={idx} className="col">
                      <div className="h-100 pb-30">
                        <CardItem {...item} configs={configs} />
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          )}

          {activePage < _.get(movie, "total_pages") && (
            <div>
              <button
                className="btn btn-movie-green d-block rounded w-100"
                onClick={() => onClickPage()}
              >
                {isLoading ? (
                  <>
                    <div
                      className="spinner-border spinner-border-sm text-white"
                      role="status"
                    />
                    <span className={`align-middle ml-1`}>Loading...</span>
                  </>
                ) : (
                  <span>Load more</span>
                )}
              </button>
            </div>
          )}
        </>
      );
    }
  }
  return (
    <div className={`container`}>
      <div className={`bx-heading d-flex align-items-center mb-24`}>
        <h2 className={`mb-0`}>Movie Popular</h2>
      </div>

      <div>{renderBody}</div>
    </div>
  );
};

export default React.memo(MoviePopular);
