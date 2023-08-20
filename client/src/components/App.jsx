import React, {useState} from 'react';
import Header from './Header.jsx';
import AllergyModal from './AllergyModal.jsx';
import MenuList from './MenuList.jsx';
import MenuHelper from './MenuHelper.jsx';
import SearchModal from './SearchModal.jsx';
import Favorites from './Favorites.jsx';
import AppInstruction from './AppInstruction.jsx';

export default function App() {

  if (localStorage.refresh1 === undefined) {
    localStorage.clear();
    localStorage.setItem('refresh1', 'done');
  }

  if (localStorage.allergies === undefined) {
    localStorage.setItem('allergies', JSON.stringify({}));
  }

  if (localStorage.favorites === undefined) {
    localStorage.setItem('favorites', JSON.stringify([]));
  }

  const [allergies, setAllergies] = useState(false);
  const [displayHelper, setDisplayHelper] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [displayFav, setDisplayFav] = useState(false);
  const [ayce, setAyce] = useState(true);
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.favorites));
  const [appInstruction, setAppInstruction] = useState(localStorage.appInstruction);

  const handleAyce = (input) => {
    setAyce(input)
  };

  return (

    <>
      {!appInstruction && <AppInstruction closeModal={() => setAppInstruction(true)}/>}
      <div className='instruction-btn-conatiner'>
        <span className='button-like-span' onClick={() => setAppInstruction(false)}>Instructions</span>
      </div>
      <Header />
      <div className='price-tag'>
        <div>Lunch $26.95</div>
        <div>Dinner $33.95</div>
      </div>
      <div className='allergies' onClick={() => setAllergies(true)}>Set your allergies</div>
      {allergies && (<AllergyModal closeModal={() => setAllergies(false)}/>)}
      <div className='helper'>
        <span className='button-like-span' onClick={() => setDisplaySearch(true)}>Search</span>
        {displaySearch && <SearchModal closeModal={() => setDisplaySearch(false)} favorites={favorites} setFavorites={setFavorites}/>}
        <span className='button-like-span' onClick={() => setDisplayFav(true)}>My Favorites</span>
        {displayFav && <Favorites closeModal={() => setDisplayFav(false)} favorites={favorites} setFavorites={setFavorites}/>}
        <button className='question-icon' onClick={() => setDisplayHelper(true)}>?</button>
        {displayHelper && <MenuHelper closeModal={() => setDisplayHelper(false)}/>}
      </div>
      <div className='ayce-selector'>
        <div
          onClick={() => handleAyce(true)}
          className={ayce ? 'current-selected' : ''}
        >
          AYCE
        </div>
        <div
          onClick={() => handleAyce(false)}
          className={!ayce ? 'current-selected' : ''}
        >
          A LA CARTE
        </div>
      </div>
      <MenuList ayce={ayce} favorites={favorites} setFavorites={setFavorites}/>
    </>
  )
}