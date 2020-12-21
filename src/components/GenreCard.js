import React from 'react';
import './GenreCard.scss';

const GenreCard = ({ name }) => {
  return (
    <div className="genreCard">
      <h1>{name}</h1>
      <div></div>
    </div>
  );
};

export default GenreCard;
