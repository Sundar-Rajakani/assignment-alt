import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveArticle } from '../actions';
import { FadeLoader } from 'react-spinners';

class ArticleForm extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          id={field.id}
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.saveArticle(values, () => {
      this.props.history.push('/');
    });
  }

  onCancel() {
    this.props.history.push("/");
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="article-form-container">
        <form className="article-form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            id="title"
            name="title"
            label="Title"
            component={this.renderField}
          />
          <Field
            id="content"
            name="content"
            label="Content"
            component={this.renderField}
          />
          <div className="article-form-actions pull-xs-right">
            <button id="submit" type="submit" action="submit" className="btn btn-primary">Submit</button>
            <button id="cancel" onClick={this.onCancel.bind(this)} className="btn btn-danger" > Cancel</button>
          </div>
          {
            this.props.isLoading &&
            <div className='sweet-loading loading'>
              <FadeLoader
                color={'#4A90E2'}
                loading={true}
                size="100"
              />
            </div>
          }
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Enter a Title!";
  }
  if (!values.content) {
    errors.content = "Enter some content";
  }
  if (!values.tags) {
    errors.tags = "Enter tags";
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    article: state.article,
    isLoading: state.articles.isLoading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveArticle: (values, callback) => dispatch(saveArticle(values, callback))
  };
};

export default reduxForm({
  validate,
  form: 'ArticleForm'
})(connect(mapStateToProps, mapDispatchToProps)(ArticleForm));