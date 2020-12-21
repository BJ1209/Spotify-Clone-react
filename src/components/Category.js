import React, { useEffect, useRef, useState } from 'react';
import Playlist from './Playlist';
import './Category.scss';
const Category = ({ search, name, playlists, first, last }) => {
  const MainRef = useRef();
  const [limiter, setLimiter] = useState(6);

  useEffect(() => {
    const handleWindowResize = () => {
      const calc = Math.floor(MainRef.current.getBoundingClientRect().width / 195);
      setLimiter(calc);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  const truncateArray = (arr) => {
    return arr?.slice(0, limiter);
  };

  return playlists?.length !== 0 ? (
    <div ref={MainRef} className={`category ${first ? 'first' : ''} ${last ? 'last' : ''}`}>
      <h2>{name}</h2>
      <div className={`category__cards ${search ? 'category__expandCards' : ''}`}>
        {truncateArray(playlists)?.map(({ id, name, images, description }) => (
          <Playlist key={id} id={id} name={name} description={description} imageURL={images} />
        ))}
      </div>
    </div>
  ) : (
    <h1 className="category__message">Sorry... No Playlist Found</h1>
  );
};

export default Category;
