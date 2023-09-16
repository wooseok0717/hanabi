import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ListEntry from './ListEntry.jsx';
import {capitalize, joinWithDash} from './helperfn';
import SortingSelector from './SortingSelector.jsx';

export default function TypeList ({type, currentType, setCurrentType, favorites, setFavorites, currentSort, setCurrentSort}) {

  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    getRecipes();
  },[currentSort]);

  const getRecipes = () => {
    axios.get(`api/recipesWithType/?id=${type.id}&sort=${currentSort}`)
    .then(({data}) => {
      setCurrentList(data);
    });
  }

  const handleSelection = (name) => {
    if (currentType === type.name) {
      setCurrentType('');
    } else {
      setCurrentType(name);
    }
  }

  useEffect(() => {
    if (currentType !== '') {
      scrollToSection(joinWithDash(currentType));
    }
  },[currentType])

  const scrollToSection = (className) => {
    const sections = document.getElementsByClassName(className);
    if (sections.length > 0) {
      sections[0].scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (type.name === 'lunch special') {
    return (
      <div>
        <div className={`list-type ${joinWithDash(type.name)}`} onClick={() => handleSelection(type.name)}>
          {type.ayce ?
          <span className='ala'>{capitalize(type.name)}</span> :
          <span className='ayce'>{capitalize(type.name)}</span>}
        </div>
        {(currentType === type.name) && (
          <>
            <div className='lunch-title'>Bento Lunch Special</div>
            <div className='details'>
              Served with miso soup, salad, rice (until 3PM)
            </div>
            <div className='details'>
              Any Choice of Two Entres Listed Below: ($12.95)
            </div>
            <div className='lunch-list'>
              <span>-Chicken Teriyaki</span>
              <span>-Beef Teriyaki</span>
              <span>-Salmon Teriyaki</span>
              <span>-Bulgogi</span>
              <span>-Chicken Katsu</span>
              <span>-Shrimp & Vege Tempura</span>
              <span>-California Roll(4pc)</span>
              <span>-Spicy Tuna Roll(4pc)</span>
              <span>-Spicy Crab Roll(4pc)</span>
              <span>-Shrimp Tempura Roll(4pc)</span>
            </div>
            <div className='lunch-title'>Sushi Lunch Special</div>
            <div className='details'>
              Served with Chef's choice of 6pcs sushi and miso soup (until 3PM)
            </div>
            <div className='details'>
              Choice of 1 roll Listed Below: ($16.95)
            </div>
            <div className='lunch-list'>
              <span>-California Roll</span>
              <span>-Philadelphia Roll</span>
              <span>-Tuna Roll</span>
              <span>-Shrimp Tempura Roll</span>
              <span>-Spicy Tuna Roll</span>
              <span>-Spicy Crab Roll</span>
              <span>-Jennifer Roll</span>
            </div>
          </>
        )}
      </div>
    )
  }
  // console.log(type);

  return (
    <div>
      <div className={`list-type ${joinWithDash(type.name)}`} onClick={() => handleSelection(type.name)}>
        {type.ayce ?
        <span className='ala'>{capitalize(type.name)}</span> :
        <span className='ayce'>{capitalize(type.name)}</span>}
      </div>
      {(currentType === type.name) && (<div className='details'>{type.details}</div>)}
      {(currentType === type.name) && (<SortingSelector currentSort={currentSort} setCurrentSort={setCurrentSort}/>)}
      {(currentType === type.name) && currentList.map(menu => (
        <ListEntry key={menu.id} menu={menu} favorites={favorites} setFavorites={setFavorites} getRecipes={getRecipes}/>
      ))}
    </div>
  )
}