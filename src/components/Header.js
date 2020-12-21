import React, { useEffect, useState } from 'react';
import './Header.scss';
import { useStateValue } from '../context/StateProvider';
import { ChevronLeft, ChevronRight, Search } from '@material-ui/icons';
import { Avatar } from '@material-ui/core';
import SpotifyWebApi from 'spotify-web-api-js';
import { useHistory } from 'react-router-dom';

const spotify = new SpotifyWebApi();

const Header = ({ search }) => {
  const [{ user, playlist, bodyShow }, dispatch] = useStateValue();
  const [input, setInput] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await spotify.searchPlaylists(input, { limit: 25 }).then((search) =>
      dispatch({
        type: 'SET_SEARCH_PLAYLISTS',
        searchPlaylists: {
          searchId: input,
          searchValue: search,
        },
      })
    );
    history.push(`/search/${input}`);
    setInput('');
  };
  const handleBack = () => {
    history.goBack();
    dispatch({
      type: 'SET_PLAYLIST',
      playlist: null,
    });
  };
  return (
    <div className={`header ${bodyShow ? 'show--nav' : ''}`}>
      <div className="header__leftIcons">
        <button disabled={history.length === 11} onClick={handleBack}>
          <ChevronLeft />
        </button>
        <button disabled={history.length === 11} onClick={() => history.goForward()}>
          <ChevronRight />
        </button>
        {search ? (
          <form className="header__left" onSubmit={handleSubmit}>
            <Search />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Search for Artists, Songs, or Podcasts"
            />
          </form>
        ) : (
          playlist && (
            <h1 className={`header__playlistName ${bodyShow ? 'show' : ''}`}>{playlist?.name}</h1>
          )
        )}
      </div>
      <div className="header__right">
        <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
        <h4>{user?.display_name}</h4>
      </div>
    </div>
  );
};

export default Header;
