import React from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile }) => {
  return (
    <div class='profile-about bg-light p-2'>
      <h2 class='text-primary'>{profile.user.name}'s bio</h2>
      <p>{profile.bio}</p>
      <div class='line'></div>
      <h2 class='text-primary'>Skill Set</h2>
      <div class='skills'>
        {profile.skills.map((skill, index) => {
          return (
            <div key={index} class='p-1'>
              <i class='fa fa-check'></i>
              {skill}
            </div>
          );
        })}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
