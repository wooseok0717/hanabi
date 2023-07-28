import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IngredientEntry from './IngredientEntry.jsx';

export default function AllergyModal ({closeModal}) {

  const storageList = [];
  useEffect(() => {
    for (let x = 0; x < localStorage.length; x++) {
      storageList.push(localStorage.key(x));
    }
  },[]);

  const [ingredients, setIngredients] = useState([]);
  const [selectedList, setSelectedList] = useState(storageList);

  useEffect(() => {
    axios.get('/api/ingredients')
    .then(({data}) => setIngredients(data.map(x => x.name)));
  },[])

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h3>Choose your allergy</h3>
          Allergy chosen: {selectedList.join(', ')}
        </div>
        <div className='modal-body entry-container'>
          {ingredients.map((i,ind) => (
            <IngredientEntry key={ind} item={i} selectedList={selectedList} setSelectedList={setSelectedList} />
          ))}
        </div>
        <div className='modal-footer'>
          <div onClick={closeModal}>Done</div>
        </div>
      </div>
    </div>
  )
}