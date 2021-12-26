import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import { Link, useParams } from 'react-router-dom';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ getPost, postReducer }) => {
  let { id } = useParams();
  useEffect(() => {
    getPost(id);
  }, [getPost, id]);
  return postReducer.loading || postReducer.post === null ? (
    <Fragment>Loading</Fragment>
  ) : (
    <div>
      <Link to='/getPosts' className='btn btn-primary'>
        Back to posts
      </Link>
      <PostItem post={postReducer.post} showAction={false}></PostItem>
      <CommentForm postId={postReducer.post._id} />
      {postReducer.post.comments.length > 0 &&
        postReducer.post.comments.map((comment) => {
          return (
            <CommentItem postId={postReducer.post._id} comment={comment} />
          );
        })}
    </div>
  );
};

Post.propTypes = {
  postReducer: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    postReducer: state.postReducer,
  };
};

export default connect(mapStateToProps, { getPost })(Post);
