import React from 'react';
import spotifyClone from '../images/spotify-1 1.svg';
import { loginUrl } from '../spotify';
import './Login.scss';

const Login = () => {
  return (
    <div className="login">
      <img className="login__logo" src={spotifyClone} alt="Spotify Logo" />
      <a href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
};

export default Login;
