import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const { title, company, location, from, to, current, description } = formData;

  const setAttributeValue = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    const res = addExperience(formData); // somehow it returns true and false in a promise. dont know why.
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
        <h1 className='large text-primary'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              value={title}
              onChange={(e) => setAttributeValue(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              value={company}
              onChange={(e) => setAttributeValue(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
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
              Current Job
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
              placeholder='Job Description'
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
