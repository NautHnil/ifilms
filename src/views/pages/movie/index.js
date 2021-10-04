import React from "react";
import { SetMetaWeb } from "../../components/common/setMetaWeb";
import MovieContextProvider from "../../../contexts/movieContext";
import MoviePopular from "../../components/movie/moviePopular";

function Movie() {
  return (
    <MovieContextProvider>
      <section className={`pt-30 pb-50`}>
        {SetMetaWeb("The MovieDB", true)}

        <MoviePopular />
      </section>
    </MovieContextProvider>
  );
}

export default Movie;
