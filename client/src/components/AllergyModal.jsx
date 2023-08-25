import React, {useState, useEffect} from 'react';
import axios from 'axios';
import IngredientEntry from './IngredientEntry.jsx';

export default function AllergyModal ({closeModal}) {

  const storageList = [];

  const [ingredients, setIngredients] = useState([]);
  const [selectedList, setSelectedList] = useState(storageList);

  const fetchIngredient = () => {
    axios.get('/api/ingredients')
    .then(({data}) => setIngredients(data.map(x => x.name)))
  }

  useEffect(() => {
    for (let key in JSON.parse(localStorage.allergies)) {
      storageList.push(key);
    }
  },[]);

  useEffect(() => {
    fetchIngredient();
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