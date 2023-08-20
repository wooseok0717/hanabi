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