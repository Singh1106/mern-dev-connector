import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';

const Posts = ({ getPosts, postReducer }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return postReducer.loading ? (
    <Fragment>Loading</Fragment>
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>Welcome to community</p>
      <div className='posts'>
        {postReducer.posts.map((post) => {
          return <PostItem key={post._id} post={post} />;
        })}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  postReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    postReducer: state.postReducer,
  };
};

export default connect(mapStateToProps, { getPosts })(Posts);
