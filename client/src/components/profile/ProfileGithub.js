import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRepos } from '../../actions/profile';

const ProfileGithub = ({ username, profileReducer, getRepos }) => {
  useEffect(() => {
    getRepos(username);
  }, [getRepos, username]);

  return (
    <div>
      {profileReducer.repos !== null &&
        profileReducer.repos.map((repo, index) => {
          return (
            <div className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className='badge badge-primary'>
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className='badge badge-dark'>
                    Watchers: {repo.watchers}
                  </li>
                  <li className='badge badge-light'>Forks: {repo.forks}</li>
                </ul>
              </div>
            </div>
          );
        })}
    </div>
  );
};

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  getRepos: PropTypes.func.isRequired,
  profileReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    profileReducer: state.profileReducer,
  };
};

export default connect(mapStateToProps, { getRepos })(ProfileGithub);
