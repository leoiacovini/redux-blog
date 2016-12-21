import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsDetail extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    const postsId = this.props.params.id;
    this.props.fetchPost(postsId);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.post.id).then(() => {
        this.context.router.push("/");
      }
    );
  }

  render() {
    const post = this.props.post;
    if (!post) return <div>Loading...</div>
    return (
      <div>
        <Link to="/">{'<-'}Back to Index</Link>
        <button className="btn btn-danger float-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <br />
        <p>{post.content}</p>
      </div>
      );
  }
}

function mapStateToProps(state) {
  return {
    post: state.posts.post
  };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsDetail);