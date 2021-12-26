import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
} from './constants';
import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get('/api/userRoute/me');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/userRoute/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.data.msg);
    if (err.response.data.msg !== undefined) {
      dispatch(setAlert(err.response.data.msg, 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL,
      payload: err,
    });
  }
};

export const register = (email, password, name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password, name, age: 19 });

  try {
    const res = await axios.post('/api/userRoute', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlert('User successfully created. Please go to login.'),
      'success'
    );
  } catch (err) {
    dispatch(setAlert('Email already exists.', 'danger'));
    dispatch({
      type: REGISTER_FAIL,
      payload: err,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
};
