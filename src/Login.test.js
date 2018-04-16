import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import loginReducer from './loginReducer';
import Login from './Login.js';

const store = createStore(
  loginReducer,
  applyMiddleware(thunk)
)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login store={store}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});