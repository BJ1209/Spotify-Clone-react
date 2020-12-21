import React, { useEffect, useState } from 'react';
import './SongRow.scss';
import { PlayArrow } from '@material-ui/icons';
import { useStateValue } from '../context/StateProvider';

const SongRow = ({ track, num }) => {
  const [show, setShow] = useState(false);
  const [{ bodyShow }, dispatch] = useStateValue();

  const handleClick = () =>
    dispatch({
      type: 'SET_NOWPLAYING',
      now_playing: track,
    });

  return (
    <>
      {track ? (
        <div
          className="songRow"
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onClick={handleClick}
        >
          <p>{!show ? num : <PlayArrow style={{ color: '#fff' }} />}</p>
          <img src={track?.album?.images[0].url} alt={track?.name} />
          <div className="songRow__info">
            <div className="songRow__title">
              <h4>{track?.name}</h4>
              <p>{track?.artists[0]?.name}</p>
            </div>
            <h3>{track?.album?.name}</h3>
          </div>
        </div>
      ) : (
        <div className={`songRow--top ${bodyShow ? 'show--top' : ''}`}>
          <p>#</p>
          <div className="songRow--top__info">
            <h3>TITLE</h3>
            <p>ALBUM</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SongRow;
