import axios from 'axios';

export const FETCH_ARTICLES = 'FETCH_ARTICLES';
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export const DELETE_ARTICLE = 'DELETE_ARTICLE';
export const FETCH_ARTICLES_FAILURE = 'FETCH_ARTICLES_ERROR';
export const FETCH_ARTICLES_SUCCESS = 'FETCH_ARTICLES_SUCCESS';
export const LOADING = 'LOADING';
export const SAVE_ARTICLE_FAILURE = 'SAVE_ARTICLE_FAILURE';
export const SAVING_ARTICLE = 'SAVING_ARTICLE';
export const SAVE_ARTICLE_SUCCESS = 'SAVE_ARTICLE_SUCCESS';
export const DELETE_ARTICLE_FAILURE = 'DELETE_ARTICLE_FAILURE';
export const DELETE_ARTICLE_SUCCESS = 'DELETE_ARTICLE_SUCCESS';

const ROOT_URL = 'https://jsonplaceholder.typicode.com';


export function isLoading(bool) {
  return {
    type: 'LOADING',
    isLoading: bool
  };
}

export function fetchArticlesSuccess(articles) {
  return {
    type: 'FETCH_ARTICLES_SUCCESS',
    articles
  };
}

export function fetchArticlesFailure(bool) {
  return {
    type: 'FETCH_ARTICLES_FAILURE',
    hasError: bool
  };
}

export function fetchRecordSuccess(article) {
  return {
    type: 'FETCH_ARTICLE_SUCCESS',
    article
  };
}

export function fetchArticleFailure(bool) {
  return {
    type: 'FETCH_ARTICLE_FAILURE',
    hasError: bool
  };
}


export function saveArticleFailure(bool) {
  return {
    type: 'SAVE_ARTICLE_FAILURE',
    hasError: bool
  };
}

export function saveArticleSuccess(article) {
  return {
    type: 'SAVE_ARTICLE_SUCCESS',
    article
  };
}


export function deleteArticleFailure(bool) {
  return {
    type: 'DELETE_ARTICLE_FAILURE',
    hasError: bool
  };
}

export function deleteArticleSuccess(article) {
  return {
    type: 'DELETE_ARTICLE_SUCCESS',
    article
  };
}


export function fetchArticles() {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.get(`${ROOT_URL}/posts`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(isLoading(false));
        return response;
      })
      .then((response) => dispatch(fetchArticlesSuccess(response.data)))
      .catch((e) => {
        console.error(e);
        dispatch(fetchArticlesFailure(true));
      });
  };
}

export function saveArticle(values, callback) {
  return (dispatch) => {
    dispatch(dispatch(isLoading(true)));
    axios.post(`${ROOT_URL}/posts`, values)
      .then((response) => {
        if (response.status != 201) {
          throw Error(response.statusText);
        }
        dispatch(isLoading(false));
        callback();
        return response;
      })
      .then((response) => dispatch(saveArticleSuccess(response.data)))
      .catch((e) => {
        console.error(e);
        dispatch(saveArticleFailure(true));
      });
  }
};

export function fetchArticle(id) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.get(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(isLoading(false));
        return response;
      })
      .then((response) => dispatch(fetchArticleSuccess(response.data)))
      .catch((e) => {
        console.error(e);
        dispatch(fetchArticleFailure(true));
      });
  };
}
export function deleteArticle(id, callback) {
  return (dispatch) => {
    dispatch(isLoading(true));
    axios.delete(`${ROOT_URL}/posts/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        dispatch(isLoading(false));
        callback();
        return response;
      })
      .then((response) => deleteArticleSuccess(true))
      .catch((e) => {
        console.error(e);
        dispatch(deleteArticleFailure(true));
      })
  }
}