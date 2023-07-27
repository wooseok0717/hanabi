import React, {useState, useEffect} from 'react';

export default function IngredientEntry ({item, selectedList, setSelectedList}) {

  const [selected, setSelected] = useState(!!localStorage[item]);

  const handleClick = () => {
    if (!selected) {
      localStorage.setItem(item, true);
      setSelectedList(x => x.concat(item))
    } else {
      localStorage.removeItem(item);
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