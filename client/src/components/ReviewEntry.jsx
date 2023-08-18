import React, { useState, useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import parseISO from 'date-fns/parseISO';
import StarRating from './StarRating.jsx';
import axios from 'axios';

export default function ReviewEntry ({review, getReviews}) {

  const handleHelpful = () => {
    if (localStorage[review.id+' helpful']) {
      // decrement
      axios.put(`/api/helpful/?id=${review.id}&update=decrement`)
      .then(({data}) => {
        localStorage.removeItem(review.id+' helpful');
        getReviews();
      });
    } else {
      // increment
      axios.put(`/api/helpful/?id=${review.id}&update=increment`)
      .then(({data}) => {
        localStorage.setItem(review.id+' helpful', true);
        getReviews();
      });
    }
  }

  const handleReport = () => {
    axios.put(`/api/review/report/?id=${review.id}`)
    .then(({data}) => alert('Report has been submitted'));
  }

  if (!review.review) {
    return null;
  }

  return (
    <div className='review-entry'>
      <div className='review-label'>
        Anonymous
        <div>
          {formatDistanceToNow(parseISO(review.timestamp), { addSuffix: true })}
        </div>
      </div>
      {review.review}
      <div className='review-detail-container'>
        <div className='review-rating-container'>
          <StarRating rating={review.rating}/>
        </div>
        <div>
          <span className='button-like-span' onClick={handleHelpful}>{review.helpful} helpful</span>
          <span className='button-like-span' onClick={handleReport}>report</span>
        </div>
      </div>
    </div>
  )
}