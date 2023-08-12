import React, {useState, useEffect} from 'react';

export default function IngredientEntry ({item, selectedList, setSelectedList}) {

  const [selected, setSelected] = useState(!!JSON.parse(localStorage.allergies)[item]);

  const handleClick = () => {
    if (!selected) {

      let currentStorage = JSON.parse(localStorage.allergies);
      currentStorage[item] = true;
      localStorage.setItem('allergies', JSON.stringify(currentStorage));
      setSelectedList(x => x.concat(item))
    } else {
      localStorage.removeItem(item);
      let currentStorage = JSON.parse(localStorage.allergies);
      delete currentStorage[item];
      localStorage.setItem('allergies', JSON.stringify(currentStorage));
      let temp = selectedList.filter(x => x !== item)
      setSelectedList(temp);
    }
    setSelected(!selected);
  }

  return (
    <div className={selected ? 'i-entry e-selected': 'i-entry'} onClick={handleClick}>
      {item}
    </div>
  )
}