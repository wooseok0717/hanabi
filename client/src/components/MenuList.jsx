import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TypeList from './TypeList.jsx';
import SortingSelector from './SortingSelector.jsx';

export default function MenuList ({ayce, favorites, setFavorites}) {

  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState('');
  const [currentSort, setCurrentSort] = useState('name-asc');

  useEffect(() => {
    if (ayce) {
      axios.get('api/types')
      .then(({data}) => {
        setTypes(data);
      });
    } else {
      axios.get('api/types/ala')
      .then(({data}) => {
        setTypes(data);
      })
    }
  },[ayce])

  return (
    <>
      <div>
        {types.map(t => (<TypeList key={t.id} type={t} currentType={currentType} setCurrentType={setCurrentType} favorites={favorites} setFavorites={setFavorites} currentSort={currentSort} setCurrentSort={setCurrentSort}/>))}
      </div>
    </>
  )
}