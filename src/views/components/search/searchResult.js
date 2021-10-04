import _ from "lodash";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import CardItem from "../common/cardItem";
import Loading from "../common/loading";
import Pagination from "../common/pagination";

const SearchResult = ({ searchData, type, layout, configs, onClickPage }) => {
  const { results, ...pagination } = searchData;

  return (
    <>
      {!_.isEmpty(searchData) ? (
        !_.isEmpty(results) ? (
          <>
            {layout === "grid" ? (
              <div className="row row-cols-2 row-cols-lg-4">
                {_.get(searchData, "results").map((item) => (
                  <div key={item.id} className={`col`}>
                    <div className="h-100 pb-30">
                      <CardItem
                        {...item}
                        type={type}
                        layout={layout}
                        configs={configs}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {results.map((item) => (
                  <Fragment key={item.id}>
                    <CardItem
                      {...item}
                      type={type}
                      layout={layout}
                      configs={configs}
                    />
                  </Fragment>
                ))}
              </>
            )}

            {pagination.total_pages > 1 && (
              <Pagination
                {...pagination}
                onClickPage={onClickPage}
                type={type}
              />
            )}
          </>
        ) : (
          <div>
            <h4>Nothing found</h4>
            <div>
              Sorry, but nothing matched your search terms. Please try again
              with some different keywords.
            </div>
          </div>
        )
      ) : (
        <Loading type={`absolute`} />
      )}
    </>
  );
};

SearchResult.propTypes = {
  searchData: PropTypes.object,
  type: PropTypes.string,
  layout: PropTypes.string,
  configs: PropTypes.object,
  onClickPage: PropTypes.func,
};

SearchResult.defaultProps = {
  searchData: {},
  type: "movie",
  layout: "grid",
  configs: {},
  onClickPage: null,
};

export default React.memo(SearchResult);
