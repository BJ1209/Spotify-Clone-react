import React, { useState } from 'react';
import { Grid, Slider } from '@material-ui/core';
import {
  FavoriteBorderOutlined,
  ImportantDevices,
  PlayCircleOutline,
  PlaylistPlay,
  Repeat,
  Shuffle,
  SkipNext,
  SkipPrevious,
  VolumeUp,
} from '@material-ui/icons';
import './Footer.scss';
import { useStateValue } from '../context/StateProvider';
const Footer = () => {
  const [value, setValue] = useState(0);
  const [volume, setVolume] = useState(30);
  const [{ now_playing }] = useStateValue();
  return (
    <footer className="footer">
      <div className="footer__left">
        <img
          src={`${
            now_playing
              ? now_playing?.album?.images[0].url
              : 'https://i.scdn.co/image/ab67616d0000b273d0fa156bb3b7728a86c65513'
          }`}
          alt="Song Cover"
          draggable="false"
        />
        <div className="footer__songInfo">
          <h4>{now_playing ? now_playing?.name : 'Harvest'}</h4>
          <p>{now_playing ? now_playing?.artists[0].name : 'Pathos Humano'}</p>
        </div>
        <FavoriteBorderOutlined />
      </div>
      <div className="footer__player">
        <div className="footer__playerIcons">
          <Shuffle />
          <SkipPrevious />
          <PlayCircleOutline className="footer__playIcon" fontSize="large" />
          <SkipNext />
          <Repeat />
        </div>
        <Slider
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          aria-labelledby="continuous-slider"
        />
      </div>
      <Grid className="footer__right" container spacing={2}>
        <Grid item>
          <PlaylistPlay className="footer__rightIcons playlist-icon" />
        </Grid>
        <Grid item>
          <ImportantDevices className="footer__rightIcons" />
        </Grid>
        <Grid item>
          <VolumeUp className="footer__rightIcons" />
        </Grid>
        <Grid item xs={3}>
          <Slider
            value={volume}
            onChange={(e, newValue) => setVolume(newValue)}
            aria-labelledby="continuous-slider"
          />
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
