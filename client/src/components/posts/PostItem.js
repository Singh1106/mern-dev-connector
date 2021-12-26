import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/post';

const PostItem = ({
  post,
  authReducer,
  deletePost,
  addLike,
  removeLike,
  showAction,
}) => {
  return (
    <div>
      <div className='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profiles/${post.user}`}>
            <img
              className='round-img'
              src='https://www.gravatar.com/avatar/205e460b479e2e5b48amec07710c08d50?s=200'
              alt=''
            />
            <h4>{post.name}</h4>
          </Link>
        </div>
        <div>
          <p className='my-1'>{post.text}</p>
          <p className='post-date'>
            Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
          </p>
          {showAction && (
            <Fragment>
              {' '}
              <button
                type='button'
                className='btn btn-light'
                onClick={() => {
                  addLike(post._id);
                }}
              >
                <i className='fas fa-thumbs-up'></i>
                <span>{post.likes.length}</span>
              </button>
              <button
                type='button'
                className='btn btn-light'
                onClick={() => {
                  removeLike(post._id);
                }}
              >
                <i className='fas fa-thumbs-down'></i>
              </button>
              <Link to={`/getPosts/${post._id}`} className='btn btn-primary'>
                Discussion{' '}
                <span className='comment-count'>{post.comments.length}</span>
              </Link>
              {authReducer.token !== null &&
                authReducer.user._id === post.user && (
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={() => {
                      deletePost(post._id);
                    }}
                  >
                    <i className='fas fa-times'></i>
                  </button>
                )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showAction: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  authReducer: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return { authReducer: state.authReducer };
};

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
