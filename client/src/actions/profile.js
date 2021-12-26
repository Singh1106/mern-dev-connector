import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  LOGOUT,
  GET_PROFILES,
  GET_REPOS,
} from '../actions/constants';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profileRoute/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response,
      },
    });
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PROFILE,
    });
    const res = await axios.get('/api/profileRoute/');
    //console.log('in getProfiles function', res);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response,
      },
    });
    return false;
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profileRoute/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response,
      },
    });
    return false;
  }
};

export const getRepos = (githubUsername) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profileRoute/github/${githubUsername}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response,
      },
    });
    return false;
  }
};

export const createProfile =
  (formData, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      if (formData.status === '0') {
        throw new Error('choose status.');
      }
      const res = await axios.post('/api/profileRoute/', formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(
          edit
            ? 'Profile successfully updated'
            : 'Profile successfully created',
          'primary'
        )
      );
      return true;
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response,
        },
      });
      dispatch(setAlert('Status and Skills are required.', 'danger'));
      return false;
    }
  };

export const addExperience = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (formData.current === true) {
      formData.to = '';
    }
    const res = await axios.put(
      '/api/profileRoute/experience/',
      formData,
      config
    );

    console.log(res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience successfully added', 'primary'));
    return true;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response,
      },
    });
    dispatch(setAlert('Title, Company and From date are required.', 'danger'));
    return false;
  }
};

export const addEducation = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (formData.current === true) {
      formData.to = '';
    }
    const res = await axios.put(
      '/api/profileRoute/education/',
      formData,
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education successfully added', 'primary'));
    return true;
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response,
      },
    });
    dispatch(setAlert(err.response.data, 'danger'));
    return false;
  }
};

export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = axios.delete(`api/profileRoute/experience/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience successfully deleted.', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response,
      },
    });
    dispatch(setAlert('Something went wrong.', 'danger'));
  }
};

export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = axios.delete(`api/profileRoute/education/${id}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education successfully deleted.', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response,
      },
    });
    dispatch(setAlert('Something went wrong.', 'danger'));
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure?')) {
    try {
      axios.delete(`api/profileRoute`);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: LOGOUT,
      });
      dispatch(setAlert('Account successfully deleted.'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response,
        },
      });
      dispatch(setAlert('Something went wrong.', 'danger'));
    }
  }
};
