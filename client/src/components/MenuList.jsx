import React, {useState, useEffect} from 'react';
import axios from 'axios';
import TypeList from './TypeList.jsx';

export default function MenuList () {

  const [types, setTypes] = useState([]);

  useEffect(() => {
    axios.get('api/types')
    .then(({data}) => setTypes(data));
  },[])

  return (
    <div>
      {types.map(t => (<TypeList key={t.id} type={t}/>))}
    </div>
  )
}