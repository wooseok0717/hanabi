import React, {useState, useEffect} from 'react';
import RatingModal from './RatingModal.jsx';
import {capitalize} from './helperfn';
import x from '../../dist/assets/x.png';
import axios from 'axios';
import ReviewEntry from './ReviewEntry.jsx';

export default function Ratings({closeModal, item, updateCurrentMenu}) {

  const [ratingModal, setRatingModal] = useState(false);
  const [reviewList, setReviewList] = useState([]);

  useEffect(()=> {
    getReviews();
  },[]);

  const getReviews = () => {
    axios.get(`/api/ratings/?id=${item.id}`)
    .then(({data}) => setReviewList(data));
  };

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='close-button'>
            <img src={x} onClick={closeModal}/>
          </div>
          <h3 className='detail-title'>
            Reviews for "{capitalize(item.name)}"
          </h3>
        </div>
        <div className='modal-body'>
          {reviewList.length ? reviewList.map(review => (
            <ReviewEntry review={review} key={review.id} getReviews={getReviews}/>
          )) : 'THERE ARE NO REVIEW WRITEN FOR THIS MENU'}
          {ratingModal && <RatingModal item={item} closeModal={() => setRatingModal(false)} getReviews={getReviews}/>}
        </div>
        <div className='modal-footer'>
          <span className='button-like-span' onClick={() => setRatingModal(true)}>Add your rating & review</span>
        </div>
      </div>
    </div>
  )
}