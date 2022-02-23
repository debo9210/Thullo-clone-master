import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { errorsReducer } from './redux/reducers/errorReducers';
import {
  registerUserReducer,
  currentUserReducer,
  currentPassReducer,
} from './redux/reducers/authReducers';

const reducers = combineReducers({
  errors: errorsReducer,
  registerUser: registerUserReducer,
  currentUser: currentUserReducer,
  pass: currentPassReducer,
});

const initialState = {};

const middleware = [thunk];

const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middleware)
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, devTools);

export default store;
