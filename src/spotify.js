export const authEndPoint = 'https://accounts.spotify.com/authorize';

const redirectUri = 'https://spotify-clone-bjs.web.app/';

const clientId = 'YOUR SPOTIFY CLIENT ID HERE';

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-top-read',
  'user-modify-playback-state',
  'user-library-read',
];

export const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;

// to get the access token from the url
export const getAccessToken = () =>
  window.location.hash
    .substring(1) //got rid of hash symbol
    .split('&') // splitting the above url at '&'
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
