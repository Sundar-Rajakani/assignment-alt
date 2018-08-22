import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ArticlesReducer from './articles_reducer'
const rootReducer = combineReducers({
  records: ArticlesReducer,
  form: formReducer
});

export default rootReducer;
