import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();
import reducers from './reducers/combined';
import AppContainer from './containers/App';
import rootSaga from './sagas/combined';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
import * as actions from './constants';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// then run the saga
const store = createStore(reducers, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);
export const action = type => store.dispatch({ type });
action(actions.INITALIZE_APPLICATION);


const Root = ({store}) => (
  <Provider store={store}>
    <Router>
      <Route path="/:tableName?"  component={AppContainer} />
    </Router>
  </Provider>
)

render(
 <Root store={store} /> ,
  document.getElementById('app')
);
