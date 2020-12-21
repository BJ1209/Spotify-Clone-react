import React from 'react';
import Body from './Body';
import Sidebar from './Sidebar';
import './Player.scss';
import Footer from './Footer';

const Player = ({ spotify }) => {
  return (
    <>
      <div className="player">
        <Sidebar />
        <Body spotify={spotify} />
      </div>
      <Footer />
    </>
  );
};

export default Player;
