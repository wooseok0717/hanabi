import React, {useState, useEffect} from 'react';
import {capitalize, getAverageRating,getRatingCount} from './helperfn';
import SpicyLevel from './SpicyLevel.jsx';
import StarRating from './StarRating.jsx';
import MenuHelper from './MenuHelper.jsx';
import Ratings from './Ratings.jsx';
import CloudinaryImageUpload from './CloudinaryImageUpload.jsx';
import x from '../../dist/assets/x.png';
import axios from 'axios';

export default function MenuDetails ({closeModal, item, ratingCount, setFavorites, getRecipes, updateCurrentMenu}) {

  const [allergies, setAllergies] = useState([]);
  const [filteredInside, setFilteredInside] = useState([]);
  const [filteredOutside, setFilteredOutside] = useState([]);
  const [filteredSauce, setFilteredSauce] = useState([]);
  const [displayHelper, setDisplayHelper] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [favorite, setFavorite] = useState(JSON.parse(localStorage.favorites).includes(item.id));
  const [showRating, setShowRating] = useState(false);

  const handleFavorite = () => {
    let currentStorage = new Set(JSON.parse(localStorage.favorites));
    if (currentStorage.has(item.id)) {
      currentStorage.delete(item.id);
      localStorage.setItem('favorites', JSON.stringify(Array.from(currentStorage)));
      setFavorite(false);
      setFavorites(Array.from(currentStorage));
      axios.put(`/api/favorite/?id=${item.id}&edit=decrement`)
      .then(({data}) => {
        if (getRecipes) {
          getRecipes();
        }
        if (updateCurrentMenu) {
          updateCurrentMenu();
        }
      });
    } else {
      currentStorage.add(item.id);
      localStorage.setItem('favorites', JSON.stringify(Array.from(currentStorage)));
      setFavorite(true);
      setFavorites(Array.from(currentStorage));
      axios.put(`/api/favorite/?id=${item.id}&edit=increment`)
      .then(({data}) => {
        if (getRecipes) {
          getRecipes();
        }
        if (updateCurrentMenu) {
          updateCurrentMenu();
        }
      });
    }
  }

  useEffect(() => {
    const all = [...item.inside, ...item.outside, ...item.sauce];
    setAllergies(all.filter(x => JSON.parse(localStorage.allergies)[x.name]).map(x => x.name));
    ;
  },[]);

  useEffect(() => {
    setFilteredInside(item.inside.filter(x => !allergies.includes(x.name)));
    setFilteredOutside(item.outside.filter(x => !allergies.includes(x.name)));
    setFilteredSauce(item.sauce.filter(x => !allergies.includes(x.name)));
  },[allergies])

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='close-button'>
            <img src={x} onClick={closeModal}/>
          </div>
          <h3 className='detail-title'><span className='heart'>{favorite ? '♥' : ''}</span>{capitalize(item.name)}</h3>
          <div className='helper'>
            <span className='button-like-span' onClick={handleFavorite}>{favorite ? 'Remove from Favorites':'Add to Favorites'}</span>
            <button className='question-icon' onClick={() => setDisplayHelper(true)}>?</button>
            {displayHelper && <MenuHelper closeModal={() => setDisplayHelper(false)}/>}
          </div>
          <div className='ratings-review'>
            <span className='button-like-span' onClick={() => setShowRating(true)}>Ratings & Review</span>
          </div>
          {showRating && <Ratings closeModal={() => setShowRating(false)} item={item} updateCurrentMenu={updateCurrentMenu} getRecipes={getRecipes}/>}
          <div>
            {item.price ? (<>{'$' + item.price}</>) : 'Market Price'}
          </div>
          <StarRating rating={item.avg_rating} count={item.rating_count}/>
          <SpicyLevel level={item.spicy} />
          <div>
            <div className='icon-container'>
              {(item.all_ingredients.some(x => JSON.parse(localStorage.allergies)[x])) && <div className='allergy-icon icon'>!</div>}
              {item.one_order && <div className='one-icon icon'>1</div>}
              {item.dinner && <div className='d-icon icon'>D</div>}
              {item.raw && <div className='r-icon icon'>R</div>}
              {item.handroll && <div className='h-icon icon'>H</div>}
              {item.alacarte && <div className='a-icon icon'>A</div>}
            </div>
          </div>
          <div>
            {item.favorite_count} person(s) added this item as their favorite.
          </div>
        </div>
        <div className='modal-body'>
          {item.img ? <img className='detail-img' src={item.img} /> : `This menu doesn't have a image set yet` }
          {<div className='img-upload-button' onClick={() => setImgModal(true)}>Contribute with your image?</div>}
          {imgModal && <CloudinaryImageUpload closeModal={() => setImgModal(false)} item={item}/>}
          <div className='ingre-container'>
            {item.inside.length ? (
              <div>
                Inside: <div className='e-selected'>{item.inside.map(x => capitalize(x.name)).join(', ')}</div>
              </div>
            ) : null}
            {item.outside.length ? (
              <div>
                Outside: <div className='e-selected'>{item.outside.map(x => capitalize(x.name)).join(', ')}</div>
              </div>
            ) : null}
            {item.sauce.length ? (
              <div>
                Sauce: <div className='e-selected'>{item.sauce.map(x => capitalize(x.name)).join(', ')}</div>
              </div>
            ) : null}
          </div>
          {allergies.length ? (
            <div>
              <div className='ingre-container'>
                Your allergy(s) in this menu:
                <div className='e-selected'>
                  {allergies.map(x => capitalize(x)).join(', ')}
                </div>
              </div>
              <div className='ingre-container'>
                Your order without these would be:
                {filteredInside.length ? (
                  <div>
                    Inside: <div className='e-selected'>{filteredInside.map(x => capitalize(x.name)).join(', ')}</div>
                  </div>
                ) : null}
                {filteredOutside.length ? (
                  <div>
                    Outside: <div className='e-selected'>{filteredOutside.map(x => capitalize(x.name)).join(', ')}</div>
                  </div>
                ) : null}
                {filteredSauce.length ? (
                  <div>
                    Sauce: <div className='e-selected'>{filteredSauce.map(x => capitalize(x.name)).join(', ')}</div>
                  </div>
                ) : null}
              </div>
            </div>
          ): null}
        </div>
      </div>
    </div>
  )
}