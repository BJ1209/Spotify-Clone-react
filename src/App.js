import React, { useEffect } from 'react';
import './App.scss';
import Login from './components/Login';
import Player from './components/Player';
import { useStateValue } from './context/StateProvider';
import { getAccessToken } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';

const spotify = new SpotifyWebApi();

const App = () => {
  const [{ token }, dispatch] = useStateValue();

  useEffect(() => {
    const tokenObject = getAccessToken();
    const accessToken = tokenObject?.access_token;
    window.history.replaceState(null, null, ' '); // to replace the hash string to "" in url
    if (accessToken) {
      dispatch({
        type: 'SET_TOKEN',
        token: accessToken,
      });
      spotify.setAccessToken(accessToken);
      spotify.getMe().then((user) =>
        dispatch({
          type: 'SET_USER',
          user: user,
        })
      );
      spotify.getUserPlaylists().then((playlists) =>
        dispatch({
          type: 'SET_USER_PLAYLISTS',
          user_playlists: playlists,
        })
      );
      spotify.getCategoryPlaylists('toplists').then((toplists) =>
        dispatch({
          type: 'SET_TOPLISTS',
          toplists: {
            name: 'Top Lists',
            playlists: toplists?.playlists?.items,
          },
        })
      );
      spotify.getCategoryPlaylists('bollywood').then((bollywood) =>
        dispatch({
          type: 'SET_BOLLYWOOD',
          bollywood: {
            name: 'Bollywood',
            playlists: bollywood?.playlists?.items,
          },
        })
      );
      spotify.getCategoryPlaylists('punjabi').then((punjabi) =>
        dispatch({
          type: 'SET_PUNJABI',
          punjabi: {
            name: 'Top Punjabi',
            playlists: punjabi?.playlists?.items,
          },
        })
      );
      spotify.getCategoryPlaylists('workout').then((workout) =>
        dispatch({
          type: 'SET_WORKOUT',
          workout: {
            name: 'Workout',
            playlists: workout?.playlists?.items,
          },
        })
      );
      spotify.getCategoryPlaylists('pop').then((pop) =>
        dispatch({
          type: 'SET_POP',
          pop: {
            name: 'Pop',
            playlists: pop?.playlists?.items,
          },
        })
      );
      spotify.getCategoryPlaylists('romance').then((romance) =>
        dispatch({
          type: 'SET_ROMANCE',
          romance: {
            name: 'Romance',
            playlists: romance?.playlists?.items,
          },
        })
      );
    }
  }, []);
  return <div className="app">{!token ? <Login /> : <Player spotify={spotify} />}</div>;
};

export default App;
