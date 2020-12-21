export const initialState = {
  user: null,
  token: null,
  user_playlists: [],
  toplists: [],
  bollywood: [],
  punjabi: [],
  workout: [],
  pop: [],
  romance: [],
  now_playing: null,
  playlist: null,
  tracks: [],
  searchPlaylists: [],
  bodyShow: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_USER_PLAYLISTS':
      return {
        ...state,
        user_playlists: action.user_playlists,
      };
    case 'SET_TOPLISTS':
      return {
        ...state,
        toplists: action.toplists,
      };
    case 'SET_BOLLYWOOD':
      return {
        ...state,
        bollywood: action.bollywood,
      };
    case 'SET_PUNJABI':
      return {
        ...state,
        punjabi: action.punjabi,
      };
    case 'SET_WORKOUT':
      return {
        ...state,
        workout: action.workout,
      };
    case 'SET_ROMANCE':
      return {
        ...state,
        romance: action.romance,
      };
    case 'SET_NOWPLAYING':
      return {
        ...state,
        now_playing: action.now_playing,
      };
    case 'SET_PLAYLIST':
      return {
        ...state,
        playlist: action.playlist,
      };
    case 'SET_TRACKS':
      return {
        ...state,
        tracks: action.tracks,
      };
    case 'SET_POP':
      return {
        ...state,
        pop: action.pop,
      };
    case 'SET_SEARCH_PLAYLISTS':
      return {
        ...state,
        searchPlaylists: action.searchPlaylists,
      };
    case 'SET_BODYSHOW':
      return {
        ...state,
        bodyShow: action.bodyShow,
      };
    default:
      return state;
  }
};
export default reducer;
