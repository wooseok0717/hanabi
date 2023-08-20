import React, {useState, useEffect} from 'react';
import {capitalize} from './helperfn';
import x from '../../dist/assets/x.png';
import axios from 'axios';
import RatingInstruction from './RatingInstruction.jsx';

export default function RatingModal ({item, closeModal, totalStars=5, getReviews, getRecipes}) {

  const [initialRating, setInitialRating] = useState(localStorage[item.name + ' rating']);
  const [rating, setRating] = useState(initialRating);
  const [initialReview, setInitialReview] = useState('');
  const [reviewInput, setReviewInput] = useState('');
  const [ratingIns, setRatingIns] = useState(localStorage.ratingIns);

  useEffect(() => {
    if (localStorage[item.name + ' review'] !== undefined) {
      setInitialReview(localStorage[item.name + ' review']);
    }
  },[]);

  useEffect(() => {
    setReviewInput(initialReview);
  },[initialReview]);

  const handleStarClick = (clickedRating) => {
    setRating(clickedRating);
  };

  const handleSubmit = () => {
    if (rating === undefined) {
      alert('Please give me your rating');
    } else if ((initialRating === rating) && (initialReview === reviewInput)) {
      closeModal();
    } else if (localStorage[item.name+' review_id'] === undefined) {
      axios.post('/api/ratings', {
        rating, reviewInput, id: item.id
      })
      .then(({data}) => {
        localStorage.setItem(item.name+' review_id', data.id);
        localStorage.setItem(item.name+' rating', rating);
        localStorage.setItem(item.name+' review', reviewInput);
        getReviews();
        closeModal();
        getRecipes();
      });
      // });
    } else {
      axios.put(`/api/ratings/?id=${localStorage[item.name+' review_id']}&rating=${rating}&review=${reviewInput}`)
      .then(({data}) => {
        localStorage.setItem(item.name+' rating', rating);
        localStorage.setItem(item.name+' review', reviewInput);
        getReviews();
        closeModal();
        getRecipes();
      });
    }
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
          <div>
            Give a Review
            <input placeholder='(optional)' value={reviewInput} onChange={e => setReviewInput(e.target.value)}/>
          </div>
        </div>
        <div className='modal-footer'>
          <span onClick={() => handleSubmit()}>{initialRating ? 'Update': 'Submit'}</span>
        </div>
      </div>
    </div>
  )
}