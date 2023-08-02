import React, {useState} from 'react';
import {capitalize} from './helperfn';
import x from '../../dist/assets/x.png';
import axios from 'axios';
import RatingInstruction from './RatingInstruction.jsx';

export default function RatingModal ({item, closeModal, totalStars=5, updateCurrentMenu}) {

  const [initialRating, setInitialRating] = useState(localStorage[item.name + ' rating']);
  const [rating, setRating] = useState(initialRating);
  const [ratingIns, setRatingIns] = useState(localStorage.ratingIns);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const handleSubmit = () => {
    if (rating === undefined) {
      alert('Please give me your rating');
    } else if (initialRating === rating) {
      closeModal();
    } else {
      axios.put(`/api/rating/?id=${item.id}&prev=${initialRating}&new=${rating}`)
      .then(({data}) => {
        updateCurrentMenu();
        closeModal();
      });
    }
    localStorage.setItem(item.name+' rating', rating);
  }

  return (
    <div className='modal rating-modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='close-button'>
            <img src={x} onClick={closeModal}/>
          </div>
          <h3 className='detail-title'>{`Rate "${capitalize(item.name)}"?`}</h3>
        </div>
        <div className='modal-body'>
          {!ratingIns && <RatingInstruction closeModal={() => setRatingIns(true)} />}
          <div>
            {[...Array(totalStars)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={starValue}
                  style={{ cursor: 'pointer', fontSize: '6rem' }}
                  onClick={() => handleStarClick(starValue)}
                >
                  {starValue <= rating ? '\u2605' : '\u2606'}
                </span>
              );
            })}
          </div>
        </div>
        <div className='modal-footer'>
          <span onClick={() => handleSubmit()}>{initialRating ? 'Update': 'Submit'}</span>
        </div>
      </div>
    </div>
  )
}