import React, { useState, useEffect } from "react";
import "./Movie.css";
import { useParams } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";

function Movie() {
  let { tt } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`https://imdb.iamidiotareyoutoo.com/search?tt=${tt}`)
      .then((res) => res.json())
      .then((data) => setMovie(data))
      .catch((err) => console.log(err));
  }, [tt]);

  if (!movie) {
    return (
      <div className="loading">
        <Loader></Loader>
      </div>
    );
  }

  const review = movie.short.review;
  const extra = movie.short;

  function decodeHtml(text) {
    const div = document.createElement("div");
    div.innerHTML = text;
    return div.textContent;
  }

  return (
    <div className="movie-page">
      <Link to={"/movies"}>
        <button className="exit-btn">
          <IoIosCloseCircle />
        </button>
      </Link>
      <div className="movie-left">
        <img src={extra.image} alt={extra.name} />
        <div className="movie-top">
          <p>{movie.short.review?.dateCreated || "No date"}</p>
          <p>{movie.short.review?.author?.name || "Unknown author"}</p>
        </div>

        <a
          className="imdb-link"
          href={extra.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on IMDb
        </a>
      </div>
      <div className="movie-right">
        <h1>{decodeHtml(movie.short.alternateName || movie.short.name)}</h1>
        <h2>{extra.description}</h2>
        <div className="movie-bottom">
          <p>Type: {movie.short["@type"] || "Unknown"}</p>

          <p>
            Rating:{" "}
            {movie.short.review?.reviewRating?.ratingValue ?? "No rating"}
          </p>

          <p>Author: {movie.short.review?.author?.name ?? "Unknown author"}</p>

          <p>Date: {movie.short.review?.dateCreated ?? "No date"}</p>
        </div>

        <div className="movie-extra">
          <p>
            <strong>Duration:</strong>{" "}
            {extra.duration ||
              extra.runtime?.displayableProperty?.value?.plainText}
          </p>
          <p>
            <strong>Genres:</strong> {extra.genre?.join(", ")}
          </p>
          <p>
            <strong>Content Rating:</strong> {extra.contentRating}
          </p>
          <p>
            <strong>Release Date:</strong> {extra.datePublished}
          </p>
          <p>
            <strong>Aggregate Rating:</strong>{" "}
            {extra.aggregateRating?.ratingValue} /{" "}
            {extra.aggregateRating?.bestRating} (
            {extra.aggregateRating?.ratingCount} votes)
          </p>
          <p>
            <strong>Keywords:</strong> {extra.keywords}
          </p>
          {extra.trailer?.embedUrl && (
            <p>
              <a
                href={extra.trailer.embedUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch Trailer
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Movie;
