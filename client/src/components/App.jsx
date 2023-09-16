import React, {useState, useEffect} from 'react';
import Header from './Header.jsx';
import AllergyModal from './AllergyModal.jsx';
import MenuList from './MenuList.jsx';
import MenuHelper from './MenuHelper.jsx';
import SearchModal from './SearchModal.jsx';
import Favorites from './Favorites.jsx';
import AppInstruction from './AppInstruction.jsx';
import axios from 'axios';

export default function App() {

  /*--------------------LOCAL STORAGE MANAGEMENT--------------------*/
  /*------CLEARING LOCAL STORAGE TO KEEP FEATURE UPDATED------*/
  if (localStorage.refresh1 === undefined) {
    localStorage.clear();
    localStorage.setItem('refresh1', 'done');
  }

  /*-------IF LOCAL STORAGE HAS UNDEFINED INTITIALIZE THEM-------*/
  if (localStorage.allergies === undefined) {
    localStorage.setItem('allergies', JSON.stringify({}));
  }

  if (localStorage.favorites === undefined) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }

  if (localStorage.myReviews === undefined) {
    localStorage.setItem('myReviews', JSON.stringify({}));
  /*---IF USER HAS WRITTEN REVIEW CHECK IF THEY ARE STILL IN THE DB---*/
  } else {
    let temp = JSON.parse(localStorage.myReviews);
    Object.keys(temp).forEach(x => {
      // Check if review still exists in the database
      axios.get(`/api/getReview/?id=${x}`)
      .then(({data}) => {
        // If review data doesn't exist anymore remove them from the db
        if (!data.length) {
          axios.get(`/api/recipe/?id=${temp[x]}`)
          .then(({data}) => {
            localStorage.removeItem(data.name+' review_id');
            localStorage.removeItem(data.name+' rating');
            localStorage.removeItem(data.name+' review');
            delete temp[x];
            localStorage.setItem('myReviews', JSON.stringify(temp));
          });
        }
      });
    });
  }

  /*-----------------STATES-----------------*/
  const [allergies, setAllergies] = useState(false);
  const [displayHelper, setDisplayHelper] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayFav, setDisplayFav] = useState(false);
  const [appInstruction, setAppInstruction] = useState(localStorage.appInstruction);
  const [ayce, setAyce] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.favorites));

  return (

    <>
      {/*-----IF USER HAVEN'T READ THE INSTRUCTION SHOW MODAL OF INSTRUCTION TO THE APP-----*/}
      {!appInstruction && <AppInstruction closeModal={() => setAppInstruction(true)}/>}
      <div className='instruction-btn-conatiner'>

        {/*------------BUTTON FOR USER TO INTERACT TO READ THE INSTRUCTION AGAIN------------*/}
        <span className='button-like-span' onClick={() => setAppInstruction(false)}>Instructions</span>

      </div>
      <Header />
      <div className='price-tag'>
        <div>Kid's Lunch $16.95</div>
        <div>Lunch $26.95</div>
      </div>
      <div className='price-tag'>
        <div>Kid's Dinner $21.95</div>
        <div>Dinner $33.95</div>
      </div>

      {/*----------------------FOR USER TO SET THEIR ALLERGIES----------------------*/}
      <div className='allergies' onClick={() => setAllergies(true)}>Set your allergies</div>
      {allergies && (<AllergyModal closeModal={() => setAllergies(false)}/>)}

      <div className='helper'>
        {/*-------------USER CAN CLICK THIS BUTTON TO USE SEARCH FEATURE-------------*/}
        <span className='button-like-span' onClick={() => setDisplaySearch(true)}>Search</span>
        {displaySearch && <SearchModal closeModal={() => setDisplaySearch(false)} favorites={favorites} setFavorites={setFavorites}/>}

        {/*-----------------USER CAN CLICK TO DISPLAY THEIR FAVORITES-----------------*/}
        <span className='button-like-span' onClick={() => setDisplayFav(true)}>My Favorites</span>
        {displayFav && <Favorites closeModal={() => setDisplayFav(false)} favorites={favorites} setFavorites={setFavorites}/>}

        {/*-------------------BUTTON FOR USER TO CHECK ICON LABELS-------------------*/}
        <button className='question-icon' onClick={() => setDisplayHelper(true)}>?</button>
        {displayHelper && <MenuHelper closeModal={() => setDisplayHelper(false)}/>}
      </div>
      <div className='ayce-selector'>
        <div
          onClick={() => setAyce(true)}
          className={ayce ? 'current-selected' : ''}
        >
          AYCE
        </div>
        <div
          onClick={() => setAyce(false)}
          className={!ayce ? 'current-selected' : ''}
        >
          A LA CARTE
        </div>
      </div>
      <MenuList ayce={ayce} favorites={favorites} setFavorites={setFavorites}/>
    </>
  )
}