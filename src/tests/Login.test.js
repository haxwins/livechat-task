import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components'
import 'jest-styled-components'
import ShallowRenderer from 'react-test-renderer/shallow';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Login from '../Login.js';
import {
  Loader,
  Remember,
  ErrorMessage,
  AuthorizationError,
  rotate360,
  LoaderAnimation,
  LoaderContainer,
  Input,
  InvalidCredential,
  Container,
  LoginContainer, 
  Button, 
  RememberLabel,
  RememberCheckBox,
  RememberBoxContainer,
  SuccesfullMessage,
  AuthorizationMessage
} from '../Login.js';

const middleweres = [];
const mockStore = configureStore(middleweres);

test('testing whole component with custom state', ()=>{
  const initialState = {
    isLoginValid: false,
    loginMessage: '',
    isLoading: false,
    errorMessage: '',
    }
  const store = mockStore(initialState);

  const renderer = new ShallowRenderer();
  renderer.render(<Login store={store}/>);
  const result = renderer.getRenderOutput();
  expect(result).toMatchSnapshot();
}) 

const components = [
    {   name: 'Button', component: Button},
    {   name: 'Remember', component: Remember},
    {   name: 'ErrorMessage', component: ErrorMessage},
    {   name: 'AuthorizationError', component: AuthorizationError},
    {   name: 'rotate360', component: rotate360},
    {   name: 'LoaderAnimation', component: LoaderAnimation},
    {   name: 'LoaderContainer', component: LoaderContainer},
    {   name: 'Input', component: Input},
    {   name: 'InvalidCredential', component: InvalidCredential},
    {   name: 'Container', component: Container},
    {   name: 'LoginContainer', component: LoginContainer},
    {   name: 'Button', component: Button},
    {   name: 'RememberLabel', component: RememberLabel},
    {   name: 'RememberCheckBox', component: RememberCheckBox},
    {   name: 'RememberBoxContainer', component: RememberBoxContainer},
    {   name: 'SuccesfullMessage', component: SuccesfullMessage},
    {   name: 'AuthorizationMessage', component: AuthorizationMessage},
]

components.forEach((element) => {
    test(element.name, () => {
        const Temp = element.component;
        const tree = renderer.create(<Temp />).toJSON()
        expect(tree).toMatchSnapshot()
    })
})

test('rendering component when login is succesfull', ()=>{
    const initialState = {
      isLoginValid: true,
      loginMessage: '',
      isLoading: false,
      errorMessage: '',
      }
    const store = mockStore(initialState);
  
    const tree = renderer.create(<Login store={store}/>).toJSON()
    expect(tree).toMatchSnapshot();
  }) 