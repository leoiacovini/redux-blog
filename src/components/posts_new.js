import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class PostsNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props).then(() => {
        this.context.router.push("/");
    });
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const { title, categories, content } = this.props.fields;

    return (
      <div>
        <h3>Create A New Post</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))} >
            <div className={`form-group ${title.touched && title.error ? 'has-danger' : ''}`}>
                <label className="form-control-label">Title</label>
                <input type="text" className='form-control form-control-danger' {...title} />
                <span className="form-control-feedback">
                    {title.touched ? title.error : ''}
                </span>
            </div>
            <div className={`form-group ${categories.touched && categories.error ? 'has-danger' : ''}`}>
                <label className="form-control-label">Categories</label>
                <input type="text" className="form-control form-control-danger" {...categories} />
                <div className="form-control-feedback">
                    {categories.touched ? categories.error : ''}
                </div>
            </div>
            <div className={`form-group ${content.touched && content.error ? 'has-danger' : ''}`}>
                <label className="form-control-label">Content</label>
                <textarea className="form-control form-control-danger" {...content} />
                <div className="form-control-feedback">
                    {content.touched ? content.error : ''}
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            <Link to="/" className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
    const errors = {};
    !values.title ? errors.title = "Enter Title" : null
    !values.categories ? errors.categories = "Enter a Categorie" : null
    !values.content ? errors.content = "Enter Content" : null
    return errors;
}

// conect(mapStateToProps, mapDispatchToProps)
// reduxForm(formConfig, mapStateToProps, mapDispatchToProps)

export default reduxForm({
    form: 'PostsNewForm',
    fields: ['title', 'categories', 'content'],
    validate: validate
}, null, { createPost })(PostsNew);
