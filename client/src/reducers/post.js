import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  CLEAR_POST,
  UPDATE_COMMENTS,
} from '../actions/constants';

const initialState = {
  post: null,
  posts: [],
  error: {},
  loading: true,
};

const postReducer = (state = initialState, action) => {
  console.log(action.type);
  switch (action.type) {
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) => {
          return post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post;
        }),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => {
          return post._id !== action.payload;
        }),
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: false,
      };
    case UPDATE_COMMENTS:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    default:
      return state;
  }
};

export default postReducer;
