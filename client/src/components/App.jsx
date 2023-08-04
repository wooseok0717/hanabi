import React, {useState} from 'react';
import Header from './Header.jsx';
import AllergyModal from './AllergyModal.jsx';
import MenuList from './MenuList.jsx';
import MenuHelper from './MenuHelper.jsx';
import SearchModal from './SearchModal.jsx';

export default function App() {

  const [allergies, setAllergies] = useState(false);
  const [displayHelper, setDisplayHelper] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);

  return (

    <>
      <Header />
      <div className='allergies' onClick={() => setAllergies(true)}>Set your allergies</div>
      {allergies && (<AllergyModal closeModal={() => setAllergies(false)}/>)}
      <div className='helper'>
        <span className='search-icon' onClick={() => setDisplaySearch(true)}>Search</span>
        {displaySearch && <SearchModal closeModal={() => setDisplaySearch(false)}/>}
        <button className='question-icon' onClick={() => setDisplayHelper(true)}>?</button>
        {displayHelper && <MenuHelper closeModal={() => setDisplayHelper(false)}/>}
      </div>
      <MenuList />
    </>
  )
}