import React from 'react';

const StarRating = ({ rating }) => {
  const maxStars = 5;
  const roundedRating = Math.floor(rating);
  const decimalPart = rating - roundedRating;
  const filledStars = Math.floor(rating);
  const filledPercentage = decimalPart * 100;

  return (
    <>
      {Array.from({ length: maxStars }, (_, index) => (
        <span key={index} className='star'>
          {index < filledStars ? '★' : '☆'}
        </span>
      ))}
      {decimalPart > 0 && (
        <span style={{ width: `${filledPercentage}%` }} className="star-fraction" />
      )}
    </>
  );
};

export default StarRating;