import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ListEntry from './ListEntry.jsx';
import {capitalize} from './helperfn';

export default function TypeList ({type}) {

  const [currentList, setCurrentList] = useState([]);

  useEffect(() => {
    axios.get(`api/recipesWithType/?id=${type.id}`)
    .then(({data}) => {
      setCurrentList(data);
      console.log(data);
    });
  },[]);

  return (
    <div>
      <div className='list-type'>{capitalize(type.name)}</div>
      {currentList.map(menu => (
        <ListEntry menu={menu}/>
      ))}
    </div>
  )
}