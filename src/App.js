import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import loginReducer from './loginReducer';
import Login from './Login.js';

const store = createStore(
  loginReducer,
  applyMiddleware(thunk)
)

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          {/* here is place for routing but since we have only one page i leave Login container here */}
          <Login />
      </Provider>
    );
  }
}

export default App;
