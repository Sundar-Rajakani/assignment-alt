import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import reducers from './reducers';
import configStore from './store/configStore';

import ArticleList from './components/ArticleList';
import ArticleForm from './components/ArticleForm';
import Article from './components/Article';

// import './styles/styles.css';
import './scss/styles.scss';
const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/createArticle" component={ArticleForm} />
          <Route path="/articles/:id" component={Article} />
          <Route path="/" component={ArticleList} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider >
  , document.querySelector('.container'));
