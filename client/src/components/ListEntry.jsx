import React, {useState, useEffect} from 'react';
import {capitalize} from './helperfn';
import SpicyLevel from './SpicyLevel.jsx';
import StarRating from './StarRating.jsx';
import MenuDetails from './MenuDetails.jsx';
import Ratings from './Ratings.jsx';
import {getAverageRating, getRatingCount } from './helperfn';
import axios from 'axios';

export default function ListEntry ({menu, favorites, setFavorites, getRecipes}) {

  const [showDetails, setShowDetails] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [currentMenu, setCurrentMenu] = useState(menu);
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    setRating(getAverageRating(currentMenu.ratings));
    setRatingCount(getRatingCount(currentMenu.ratings));
  },[currentMenu]);

  const updateCurrentMenu = () => {
    axios.get(`api/recipe/?id=${menu.id}`)
    .then(({data}) => setCurrentMenu(data));
  };

  return (
    <div className='menu-container'>
      <div className='menu-label'>
        <div className='menu-name'>
          {favorites.includes(currentMenu.id) && <span className='heart'>♥</span>}{capitalize(currentMenu.name)}  <span className='e-selected'>{currentMenu.price ? (<>{'$' + currentMenu.price}</>) : 'Market Price'}</span>
        </div>
        <div>
          <StarRating rating={menu.avg_rating} count={menu.rating_count}/>
          <SpicyLevel level={currentMenu.spicy} />
          <div className='icon-container'>
            {(menu.all_ingredients.some(x => JSON.parse(localStorage.allergies)[x])) && <div className='allergy-icon icon'>!</div>}
            {currentMenu.one_order && <div className='one-icon icon'>1</div>}
            {currentMenu.dinner && <div className='d-icon icon'>D</div>}
            {currentMenu.raw && <div className='r-icon icon'>R</div>}
            {currentMenu.handroll && <div className='h-icon icon'>H</div>}
            {currentMenu.alacarte && <div className='a-icon icon'>A</div>}
          </div>
        </div>
        {showDetails && <MenuDetails closeModal={() => setShowDetails(false)} item={currentMenu} ratingCount={ratingCount} setFavorites={setFavorites} getRecipes={getRecipes} updateCurrentMenu={updateCurrentMenu}/>}
        {showRating && <Ratings closeModal={() => setShowRating(false)} item={currentMenu} updateCurrentMenu={updateCurrentMenu} getRecipes={getRecipes}/>}
      </div>
      <div className='menu-buttons'>
        <span onClick={() => setShowRating(true)}>Reviews</span>
        <span onClick={() => setShowDetails(true)}>Details</span>
      </div>
    </div>
  )
}