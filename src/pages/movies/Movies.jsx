import React, { useEffect, useState, useCallback } from "react";
import "./Movies.css";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

function Movies() {
  const [loader, setLoader] = useState(false);
  const [searched, setSearched] = useState("Home Alone");
  const [mov, setMov] = useState([]);

  const debouncedSearch = useDebounce(searched, 500);

  const searchFunc = useCallback(async () => {
    if (!debouncedSearch.trim()) {
      setMov([]);
      return;
    }

    setLoader(true);

    try {
      const res = await axios.get(
        `https://imdb.iamidiotareyoutoo.com/search?q=${debouncedSearch}`
      );

      if (res.data.ok) {
        setMov(res.data.description || []);
      } else {
        toast.error("ooops... Error, pls, try again later");
      }
    } catch (error) {
      toast.error("ooops... Error: " + error);
      console.log("error: " + error);
    } finally {
      setLoader(false);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    searchFunc();
  }, [debouncedSearch, searchFunc]);

  return (
    <>
      <Toaster position="top-right" />
      <div className="movies-page">
        <h1>Find the perfect movie for yourself</h1>
        <input
          placeholder="movie name..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
          type="search"
          name="mov-search"
        />

        <div className="s-movies">
          {!loader ? (
            mov.length === 0 ? (
              <h5 style={{ color: "#fff" }}>Look for some movie</h5>
            ) : (
              mov.map((card, index) => (
              <Link to={`/movies/${card["#IMDB_ID"]}`}>
                <div className="movie-card" key={index}>
                  <img src={card["#IMG_POSTER"]} alt={card["#TITLE"]} />
                  <div className="movie-info">
                    <h3>{card["#TITLE"]}</h3>
                    <div className="mov-desc">
                      <p>Year: {card["#YEAR"]}</p>
                      <p>Rank: {card["#RANK"]}</p>
                    </div>
                  </div>
                </div>
              </Link>
              ))
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
}

export default Movies;
