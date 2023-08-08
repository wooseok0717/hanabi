import React from 'react';
import x from '../../dist/assets/x.png'

export default function MenuHelper ({closeModal}) {

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close-button'>
          <img src={x} onClick={closeModal}/>
        </div>
        <div className='modal-header'><h3>Description</h3></div>
        <div className='modal-body'>
          <div className='desc-container'>
            <div className='one-icon icon'>1</div>
            You can only order 1 per person
          </div>
          <div className='desc-container'>
            <div className='d-icon icon'>D</div>
            Need to pay dinner price
          </div>
          <div className='desc-container'>
            <div className='r-icon icon'>R</div>
            Contains Raw ingredients
          </div>
          <div className='desc-container'>
            <div className='h-icon icon'>H</div>
            You can get it as Handroll
          </div>
          <div className='desc-container'>
            <div className='a-icon icon'>A</div>
            A La Carte only
          </div>
          <div className='desc-container'>
            <div className='allergy-icon icon'>!</div>
            Contains ingredients that you're allergic to
          </div>
          <div className='desc-container'>
            <div className='star'>★ </div>
            Ratings
          </div>
          <div className='desc-container'>
            <div>🌶️</div>
            Spicy level
          </div>
        </div>
      </div>
    </div>
  )
}