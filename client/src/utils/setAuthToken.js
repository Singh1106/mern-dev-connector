import axios from 'axios';

// setting the token in headers, it will go with every request we make to backend using axios
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
