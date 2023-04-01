import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MovieBookingForm from "../components/MovieBookingForm";
import './movieDetails.css'

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);


  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
        const data = await res.json();
        setMovieDetails(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleBookTicketClick = () => {
    setIsBookingOpen(true);
  };
  const handleMovieDetailClick = () => {
    setIsBookingOpen(false);
  };
  
  return (
    <>
    
<div className="movie-details-screen" >
<img className="bg-img" src = {movieDetails ? (movieDetails.image?movieDetails.image.original:''):""}/>

    {!isBookingOpen && movieDetails ? (
      <div>
  <div className="movie-details">
    <img src={movieDetails ? (movieDetails.image?movieDetails.image.medium:''):""} alt={movieDetails.name} />
    <div className="movie-desc">
    <h1 className="movie-name">{movieDetails.name}</h1>
    <span className="movie-rating">
  {movieDetails.rating.average && (
    <>
    <i className="fas fa-star" />     
             {movieDetails.rating.average}/10
        
    </>
  )}
</span>
      <div className="movie-info">
            <li><span className="movie-info-items">{movieDetails.language}</span></li>
            {movieDetails.genres.map(genre=><li><span className="movie-info-items">{genre}</span></li>)}
            <li><span className="movie-info-items">{movieDetails.runtime}min</span></li>
   </div>      
      <button className="book-btn" onClick={handleBookTicketClick}>Book Ticket</button>
      </div>
      
  </div>
  <div className="movie-about">
  <h2 className="movie-about-text">About the movie</h2>
  <p className="movie-summary">{movieDetails.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
  </div>
  </div>
) : null}

    </div>
  
    <div className="form-details" style={{ position: "relative" }}>
    <div className="form-component">
    {isBookingOpen ? (
        <MovieBookingForm
          movie={movieDetails}
        />
      ) : null}
      </div>
      <div className="toggle-btn">
    {isBookingOpen?<button className="movie-detail-btn" onClick = {handleMovieDetailClick}><i class="fa fa-times" aria-hidden="true"></i></button>:""}
    </div>
    </div>
    </>

  );
};

export default MovieDetails;
