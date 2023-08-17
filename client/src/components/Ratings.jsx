import React, {useState} from 'react';
import RatingModal from './RatingModal.jsx';
import {capitalize} from './helperfn';
import x from '../../dist/assets/x.png';

export default function Ratings({closeModal, item, updateCurrentMenu}) {

  const [ratingModal, setRatingModal] = useState(false);

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
          LIST
          LIST
          LIST
          {ratingModal && <RatingModal item={item} closeModal={() => setRatingModal(false)} updateCurrentMenu={updateCurrentMenu}/>}
        </div>
        <div className='modal-footer'>
          <span className='button-like-span' onClick={() => setRatingModal(true)}>Add your rating & review</span>
        </div>
      </div>
    </div>
  )
}