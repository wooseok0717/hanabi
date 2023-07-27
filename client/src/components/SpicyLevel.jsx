import React from 'react';

const SpicyLevel = ({ level }) => {
  const maxLevel = 3; // Set the maximum spicy level (e.g., 3 for three chili peppers)

  return (
    <>
      {Array.from({ length: maxLevel }, (_, index) => (
        <span key={index}>
          {index < level ? '🌶️' : ' '}
        </span>
      ))}
    </>
  );
};

export default SpicyLevel;