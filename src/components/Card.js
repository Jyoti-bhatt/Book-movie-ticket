import React, { useEffect, useState } from "react";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  
  const [data, setData] = useState([]);

  const getApi = async () => {
    try {
      const res = await fetch("https://api.tvmaze.com/search/shows?q=all");
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <>
        <div>
          {data.map((movie) => (
            <Link
              to={`/movie/${movie.show.id}`}
              style={{ textDecoration: "none", color: "white" }}
            >
              <div className="cards">
                <img
                  className="cards__img"
                  src={movie.show.image ? movie.show.image.medium : ""}
                />
                <div className="cards__overlay">
                  <div className="card__title">
                    {movie ? movie.show.name : ""}
                  </div>
                  <div className="card__runtime">
                    {movie ? movie.release_date : ""}
                    <span className="card__rating">
                      {movie.show.rating.average && (
                        <>
                          {movie.show.rating.average}
                          <i className="fas fa-star" style = {{color:"golden"}}/>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="card__description">
                    {movie.show.summary
                      ? movie.show.summary
                          .replace(/<\/?[^>]+(>|$)/g, "")
                          .slice(0, 118) + "..."
                      : ""}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
    </>
  );
};

export default Cards;
