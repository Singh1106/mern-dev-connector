import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem(`token`),
  isAuthenticated: null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        user: null,
        token: null,
      };
    case REGISTER_SUCCESS:
      return state;
    case LOGIN_SUCCESS:
      localStorage.setItem(`token`, action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default authReducer;
