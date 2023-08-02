import React from 'react';
import x from '../../dist/assets/x.png';

export default function RatingInstruction ({closeModal}) {

  const handleRemoveInfo = () => {
    localStorage.setItem('ratingIns', true);
    closeModal();
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='close-button'>
            <img src={x} onClick={closeModal}/>
          </div>
          <h3>Before you rate any menu...</h3>
        </div>
        <div className='modal-body'>
          <div className='instruction-container'>
            <div>
              Prior to providing a rating for any items on our menu, we wish to assure you that your feedback remains entirely anonymous.
            </div>
            <div>
              Our management team is not directly engaged with the rating process, ensuring your privacy.
            </div>
            <div>
              Our service may exhibit variations on a day-to-day basis, and we are committed to maintaining a high standard.
            </div>
            <div>
              We kindly request that your evaluation of the menu be distinct from your assessment of our service.
            </div>
            <div>
              We value your candid opinion about the menu, as it will serve as a valuable resource for fellow patrons in making informed selections.
            </div>
            <div>
              Your honest input is greatly appreciated in aiding others in their decision-making process.
            </div>
            <div>
              Thank you for your cooperation and understanding.
            </div>
          </div>
        </div>
        <div className='modal-footer'>
          <span onClick={handleRemoveInfo} className='do-not-show-btn'>Do not show this message again</span>
        </div>
      </div>
    </div>
  )
}