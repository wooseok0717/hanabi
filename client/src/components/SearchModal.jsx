import React, {useState} from 'react';
import x from '../../dist/assets/x.png'
import axios from 'axios';
import ListEntry from './ListEntry.jsx';

export default function SearchModal ({closeModal, favorites, setFavorites}) {

  const [searchInput, setSearchInput] = useState('');
  const [searchOutput, setSearchOutput] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`/api/search/?input=${searchInput.toLowerCase()}`)
    .then(({data}) => setSearchOutput(data));
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close-button'>
          <img src={x} onClick={closeModal}/>
        </div>
        <div className='modal-header'>
          <h3>Search for a menu or ingredient</h3>
          <form onSubmit={handleSearch}>
            <input className='search-input' onChange={e => setSearchInput(e.target.value)}/>
            <span onClick={handleSearch}>Search</span>
          </form>
        </div>
        <div className='modal-body'>
          {searchOutput.map(menu => (
            <ListEntry key={menu.id} menu={menu} favorites={favorites} setFavorites={setFavorites}/>
          ))}
        </div>
      </div>
    </div>
  )

}