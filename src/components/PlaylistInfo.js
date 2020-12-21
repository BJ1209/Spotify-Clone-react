import React, { useEffect, useState } from 'react';
import './PlaylistInfo.scss';
import { Favorite, MoreHoriz, PlayArrow } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import spotifyWebApi from 'spotify-web-api-js';
import SongRow from './SongRow';
import { PulseLoader } from 'react-spinners';
import { useStateValue } from '../context/StateProvider';
import numeral from 'numeral';

const spotify = new spotifyWebApi();

const PlaylistInfo = () => {
  const [loading, setLoading] = useState(true);
  const [{ playlist, tracks, bodyShow }, dispatch] = useStateValue();
  const { playlistId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await spotify
        .getPlaylist(playlistId)
        .then((playlist) =>
          dispatch({
            type: 'SET_PLAYLIST',
            playlist: playlist,
          })
        )
        .catch((err) => console.log(err.message));
      await spotify
        .getPlaylistTracks(playlistId)
        .then((tracks) =>
          dispatch({
            type: 'SET_TRACKS',
            tracks: tracks,
          })
        )
        .catch((err) => console.log(err.message));
      setLoading(false);
    };
    fetchData();
  }, [playlistId]);

  return !loading ? (
    <div className="playlistInfo">
      <div className="playlistInfo__info">
        <img draggable="false" src={playlist?.images[0]?.url} alt="Album" />
        <div className="playlistInfo__infoText">
          <p>PLAYLIST</p>
          <h2>{playlist?.name}</h2>
          <p>{playlist?.description}</p>
          <p className="playlistInfo__likes">
            <span>{playlist?.owner?.display_name ? playlist?.owner?.display_name : ''}</span>
            <span>•</span>
            <span>{numeral(playlist?.followers?.total).format('0,0')} likes </span>
            <span>•</span>
            <span>{tracks?.items?.length} songs </span>
          </p>
        </div>
      </div>
      <div className={`playlistInfo__songs ${bodyShow ? 'show--playlistInfo' : ''}`}>
        <div className="playlistInfo__songIcons">
          <PlayArrow className="playlistInfo__play" />
          <Favorite className="playlistInfo__icon" />
          <MoreHoriz className="playlistInfo__icon" />
        </div>
        <SongRow />
        <hr />
        {tracks?.items?.map((item, index) => (
          <SongRow key={item?.track?.id} num={index + 1} track={item?.track} />
        ))}
      </div>
    </div>
  ) : (
    <div className="playlistInfo__loading">
      <PulseLoader loading={loading} margin={6} color="#b3b3b3" size={10} />
    </div>
  );
};

export default PlaylistInfo;
