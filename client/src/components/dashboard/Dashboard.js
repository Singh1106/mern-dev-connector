import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { loadUser } from '../../actions/auth';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({
  profile,
  auth,
  getCurrentProfile,
  loadUser,
  deleteAccount,
}) => {
  useEffect(() => {
    loadUser();
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return profile.profile === null ? (
    <Fragment>
      <p>No profile found</p>
      <Link to='/createProfile' className='btn btn-primary my-1'>
        Create Profile
      </Link>
    </Fragment>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'>Welcome {auth.user.name}</i>
      </p>
      <Link to='/editProfile' className='btn btn-primary my-1'>
        Edit Profile
      </Link>
      <Link to='/addExperience' className='btn btn-primary my-1'>
        Add Experience
      </Link>
      <Link to='/addEducation' className='btn btn-primary my-1'>
        Add Education
      </Link>
      <Link to='/post' className='btn btn-primary my-1'>
        Create Post
      </Link>
      <Experience experience={profile.profile.experience} />
      <Education education={profile.profile.education} />
      <div className='my-2'>
        <button
          className='btn btn-danger'
          onClick={() => {
            deleteAccount();
          }}
        >
          Delete Account
        </button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer,
    auth: state.authReducer,
  };
};

export default connect(mapStateToProps, {
  getCurrentProfile,
  loadUser,
  deleteAccount,
})(Dashboard);
