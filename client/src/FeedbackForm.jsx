import React, { useState } from 'react';
import axios from 'axios';
import './FeedbackForm.css'; // Import CSS file

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post('http://127.0.0.1:3002/feedback', { rating, feedback });
      if (result.status === 201) {
        setSubmitted(true);
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during submission:', err);
      alert('Network Error: ' + err.message);
    }
  };

  return (
    <div className="feedback-form">
      <h1>Food Rating</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label className="label">Rating:</label>
            <select value={rating} onChange={handleRatingChange} className="input-field">
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="form-group">
            <label className="label">Feedback:</label>
            <textarea value={feedback} onChange={handleFeedbackChange} className="input-field" />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      ) : (
        <div className="success-message">
          <p>Thank you for your feedback!</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
