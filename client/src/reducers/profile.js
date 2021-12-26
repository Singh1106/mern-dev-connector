import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  GET_REPOS,
} from '../actions/constants';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  error: {},
};

const profileReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        error: {},
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
