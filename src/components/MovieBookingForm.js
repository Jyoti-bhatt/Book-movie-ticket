import React, { useState, useEffect } from "react";
import './MovieBookingForm.css'

const MovieBookingForm = ({ movie}) => {
  const [formData, setFormData] = useState({
    movieName: movie.name,
    movieId: movie.id,
    ticketQuantity: 1,
    email: "",
    phone: "",
    paymentMethod: "credit card",
  });
  useEffect(() => {
    const storedFormData = localStorage.getItem("movieBookingFormData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("movieBookingFormData", JSON.stringify(formData));
  };
 
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="book-form">
        <label  className = "form-label" htmlFor="movieName">Movie Name:</label>
        <input type="text" id="movieName" name="movieName" value={formData.movieName} disabled />
      </div>
      <div className="book-form">
        <label className = "form-label" htmlFor="ticketQuantity">Ticket Quantity:</label>
        <input type="number" id="ticketQuantity" name="ticketQuantity" min="1" value={formData.ticketQuantity} onChange={handleInputChange} />
      </div>
      <div className="book-form">
        <label className = "form-label" htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} />
      </div>
      <div className="book-form">
        <label className = "form-label" htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
      </div>
      <div className="book-form">
        <label className = "form-label" htmlFor="paymentMethod">Payment Method:</label>
        <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
          <option value="credit card">Credit Card</option>
          <option value="debit card">Debit Card</option>
          <option value="net banking">Net Banking</option>
          <option value="paypal">Paypal</option>
        </select>
      </div>
      <button type="submit">Book Ticket</button>
    </form>
  );
};

export default MovieBookingForm;
