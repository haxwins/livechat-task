import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { login, logout } from './loginActions';

const emailTest = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\D]{6,}$/;

class Login extends Component {
  state = {
    emailValue: '',
    passwordValue: '',
    isPasswordValid: true,
    isEmailValid: true,
  }
 
  onChangeEmail = (e) =>{
    this.setState({emailValue: e.target.value});
  }
  onChangePassword = (e) =>{
    this.setState({passwordValue: e.target.value});
  }

  handleSubmit = () => {
    this.setState({
      isEmailValid: !!emailTest.exec(this.state.emailValue.toLowerCase()),
      isPasswordValid: !!passwordTest.exec(this.state.passwordValue), 
    }, () => {
      if (this.state.isEmailValid && this.state.isPasswordValid) {
        this.props.loginAction(
          this.state.emailValue,
          this.state.passwordValue
        )
      }
    })
  } 

  render() {
    if (this.props.isLoginValid) {
      return (
        <SuccesfullMessage>
          <p>login succesfull</p>
          <Button onClick={this.props.logoutAction}>Logout</Button>
        </SuccesfullMessage>
      )
    }

    return (
      <div>
        {this.props.isLoading && <Loader />}
      <Container>
        <LoginContainer>
          <Input notValid={!this.state.isEmailValid} placeholder="email" value={this.state.emailValue} onChange={this.onChangeEmail} />
          {!this.state.isEmailValid && <ErrorMessage message="invalid email" />}
          <Input notValid={!this.state.isPasswordValid} placeholder="password" value={this.state.passwordValue} type="password" onChange={this.onChangePassword} />
          {!this.state.isPasswordValid && <ErrorMessage message="invalid password" />}
          <Remember label="remember me" />
          <Button onClick={this.handleSubmit}>Login</Button>
          {this.props.errorMessage && <AuthorizationError message={this.props.errorMessage} />}
        </LoginContainer>
      </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (email, password)=>dispatch(login(email, password)),
    logoutAction: ()=>dispatch(logout())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)

export const Loader = () => (
  <LoaderContainer>
    <LoaderAnimation></LoaderAnimation>
  </LoaderContainer>
)

export const Remember = ({ label }) => (
  <RememberBoxContainer>
    <RememberLabel>{label}</RememberLabel>
    <RememberCheckBox type="checkbox" />
  </RememberBoxContainer>
)

export const ErrorMessage = ({ message }) => (
  <div>
    <InvalidCredential>{message}</InvalidCredential>
  </div>
)

export const AuthorizationError = ({ message }) => (
  <div>
    <AuthorizationMessage>{message}</AuthorizationMessage>
  </div>
)

export const rotate360 = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`
export const LoaderAnimation = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${rotate360} 2s linear infinite;
`
export const LoaderContainer = styled.div`
  color: white;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 5;
`
export const Input = styled.input`
  width: 14rem;
  margin: 0.5rem 0 1rem 0;
  padding: 0.5rem;
  color: #69b7eb;
  background: white;
  border: 2px solid; 
  border-color: ${props => props.notValid ? ' 	rgb(255, 0, 51, 0.8)' : 'rgba(0, 0, 0, 0)'};
  border-radius: 6px;
`
export const InvalidCredential = styled.p`
  margin:-1rem 0 0 0.5rem;
  font-size: 0.8rem;
  color: rgb(255, 0, 51, 0.8); 
  position: absolute;
`
export const Container = styled.div`
  font-size: 1.2rem;
  padding-top: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color:rgb(217, 240, 255);
`
export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem 0 0.5rem;
`
export const Button = styled.div`
  text-align: center;
  width: 60%;
  color: #69b7eb;
  transform: scale(1, 1);
  transition: transform 0.5s ease;
  cursor: pointer;
  background-color: white;
  border: none;
  border-radius: 6px;
  margin: 0.5rem 0 0 0;
  padding: 0.3rem 1rem 0.3rem 1rem;
  align-self: center;
  :hover{
    transform: scale(1.2, 1.2);
  }
`
export const RememberLabel = styled.p`
  font-size: 16px;
  margin-left: 1.5rem;
  display: inline;
`
export const RememberCheckBox = styled.input`
  margin-left: 1rem;
`
export const RememberBoxContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding-right: 0.5rem;
  align-items: center;
`
export const SuccesfullMessage = styled.div`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  width: 400px;
  margin:auto;
  padding-top: 10rem;
`
export const AuthorizationMessage = styled.div`
  margin-top: 1rem;
  font-size: 1rem; 
  color: white;
  text-align: center;
`