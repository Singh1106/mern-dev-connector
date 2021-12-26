import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = ({ profile }) => {
  return (
    <div class='profile-top bg-primary p-2'>
      <h1 className='large'>{profile.user.name}</h1>
      <p className='lead'>
        {profile.status} {profile.company && <span> at {profile.company}</span>}{' '}
      </p>
      <p>{profile.location && <span>{profile.location}</span>}</p>
      <div className='icons my-1'>
        <Link to='#' target='_blank' rel='noopener noreferrer'>
          <i className='fas fa-globe fa-2x'></i>
        </Link>
        <Link to='#' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-twitter fa-2x'></i>
        </Link>
        <Link to='#' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-facebook fa-2x'></i>
        </Link>
        <Link to='#' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-linkedin fa-2x'></i>
        </Link>
        <Link to='#' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-youtube fa-2x'></i>
        </Link>
        <Link to='#' target='_blank' rel='noopener noreferrer'>
          <i className='fab fa-instagram fa-2x'></i>
        </Link>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
