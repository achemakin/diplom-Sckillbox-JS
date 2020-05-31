import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router} from "react-router-dom";
import { createBrowserHistory } from "history";

import App from './containers/App';
import doImages from './reducers/doImages';
import { setAccessTokenUnplash } from './unsplash';

import './normalize.css';
import './index.scss';                                                 

const history = createBrowserHistory();
const code = location.search.split('code=')[1];
console.log(code);

let initialState = [];

if (code) {  
  setAccessTokenUnplash(code);  
  history.push('/photo_tape/auth');
}

const store = createStore(
  doImages,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
  <Provider store = { store }>
    <Router history= { history }>
      <App />
    </Router>        
  </Provider>,
  document.getElementById('root')
)