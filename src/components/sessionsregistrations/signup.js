import React from 'react';
import AccountInput from './accountinput'
import AddSubscriptions from '../addsubscriptions'
import AddQualifications from '../addqualifications'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'

import { push } from 'react-router-redux'

import { setUser, login, logout, register, clearUser} from '../../actions'

class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      step: 1
    }
  }

  componentWillMount(){
    if (!!this.props.token) {
      this.props.push('/');
    }
  }

  componentWillReceiveProps(nextProps){
  }

  nextStep(step){
    this.setState({
      step: step
    })
  }

  render() {
    let step = ((step)=>{
      switch(step){
        case 1:
          return (<AccountInput
            token={this.props.token}
            register={this.props.register}
            nextStep={this.nextStep.bind(this, 2)}
            />)
        case 2:
          return (<div>
            <h1>Welcome, {this.props.account.username.charAt(0).toUpperCase() + this.props.account.username.slice(1)}, add your interests!</h1>
            <AddSubscriptions
              close={this.nextStep.bind(this, 3)}/>
          </div>)
        case 3:
          return (<div>
            <h1>Now add your skills!</h1>
            <AddQualifications
              close={this.nextStep.bind(this, 4)}/>
          </div>)
        case 4:
          setTimeout(()=>{
            this.props.setUser(this.props.token);
            this.props.push('/');
          }, 2000)
          return <div>Congrats, you're all signed up!  Redirecting you now...</div>
      }
    })(this.state.step);
    return (
      <div>
        {step}
        {this.props.status.error ? <div>{this.props.status.error}</div>: null}
      </div>
    )
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

const ConnectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup)

export default ConnectedSignup
