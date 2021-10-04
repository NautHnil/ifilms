import React from "react";
import { useParams } from "react-router-dom";
import CollectionContextProvider from "../../../contexts/collectionContext";
import MovieContextProvider from "../../../contexts/movieContext";
import MovieDetailComponent from "../../components/movie/movieDetail";

function MovieDetail() {
  const { id } = useParams();
  let arr = id.split("-");

  return (
    <MovieContextProvider>
      <CollectionContextProvider>
        <section className="pb-50">
          <MovieDetailComponent id={Number(arr[0])} />
        </section>
      </CollectionContextProvider>
    </MovieContextProvider>
  );
}

export default MovieDetail;
