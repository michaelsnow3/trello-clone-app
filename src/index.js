import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

// import reducers
import { userInfo, getUserBoards } from './reducers/userInfoReducers';
import {
  boardContent,
  activeBoard,
  settingsMenu
} from './reducers/boardReducers';
import {
  handleBoardTitleChange,
  handleListTitleChange
} from './reducers/onValueChangeReducers';
import { moveComponent } from './reducers/moveComponentReducers';

import './index.css';

// redux middlewatre
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
const logger = createLogger();

const rootReducers = combineReducers({
  userInfo,
  getUserBoards,
  activeBoard,
  boardContent,
  handleBoardTitleChange,
  handleListTitleChange,
  moveComponent,
  settingsMenu
});

const store = createStore(
  rootReducers,
  applyMiddleware(thunkMiddleware, logger)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
