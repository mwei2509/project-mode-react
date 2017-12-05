import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import {
ConnectedRouter as Router,
routerMiddleware
} from 'react-router-redux'
import thunk from 'redux-thunk'
import { Route, Link, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension';
import './utils';
import App from './App';
// import SessionRegistration from './components/sessionregistration'
import './index.css';
import rootReducer from './reducers'
import SessionRegistration from './components/sessionsregistrations'

const history = createHistory();
const rMiddleware = routerMiddleware(history);
let loggedin=window.localStorage.getItem("current user");
let initialState={
  manageAccount: {username: '', email: '', id: '', newsfeed_projects: [], qualified_projects: [], projects: [], interests: [], skills: []},
  manageLogin: {token: window.localStorage.getItem("current user")},
  manageStatus: {error: ''},
  manageCategories: {all: []},
  manageChannel: {projects: [], category: {}, skill: {}},
  manageSkills: {all: []},
  manageFlexHelper: {flex:{}, current: {}, all: [], style: {}, classStyles: {}},
  manageProjects: {current: { categories: [], skills: [], likes: [], comments: [] }, all: [] }
}
let store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, rMiddleware)))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <Route exact path="/signup" component={SessionRegistration}/>
          <Route exact path="/login" component={SessionRegistration}/>
          <Route path="/" component={App}/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
