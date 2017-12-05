import React, { Component } from 'react'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route, Redirect, Switch} from 'react-router-dom'
import { push } from 'react-router-redux'
import AddSubscriptions from '../addsubscriptions'
import AddQualifications from '../addqualifications'

class Profile extends Component {

  constructor(props){
    super(props)
    this.state = {
      showInterestsModal: false,
      showSkillsModal: false
    }
  }

  toggleModal(modal){
    this.setState({
      [modal]: !this.state[modal]
    })
  }

  render() {

    return (
        <div className="profile">
          <h1>Your interests</h1>
          <ul>{this.props.account.interests.map((interest, index)=>{
            return (
              <li><Link to={'/channel/' + interest.name}>{interest.name}</Link></li>
            )
          })}</ul>
          <button onClick={this.toggleModal.bind(this, 'showInterestsModal')}>Add more interests</button>
          {this.state.showInterestsModal ? <AddSubscriptions close={this.toggleModal.bind(this, 'showInterestsModal')}/>:null}
          <h1>Your skills</h1>
            <ul>{this.props.account.skills.map((skill, index)=>{
              return (
                <li><Link to={'/channel/' + skill.name}>{skill.name}</Link></li>
              )
            })}</ul>
          <button onClick={this.toggleModal.bind(this, 'showSkillsModal')}>Add more skills</button>
            {this.state.showSkillsModal ? <AddQualifications close={this.toggleModal.bind(this, 'showSkillsModal')}/>:null}
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    token: state.manageLogin.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push
  }, dispatch)
}

const ConnectedProfile = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default ConnectedProfile
