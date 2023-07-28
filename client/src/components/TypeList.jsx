import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ListEntry from './ListEntry.jsx';
import {capitalize} from './helperfn';

export default function TypeList ({type, currentType, setCurrentType}) {

  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    axios.get(`api/recipesWithType/?id=${type.id}`)
    .then(({data}) => {
      setCurrentList(data);
    });
  },[]);

  const handleSelection = (name) => {
    if (currentType === type.name) {
      setCurrentType('');
    } else {
      setCurrentType(name);
    }
  }

  return (
    <div>
      <div className='list-type' onClick={() => handleSelection(type.name)}>{capitalize(type.name)}</div>
      {(currentType === type.name) && currentList.map(menu => (
        <ListEntry key={menu.id} menu={menu}/>
      ))}
    </div>
  )
}