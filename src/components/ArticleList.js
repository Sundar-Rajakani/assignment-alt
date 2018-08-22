import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import { fetchArticles, isLoading } from '../actions';

class ArticleList extends Component {
  
  componentDidMount() {
    this.props.fetchArticles();
  }

  renderArticles() {  
    return _.map(this.props.articles, article => {
      return (
        <li id={article.id} key={article.id} className="list-group-item">
          <Link to={`/articles/${article.id}`} >
            {article.title}</Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        {
          this.props.isLoading ?
            (<div className='sweet-loading loading'>
              <FadeLoader
                color={'#4A90E2'}
                loading={true}
                size="100"
              />
            </div>) :
            (<div className="article-list-container">
              <div className="text-xs-right">
                <Link className="btn btn-primary" to="/createArticle"> Add New </Link>
              </div>
              <h1 className="article-list-title">Articles</h1>
              <ul className="list-group article-list">
                {this.renderArticles()}
              </ul>
            </div>)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    isLoading: state.articles.isLoading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticles: () => dispatch(fetchArticles())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);