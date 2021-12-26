import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExp = ({ exp }) => {
  return (
    <div>
      <h3 className='text-dark'>{exp.company}</h3>
      <p>
        {' '}
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Current'
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </p>
      <p>
        <strong>Position: </strong>
        {exp.title}
      </p>
      <p>
        <strong>Description: </strong>
        {exp.description}
      </p>
    </div>
  );
};

ProfileExp.propTypes = {
  exp: PropTypes.object.isRequired,
};

export default ProfileExp;
