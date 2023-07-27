import React, {useState} from 'react';
import {capitalize} from './helperfn';
import SpicyLevel from './SpicyLevel.jsx';
import StarRating from './StarRating.jsx';
import MenuDetails from './MenuDetails.jsx';

export default function ListEntry ({menu}) {

  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='menu-container'>
      <div className='menu-label'>
        <div className='menu-name'>
          {capitalize(menu.name)}  <span className='e-selected'>${menu.price}</span>
        </div>
        <div>
          <StarRating rating={4} />
          <SpicyLevel level={menu.spicy} />
          <div className='icon-container'>
            {menu.one_order && <div className='one-icon icon'>1</div>}
            {menu.dinner && <div className='d-icon icon'>D</div>}
            {menu.raw && <div className='r-icon icon'>R</div>}
            {menu.handroll && <div className='h-icon icon'>H</div>}
            {menu.alacarte && <div className='a-icon icon'>A</div>}
          </div>
        </div>
        {showDetails && <MenuDetails closeModal={() => setShowDetails(false)} item={menu}/>}
      </div>
      <div className='menu-buttons'>
        <span>Rate</span>
        <span onClick={() => setShowDetails(true)}>Details</span>
      </div>
    </div>
  )
}