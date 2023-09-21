import React, {useState} from 'react';
import x from '../../dist/assets/x.png';
import alaFront from '../../../assets/Alacarte1.jpeg';
import alaBack from '../../../assets/Alacarte2.jpeg';
import ayceFront from '../../../assets/Ayce1.jpeg';
import ayceBack from '../../../assets/Ayce2.jpeg';

export default function MenuCopy({closeModal}) {

  const [currentPage, setCurrentPage] = useState(0);
  const pages = [alaFront, alaBack, ayceFront, ayceBack];

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close-button'>
          <img src={x} onClick={closeModal} />
        </div>
        <div className='modal-body menu-body'>
          <img src={pages[currentPage]}/>
        </div>
        <div className='modal-footer instruction-footer'>
          {(currentPage > 0) && <span className='button-like-span' onClick={() => setCurrentPage(x => x - 1)}>Prev</span>}
          {(currentPage < pages.length - 1) ? <span className='button-like-span instruction-next-button' onClick={() => setCurrentPage(x => x + 1)}>{`${currentPage + 1}/${pages.length} `}Next{' >'}</span> : <span className='button-like-span instruction-close-button' onClick={closeModal}>{`${pages.length}/${pages.length} `}Close</span>}
        </div>
      </div>
    </div>
  )
}