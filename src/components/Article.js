import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchArticle, deleteArticle } from '../actions';
import { FadeLoader } from 'react-spinners';

class Article extends Component {
  componentDidMount() {
    this.props.fetchArticle(this.props.match.params.id);
  }

  onDelete() {
    this.props.deleteArticle(this.props.match.params.id, () => {
      this.props.history.push('/');
    });
  }

  goToHome() {
    this.props.history.push("/");
  }

  render() {
    const { article } = this.props;
    if (!article) {
      return <div>Loading</div>;
    }
    return (
      <div className="article-details-container">
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
        <div class="article-details-actions">
          <button
            className="btn btn-primary"
            onClick={this.goToHome.bind(this)}
            id="back" >Home</button>
          <button
            className="btn btn-danger pull-xs-right"
            onClick={this.onDelete.bind(this)}>Delete</button>
        </div>
        <div className="article-details" id="article-details">
          <h3 className="article-title">{article.title}</h3>
          <hr />
          <p className="article-body">{article.body}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ articles }, ownProps) {
  return {
    article: articles[ownProps.match.params.id],
    isLoading: articles.isLoading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticle: (id) => dispatch(fetchArticle(id)),
    deleteArticle: (id, callback) => dispatch(deleteArticle(id, callback))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);