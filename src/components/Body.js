import React, { useEffect, useRef, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import './Body.scss';
import Category from './Category';
import Header from './Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import PlaylistInfo from './PlaylistInfo';
import Search from './Search';
import Playlist from './Playlist';
const Body = () => {
  const bodyRef = useRef();
  const [style, setStyle] = useState();
  const [
    { user_playlists, romance, toplists, bollywood, pop, punjabi, workout, playlist, bodyShow },
    dispatch,
  ] = useStateValue();

  // useEffect for background color of playlist
  useEffect(() => {
    const styles = playlist
      ? {
          background: `linear-gradient(${
            playlist?.primary_color ? playlist?.primary_color : 'rgba(0,0,0,0)'
          }, rgba(0, 0, 0, 1))`,
        }
      : {
          background: '#121212',
        };
    setStyle(styles);
  }, [playlist]);

  const handleScroll = () => {
    bodyRef.current.scrollTop > 250
      ? dispatch({
          type: 'SET_BODYSHOW',
          bodyShow: true,
        })
      : dispatch({
          type: 'SET_BODYSHOW',
          bodyShow: false,
        });
  };
  return (
    <div className="body" style={style} ref={bodyRef} onScroll={handleScroll}>
      <Switch>
        <Route path="/collection">
          <Header />
          <div className="body__collection">
            {user_playlists?.items?.map(({ name, id, description, images }) => (
              <Playlist key={id} id={id} name={name} description={description} imageURL={images} />
            ))}
          </div>
        </Route>
        <Route path="/search/:searchId">
          <Header search />
          <Search />
        </Route>
        <Route path="/search">
          <Header search />
          <Search />
        </Route>
        <Route path="/playlist/:playlistId">
          <Header />
          <PlaylistInfo />
        </Route>
        <Route path="/">
          <Header />
          <Category first name={toplists.name} playlists={toplists.playlists} />
          <Category name={punjabi.name} playlists={punjabi.playlists} />
          <Category name={romance.name} playlists={romance.playlists} />
          <Category name={workout.name} playlists={workout.playlists} />
          <Category name={pop.name} playlists={pop.playlists} />
          <Category last name={bollywood.name} playlists={bollywood.playlists} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Body;
