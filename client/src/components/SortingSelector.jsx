import React from 'react';

export default function SortingSelector ({currentSort, setCurrentSort}) {

  const handleSelection = (e) => {
    setCurrentSort(e.target.value);
  }

  return (
    <div className='sort-container'>
      Sort by: <select value={currentSort} onChange={handleSelection} className='sort-selection'>
        <option value='name-asc'>Alphabetic: A to Z</option>
        <option value='name-desc'>Alphabetic: Z to A</option>
        <option value='price-asc'>Price: Low to High</option>
        <option value='price-desc'>Price: High to Low</option>
        <option value='avg_rating-asc'>Rating: Low to High</option>
        <option value='avg_rating-desc'>Rating: High to Low</option>
        {/* <option value='id-asc'>As the writen Menu</option> */}
      </select>
    </div>
  )
}