import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { scrollTop } from "../../../utils";

const Pagination = ({
  page,
  total_pages,
  total_results,
  onClickPage,
  type,
}) => {
  const [activeKey, setActiveKey] = useState(page);

  useEffect(() => {
    setActiveKey(1);
    clickPage(1);
  }, [total_results]);

  const clickPage = (page) => {
    if (page < 1 || page > total_pages) {
      return;
    }

    setActiveKey(page);
    onClickPage(page, type);
    scrollTop();
  };

  const renderAdvancedPage = (activeKey) => {
    let headPages = [];
    let lastPages = [];
    // 1 2 3 4 5 6 7 8 9
    if (activeKey === 1) {
      headPages = [1, 2, 3];
      if (total_pages >= 9) {
        lastPages = [7, 8, 9];
      } else {
        for (let i = total_pages; i > headPages[2]; i--) {
          lastPages.push(i);
        }
        lastPages.sort(function (a, b) {
          return a - b;
        });
      }
    } else if (total_pages - 2 <= activeKey && activeKey <= total_pages) {
      for (let i = total_pages - 3; i >= 1; i--) {
        if (headPages.length >= 3) {
          break;
        }
        headPages.push(i);
      }
      headPages.sort(function (a, b) {
        return a - b;
      });
      for (let i = total_pages; i > Number(headPages[2]); i--) {
        if (lastPages.length >= 3) {
          break;
        }
        lastPages.push(i);
      }
      lastPages.sort(function (a, b) {
        return a - b;
      });
    } else {
      headPages = [activeKey - 1, activeKey, activeKey + 1];
      if (activeKey + 7 <= total_pages) {
        lastPages = [activeKey + 4, activeKey + 5, activeKey + 6];
      } else {
        for (let i = total_pages; i > Number(headPages[2]); i--) {
          if (lastPages.length >= 3) {
            break;
          }
          lastPages.push(i);
        }
        lastPages.sort(function (a, b) {
          return a - b;
        });
      }
    }

    return (
      <Fragment>
        <ul className="pagination justify-content-center">
          <li
            className={`page-item${activeKey === 1 ? " disabled" : ""}`}
            onClick={() => clickPage(1)}
          >
            <a className="page-link" aria-label="First">
              <i
                className={`fas fa-angle-double-left fs-12`}
                aria-hidden="true"
              />
              <span className={`sr-only`} aria-hidden="true">
                First
              </span>
            </a>
          </li>
          <li
            className={`page-item${activeKey === 1 ? " disabled" : ""}`}
            onClick={() => clickPage(activeKey - 1)}
          >
            <a className="page-link" aria-label="Previous">
              <i className={`fas fa-angle-left fs-12`} aria-hidden="true" />
              <span className={`sr-only`} aria-hidden="true">
                Prev
              </span>
            </a>
          </li>

          {headPages.map((page, Idx) => (
            <li
              key={Idx}
              className={`page-item${page === activeKey ? " active" : ""}`}
              onClick={() => clickPage(page)}
            >
              <a
                key={Idx}
                className={`page-link${
                  page === activeKey ? " bg-movie-green border-movie-green" : ""
                }`}
              >
                {page}
              </a>
            </li>
          ))}

          {(lastPages.length > 0 && lastPages[0] - headPages[2]) > 1 ? (
            <li className={`page-item`}>
              <a className="page-link page-dot">...</a>
            </li>
          ) : null}

          {lastPages.map((page, Idx) => (
            <li
              key={Idx}
              className={`page-item${page === activeKey ? " active" : ""}`}
              onClick={(e) => clickPage(page)}
            >
              <a
                className={`page-link${
                  page === activeKey ? " bg-movie-green border-movie-green" : ""
                }`}
              >
                {page}
              </a>
            </li>
          ))}

          <li
            className={`page-item${
              activeKey === total_pages ? " disabled" : ""
            }`}
            onClick={() => clickPage(activeKey + 1)}
          >
            <a className="page-link" aria-label="Next">
              <i className={`fas fa-angle-right fs-12`} aria-hidden="true" />
              <span className={`sr-only`} aria-hidden="true">
                Next
              </span>
            </a>
          </li>
          <li
            className={`page-item${
              activeKey === total_pages ? " disabled" : ""
            }`}
            onClick={() => clickPage(total_pages)}
          >
            <a className="page-link" aria-label="First">
              <i
                className={`fas fa-angle-double-right fs-12`}
                aria-hidden="true"
              />
              <span className={`sr-only`} aria-hidden="true">
                Last
              </span>
            </a>
          </li>
        </ul>
      </Fragment>
    );
  };

  const renderNormalPage = () => {
    const smallPages = [];
    for (let i = 1; i <= total_pages; i++) {
      smallPages.push(i);
    }

    return (
      <Fragment>
        <ul className="pagination justify-content-center">
          <li
            className={`page-item${activeKey === 1 ? " disabled" : ""}`}
            onClick={() => clickPage(1)}
          >
            <a className="page-link" aria-label="First">
              <i
                className={`fas fa-angle-double-left fs-12`}
                aria-hidden="true"
              />
              <span className={`sr-only`} aria-hidden="true">
                First
              </span>
            </a>
          </li>
          <li
            className={`page-item${activeKey === 1 ? " disabled" : ""}`}
            onClick={() => clickPage(activeKey - 1)}
          >
            <a className="page-link" aria-label="Previous">
              <i className={`fas fa-angle-left fs-12`} aria-hidden="true" />
              <span className={`sr-only`} aria-hidden="true">
                Prev
              </span>
            </a>
          </li>

          {smallPages.map((page) => (
            <li
              key={page}
              className={`page-item${page === activeKey ? " active" : ""}`}
              onClick={() => clickPage(page)}
            >
              <a
                className={`page-link${
                  page === activeKey ? " bg-movie-green border-movie-green" : ""
                }`}
              >
                {page}
              </a>
            </li>
          ))}

          <li
            className={`page-item${
              activeKey === total_pages ? " disabled" : ""
            }`}
            onClick={() => clickPage(activeKey + 1)}
          >
            <a className="page-link" aria-label="Next">
              <i className={`fas fa-angle-right fs-12`} aria-hidden="true" />
              <span className={`sr-only`} aria-hidden="true">
                Next
              </span>
            </a>
          </li>
          <li
            className={`page-item${
              activeKey === total_pages ? " disabled" : ""
            }`}
            onClick={() => clickPage(total_pages)}
          >
            <a className="page-link" aria-label="First">
              <i
                className={`fas fa-angle-double-right fs-12`}
                aria-hidden="true"
              />
              <span className={`sr-only`} aria-hidden="true">
                Last
              </span>
            </a>
          </li>
        </ul>
      </Fragment>
    );
  };

  return (
    <nav aria-label="Page navigation">
      {total_pages > 6 ? renderAdvancedPage(activeKey) : renderNormalPage()}
    </nav>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  total_pages: PropTypes.number,
  total_results: PropTypes.number,
  onClickPage: PropTypes.func,
  type: PropTypes.string,
};

Pagination.defaultProps = {
  page: 0,
  total_pages: 0,
  total_results: 0,
  onClickPage: null,
  type: "movie",
};

export default React.memo(Pagination);
