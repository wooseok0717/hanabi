import React, {useState} from 'react';
import Header from './Header.jsx';
import AllergyModal from './AllergyModal.jsx';
import MenuList from './MenuList.jsx';
import MenuHelper from './MenuHelper.jsx';

export default function App() {

  const [allergies, setAllergies] = useState(false);
  const [displayHelper, setDisplayHelper] = useState(false);

  return (

    <>
      <Header />
      <div className='allergies' onClick={() => setAllergies(true)}>Set your allergies</div>
      {allergies && (<AllergyModal closeModal={() => setAllergies(false)}/>)}
      <div className='helper'>
        <button className='question-icon' onClick={() => setDisplayHelper(true)}>?</button>
        {displayHelper && <MenuHelper closeModal={() => setDisplayHelper(false)}/>}
      </div>
      <MenuList />
    </>
  )
}