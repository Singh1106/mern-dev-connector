import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
import Profiles from './components/profile/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import PostForm from './components/posts/PostForm';
import Post from './components/posts/Post';

const App = () => {
  // passing a second argument as an empty array only makes it run once whenever the app components mounts
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Landing />} />
        </Routes>
        <section className='container'>
          <Alert />
          <Routes>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/profiles' element={<Profiles />} />
            <Route exact path='/profiles/:id' element={<Profile />} />
            <Route exact path='/dashboard' element={<PrivateRoute />}>
              <Route exact path='/dashboard' element={<Dashboard />} />
            </Route>
            <Route exact path='/createprofile' element={<PrivateRoute />}>
              <Route exact path='/createprofile' element={<CreateProfile />} />
            </Route>
            <Route exact path='/editProfile' element={<PrivateRoute />}>
              <Route exact path='/editProfile' element={<EditProfile />} />
            </Route>
            <Route exact path='/addExperience' element={<PrivateRoute />}>
              <Route exact path='/addExperience' element={<AddExperience />} />
            </Route>
            <Route exact path='/addEducation' element={<PrivateRoute />}>
              <Route exact path='/addEducation' element={<AddEducation />} />
            </Route>
            <Route exact path='/getPosts' element={<PrivateRoute />}>
              <Route exact path='/getPosts' element={<Posts />} />
            </Route>
            <Route exact path='/post' element={<PrivateRoute />}>
              <Route exact path='/post' element={<PostForm />} />
            </Route>
            <Route exact path='/getPosts/:id' element={<PrivateRoute />}>
              <Route exact path='/getPosts/:id' element={<Post />} />
            </Route>
          </Routes>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
