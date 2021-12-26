import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  DELETE_POST,
  UPDATE_LIKES,
  ADD_POST,
  CLEAR_PROFILE,
  GET_POST,
  CLEAR_POST,
  UPDATE_COMMENTS,
} from './constants';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_POST });
    dispatch({ type: CLEAR_PROFILE });
    const res = await axios.get('/api/postRoute/');
    console.log(res);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_PROFILE });
    const res = await axios.get(`/api/postRoute/${id}`);
    console.log(res);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/postRoute/${id}`);
    console.log(res);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
    dispatch(setAlert('Post Successfully deleted', 'danger'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/postRoute/like/${id}`);
    console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/postRoute/unlike/${id}`);
    console.log(res);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const addPost = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(`/api/postRoute/`, formData, config);
    console.log(res);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Successfully created', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      `/api/postRoute/comment/${postId}`,
      formData,
      config
    );
    console.log(res);
    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });
    dispatch(setAlert('Comment Successfully added', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};

export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/postRoute/comment/${postId}/${commentId}`
    );
    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });
    dispatch(setAlert('Comment Successfully deleted', 'danger'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: err,
    });
  }
};
