import React from 'react';
import AccountInput from './accountinput'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import { push } from 'react-router-redux'

import { setUser, setCurrentBoard, newBoard, login, logout, register, clearUser} from '../../actions'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  componentDidUpdate(){
    if (!!this.props.token) {
      this.props.push('/');
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  handleChange(field, e){
    this.setState({
      [field]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input placeholder="Username or Email" type="text" value={this.state.username} onChange={this.handleChange.bind(this, "username")}  /><br />
          <input placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} /><br />
          <button type="submit">Log In</button>
        </form>
      </div>);
  }
}


const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.manageAccount,
    status: state.manageStatus
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser,
    login: login,
    logout: logout,
    register: register,
    clearUser: clearUser,
    push: push
  }, dispatch)
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)

export default ConnectedLogin
