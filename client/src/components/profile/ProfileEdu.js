import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEdu = ({ edu }) => {
  return (
    <div>
      <h3 className='text-dark'>{edu.school}</h3>
      <p>
        {' '}
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Current'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </p>
      <p>
        <strong>Degree: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>Field of study: </strong>
        {edu.fieldofstudy}
      </p>
    </div>
  );
};

ProfileEdu.propTypes = {
  edu: PropTypes.object.isRequired,
};

export default ProfileEdu;
