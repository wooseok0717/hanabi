import React, {useState, useEffect} from 'react';
import x from '../../dist/assets/x.png'
import axios from 'axios';
import ListEntry from './ListEntry.jsx';

export default function Favorites ({closeModal, favorites, setFavorites}) {

  const [list, setList] = useState([]);

  const getFavList = () => {
    const data = JSON.stringify(favorites);
    axios.get(`/api/favorites/?fav=${data}`)
    .then(({data}) => setList(data));
  }

  useEffect(() => {
    if (favorites.length) {
      getFavList();
    } else {
      setList([]);
    }
  },[favorites])

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close-button'>
          <img src={x} onClick={closeModal}/>
        </div>
        <div className='modal-header'>
          <h3>Your Favorites</h3>
        </div>
        <div className='modal-body'>
          {(list.length === 0) && `You don't have any favorites`}
          {list.map(menu => (
            <ListEntry key={menu.id} menu={menu} favorites={favorites} setFavorites={setFavorites}/>
          ))}
        </div>
      </div>
    </div>
  )

}