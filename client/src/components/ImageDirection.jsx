import React from 'react';
import x from '../../dist/assets/x.png';

export default function ImageDirection ({closeModal}) {

  const handleRemoveInfo = () => {
    localStorage.setItem('readInfo', true);
    closeModal();
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='close-button'>
            <img src={x} onClick={closeModal}/>
          </div>
          <h3>Before you upload images...</h3>
        </div>
        <div className='modal-body'>
          <div className='instruction-container'>
            <div>
              Prior to uploading any images, kindly note that the images you upload will not be immediately displayed on the webpage.
            </div>
            <div>
              Our management team will review the uploaded images before deciding whether to showcase them on our menu website.
            </div>
            <div>
              Please understand that the display of the images is not guaranteed.
            </div>
            <div>
              It's important to emphasize that this feature is entirely voluntary, and we sincerely appreciate your willingness to contribute.
            </div>
            <div>
              By sharing images, you are helping other customers to see what the items look like.
            </div>
            <div>
              However, please be aware that the final decision to display the images rests with the management team.
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