import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    current: false,
    fieldofstudy: '',
    from: '',
    to: '',
    description: '',
  });

  const { school, degree, current, from, to, fieldofstudy, description } =
    formData;

  const setAttributeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const res = addEducation(formData); // somehow it returns true and false in a promise. dont know why.
    res.then((result) => {
      // I think i do know why but too lengthy to write.
      if (result) {
        navigate('/dashboard');
      }
    });
  };
  return (
    <div>
      <section className='container'>
        <h1 className='large text-primary'>Add Your Education</h1>
        <p className='lead'>
          <i className='fas fa-graduation-cap'></i> Add any school, bootcamp,
          etc that you have attended
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* School or Bootcamp'
              name='school'
              value={school}
              onChange={(e) => setAttributeValue(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              value={degree}
              onChange={(e) => setAttributeValue(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Field Of Study'
              name='fieldofstudy'
              value={fieldofstudy}
              onChange={(e) => setAttributeValue(e)}
            />
          </div>
          <div className='form-group'>
            <h4>* From Date</h4>
            <input
              type='date'
              name='from'
              value={from}
              onChange={(e) => setAttributeValue(e)}
              required
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                value={current}
                checked={current}
                onChange={() => {
                  setFormData({ ...formData, current: !current });
                }}
              />{' '}
              Current School or Bootcamp
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              value={to}
              onChange={(e) => setAttributeValue(e)}
              disabled={current ? 'disabled' : ''}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Program Description'
              value={description}
              onChange={(e) => setAttributeValue(e)}
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </div>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
