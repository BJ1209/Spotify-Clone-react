import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PulseLoader } from 'react-spinners';
import SpotifyWebApi from 'spotify-web-api-js';
import { useStateValue } from '../context/StateProvider';
import Category from './Category';
import GenreCard from './GenreCard';
import './Search.scss';

const spotify = new SpotifyWebApi();
const Search = () => {
  const [genre, setGenre] = useState([]);
  const [loading, setloading] = useState(true);
  const { searchId } = useParams();
  const [{ searchPlaylists }] = useStateValue();
  useEffect(() => {
    const fetchData = async () => {
      await spotify.getAvailableGenreSeeds().then((genre) => setGenre(genre));
      setloading(false);
    };
    fetchData();
  }, []);

  return !loading ? (
    <div className="search">
      {!searchId ? (
        <>
          <h1>Browse All</h1>
          <div className="search__cards">
            {genre?.genres?.slice(0, 24).map((item, index) => (
              <GenreCard key={index} name={item} />
            ))}
          </div>
        </>
      ) : (
        <Category
          search
          name={`Top Playlists for ${searchId}`}
          playlists={searchPlaylists?.searchValue?.playlists?.items}
          num={20}
          first
        />
      )}
    </div>
  ) : (
    <div className="playlistInfo__loading">
      <PulseLoader loading={loading} margin={10} color="#b3b3b3" size={10} />
    </div>
  );
};

export default Search;
