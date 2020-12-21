import React from 'react';
import { useHistory } from 'react-router-dom';
import './Playlist.scss';

const Playlist = ({ id, name, description, imageURL }) => {
  const history = useHistory();

  const truncateStr = (str, n) => {
    return str.length < n ? str : str.slice(0, n) + '...';
  };
  return (
    <div className="playlist" onClick={() => history.push(`/playlist/${id}`)}>
      <div className="playlist__container">
        <div className="playlist__imageContainer">
          {imageURL && <img src={imageURL[0]?.url} alt={name} draggable="false" />}
          <button>
            <svg height="16" role="img" width="16" viewBox="0 0 24 24" aria-hidden="true">
              <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="white"></polygon>
            </svg>
          </button>
        </div>
        <div className="playlist__content">
          <h3>{name}</h3>
          <p>{truncateStr(description, 38)}</p>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
