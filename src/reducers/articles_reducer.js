import _ from 'lodash';
import {
  FETCH_ARTICLES,
  FETCH_ARTICLE,
  LOADING,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLES_FAILURE,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
  SAVE_ARTICLE_FAILURE,
  SAVE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_SUCCESS,
  DEETE_ARTICLE_FAILURE
} from '../actions';

export default function (state = {}, action) {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: action.isLoading };
      break;
    case 'FETCH_ARTICLES_SUCCESS':
      return _.mapKeys(_.slice(action.articles, 0, 11), 'id');
      break;
    case 'FETCH_ARTICLES_FAILURE':
      return action.hasError;
      break;
    case 'FETCH_ARTICLE_SUCCESS':
      return { ...state, [action.article.id]: action.article };
      break;
    case 'FETCH_ARTICLE_FAILURE':
      return action.hasError;
      break;
    case 'SAVE_ARTICLE_FAILURE':
      return action.hasError;
      break;
    case 'SAVING_ARTICLE':
      return action.isLoading;
      break;
    case 'SAVE_ARTICLE_SUCCESS':
      return action.article;
      break;
    case 'SAVE_ARTICLE_SUCCESS':
      return action.article;
      break;
    case 'DELETE_ARTICLE_SUCCESS':
      return action.article;
      break;
    case 'DELETE_ARTICLE_FAILURE':
      return action.hasError;
      break;
    default:
      return state;
  }
}