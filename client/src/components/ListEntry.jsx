import React, {useState, useEffect} from 'react';
import {capitalize} from './helperfn';
import SpicyLevel from './SpicyLevel.jsx';
import StarRating from './StarRating.jsx';
import MenuDetails from './MenuDetails.jsx';
import RatingModal from './RatingModal.jsx';
import {getAverageRating} from './helperfn';
import axios from 'axios';

export default function ListEntry ({menu}) {

  const [showDetails, setShowDetails] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(menu);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    setRating(getAverageRating(currentMenu.ratings));
  },[currentMenu]);

  const updateCurrentMenu = () => {
    axios.get(`api/recipe/?id=${menu.id}`)
    .then(({data}) => setCurrentMenu(data));
  };

  return (
    <div className='menu-container'>
      <div className='menu-label'>
        <div className='menu-name'>
          {capitalize(currentMenu.name)}  <span className='e-selected'>{currentMenu.price ? (<>{'$' + currentMenu.price}</>) : 'Market Price'}</span>
        </div>
        <div>
          <StarRating rating={rating} />
          <SpicyLevel level={currentMenu.spicy} />
          <div className='icon-container'>
            {currentMenu.one_order && <div className='one-icon icon'>1</div>}
            {currentMenu.dinner && <div className='d-icon icon'>D</div>}
            {currentMenu.raw && <div className='r-icon icon'>R</div>}
            {currentMenu.handroll && <div className='h-icon icon'>H</div>}
            {currentMenu.alacarte && <div className='a-icon icon'>A</div>}
          </div>
        </div>
        {showDetails && <MenuDetails closeModal={() => setShowDetails(false)} item={currentMenu}/>}
        {showRating && <RatingModal closeModal={() => setShowRating(false)} item={currentMenu} updateCurrentMenu={updateCurrentMenu}/>}
      </div>
      <div className='menu-buttons'>
        <span onClick={() => setShowRating(true)}>Rate</span>
        <span onClick={() => setShowDetails(true)}>Details</span>
      </div>
    </div>
  )
}