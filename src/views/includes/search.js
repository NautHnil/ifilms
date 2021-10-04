import _ from "lodash";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router";

const Search = () => {
  let history = useHistory();

  const [searchKey, setSearchKey] = useState("");
  const searchInput = useRef(null);

  const handleChangeSearchKey = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  };

  const handleSubmitSearchKey = (e) => {
    e.preventDefault();

    if (_.isEmpty(searchKey) && searchInput.current) {
      return searchInput.current.focus();
    }

    history.push(`/search?s=${searchKey}`);
    searchInput.current.value = "";
    setSearchKey("");
  };

  return (
    <form
      method={`GET`}
      className="form-inline my-2 my-lg-0"
      onSubmit={(e) => handleSubmitSearchKey(e)}
    >
      <input
        className="form-control mr-sm-2"
        type="text"
        name={"search"}
        placeholder="Search"
        aria-label="Search"
        ref={searchInput}
        onChange={(e) => handleChangeSearchKey(e)}
      />
      <button
        className="btn btn-outline-movie-green my-2 my-sm-0"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default Search;
