import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ getProfiles, profileState }) => {
  useEffect(() => {
    getProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      Yay profiles.
      <div>
        <h1 className='large text-primary'>Open Developers</h1>
        <p className='lead'>Browse and connect with Developers</p>
        <div className='profiles'>
          {profileState.profiles.length > 0 ? (
            profileState.profiles.map((profile) => {
              return <ProfileItem key={profile._id} profile={profile} />;
            })
          ) : (
            <div>No profiles found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

Profiles.propTypes = {
  profileState: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profileState: state.profileReducer,
  };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
