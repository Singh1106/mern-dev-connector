import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import { useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEdu from './ProfileEdu';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, profileReducer, authReducer }) => {
  let { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <div>
      {profileReducer.profile === null ? (
        <Fragment>No profile found</Fragment>
      ) : (
        <Fragment>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profileReducer.profile} />
            <ProfileAbout profile={profileReducer.profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profileReducer.profile.experience &&
              profileReducer.profile.experience.length > 0 ? (
                <Fragment>
                  {profileReducer.profile.experience.map((exp) => {
                    return <ProfileExp exp={exp} />;
                  })}
                </Fragment>
              ) : (
                <h4>No Experience found</h4>
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profileReducer.profile.education &&
              profileReducer.profile.education.length > 0 ? (
                <Fragment>
                  {profileReducer.profile.education.map((edu) => {
                    return <ProfileEdu edu={edu} />;
                  })}
                </Fragment>
              ) : (
                <h4>No Education found</h4>
              )}
            </div>
          </div>
          <div class='profile-github'>
            <h2 class='text-primary my-1'>
              <i class='fab fa-github'></i> Github Repos
            </h2>
            {profileReducer.profile.githubusername ? (
              <ProfileGithub username={profileReducer.profile.githubusername} />
            ) : (
              <Fragment>No github profile found</Fragment>
            )}
          </div>
          <Link to='/profiles' className='btn btn-primary'>
            Go back
          </Link>
          {authReducer.isAuthenticated === true &&
            authReducer.token !== null &&
            authReducer.user._id === profileReducer.profile.user._id && (
              <Link to='/editProfile' className='btn btn-danger'>
                Edit Profile
              </Link>
            )}
        </Fragment>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profileReducer: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profileReducer: state.profileReducer,
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps, { getProfileById })(Profile);
