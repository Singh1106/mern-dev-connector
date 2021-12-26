import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/post';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CommentItem = ({ postId, comment, authReducer, removeComment }) => {
  return (
    <div>
      {' '}
      <div class='post bg-white p-1 my-1'>
        <div>
          <Link to={`/profiles/${comment.user}`}>
            <img
              class='round-img'
              src='https://www.gravatar.com/avatar/205e460b47d9e2e5b48aec07710c08d50?s=200'
              alt=''
            />
            <h4>{comment.name}</h4>
          </Link>
        </div>
        <div>
          <p class='my-1'>{comment.text}</p>
          <p class='comment-date'>
            Posted on <Moment format='YYYY/MM/DD'>{comment.date}</Moment>
          </p>
        </div>
        {authReducer.token !== null && authReducer.user._id === comment.user && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => {
              removeComment(postId, comment._id);
            }}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  removeComment: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    ...state,
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps, { removeComment })(CommentItem);
