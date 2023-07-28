import React, {useState, useEffect} from 'react';
import {capitalize, getAverageRating} from './helperfn';
import SpicyLevel from './SpicyLevel.jsx';
import StarRating from './StarRating.jsx';
import MenuHelper from './MenuHelper.jsx';
import CloudinaryImageUpload from './CloudinaryImageUpload.jsx';
import x from '../../dist/assets/x.png';

export default function MenuDetails ({closeModal, item}) {

  const [allergies, setAllergies] = useState([]);
  const [filteredInside, setFilteredInside] = useState([]);
  const [filteredOutside, setFilteredOutside] = useState([]);
  const [filteredSauce, setFilteredSauce] = useState([]);
  const [displayHelper, setDisplayHelper] = useState(false);
  const [imgModal, setImgModal] = useState(false);

  useEffect(() => {
    const all = [...item.inside, ...item.outside, ...item.sauce];
    setAllergies(all.filter(x => localStorage[x.name]).map(x => x.name));
    ;
  },[]);

  useEffect(() => {
    setFilteredInside(item.inside.filter(x => !allergies.includes(x.name)));
    setFilteredOutside(item.outside.filter(x => !allergies.includes(x.name)));
    setFilteredSauce(item.sauce.filter(x => !allergies.includes(x.name)));
  },[allergies])

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='modal-header'>
          <div className='close-button'>
            <img src={x} onClick={closeModal}/>
          </div>
          <h3 className='detail-title'>{capitalize(item.name)}</h3>
          <div className='helper'>
            <button className='question-icon' onClick={() => setDisplayHelper(true)}>?</button>
            {displayHelper && <MenuHelper closeModal={() => setDisplayHelper(false)}/>}
          </div>
          <div>
            ${item.price}
          </div>
          <StarRating rating={getAverageRating(item.ratings)}/>
          <SpicyLevel level={item.spicy} />
          <div>
          <div className='icon-container'>
            {item.one_order && <div className='one-icon icon'>1</div>}
            {item.dinner && <div className='d-icon icon'>D</div>}
            {item.raw && <div className='r-icon icon'>R</div>}
            {item.handroll && <div className='h-icon icon'>H</div>}
            {item.alacarte && <div className='a-icon icon'>A</div>}
          </div>
          </div>
        </div>
        <div className='modal-body'>
          {item.img ? <img className='detail-img' src={item.img} /> : `This menu doesn't have a image set yet` }
          <div className='img-upload-button' onClick={() => setImgModal(true)}>Contribute with your image?</div>
          {imgModal && <CloudinaryImageUpload closeModal={() => setImgModal(false)} item={item}/>}
          <div className='ingre-container'>
            {item.inside.length ? (
              <div>
                Inside: <div className='e-selected'>{item.inside.map(x => capitalize(x.name)).join(', ')}</div>
              </div>
            ) : null}
            {item.outside.length ? (
              <div>
                Outside: <div className='e-selected'>{item.outside.map(x => capitalize(x.name)).join(', ')}</div>
              </div>
            ) : null}
            {item.sauce.length ? (
              <div>
                Sauce: <div className='e-selected'>{item.sauce.map(x => capitalize(x.name)).join(', ')}</div>
              </div>
            ) : null}
          </div>
          {allergies.length ? (
            <div>
              <div className='ingre-container'>
                Your allergy(s) in this menu:
                <div className='e-selected'>
                  {allergies.map(x => capitalize(x)).join(', ')}
                </div>
              </div>
              <div className='ingre-container'>
                Your order without these would be:
                {filteredInside.length ? (
                  <div>
                    Inside: <div className='e-selected'>{filteredInside.map(x => capitalize(x.name)).join(', ')}</div>
                  </div>
                ) : null}
                {filteredOutside.length ? (
                  <div>
                    Outside: <div className='e-selected'>{filteredOutside.map(x => capitalize(x.name)).join(', ')}</div>
                  </div>
                ) : null}
                {filteredSauce.length ? (
                  <div>
                    Sauce: <div className='e-selected'>{filteredSauce.map(x => capitalize(x.name)).join(', ')}</div>
                  </div>
                ) : null}
              </div>
            </div>
          ): null}
        </div>
      </div>
    </div>
  )
}