import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  let [mov, setMov] = useState([]);

  const getMov = async () => {
    try {
      const res = await axios.get(
        "https://imdb.iamidiotareyoutoo.com/search?q=2"
      );

      if (res.data.ok) {
        setMov(res.data.description);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("error:" + error);
    }
  };

  useEffect(() => {
    getMov();
  }, []);

  return (
    <main>
      <h1>
        Welcome to <span>Faz Movies</span>!
      </h1>

      <h5>On our website you can find any movie <span>for yourself</span>...</h5>

      <div className="afisha">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoSvPe3DwmT7n0wk4JlCacVNUgnEkgTMmUMg&s"
          alt="afisha-logo"
        />
        <h6>Afisha.uz</h6>
        <p>
          <span>Enjoyed the movie?</span> What are you waiting for? <br /> Click
          the link below right now and <span>buy a ticket</span> <br /> for a
          convenient time and theater! <br />{" "}
          <a target="_blank" href="https://www.afisha.uz/">more details...</a>
        </p>
      </div>

      <div className="latest-movies">
        <h2>Latest movies:</h2>

        {mov.map((card, index) => (
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
        ))}
      </div>
    </main>
  );
}

export default Home;
