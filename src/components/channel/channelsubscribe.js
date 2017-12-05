import React, { Component } from 'react'
import ProjectPreview from '../projects/projectpreview'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route, Redirect, Switch} from 'react-router-dom'
import { push } from 'react-router-redux'
import { utils } from '../../utils'
import {  addSubscription, deleteSubscription } from '../../actions'
import { setChannel, getSubscription } from './actions'
import queryString from 'query-string'

class ChannelSubscribe extends Component{
  constructor(props){
    super(props)
  }

  subscribe(){
    if (this.props.channel.is_subscribed) {
      this.props.deleteSubscription(this.props.token, this.props.channel.is_subscribed);
    } else {
      this.props.addSubscription(this.props.token, { subscription: { category: this.props.channel.name }})
    }
    setTimeout(()=>{
      this.props.getSubscription(this.props.channel.name, this.props.token);
    },500);
  }

  render(){
    return (
      <div className="channel-subscribe">
        <button onClick={this.subscribe.bind(this)}>{this.props.channel.is_subscribed ? 'unsubscribe' : 'subscribe now'}</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.manageAccount,
    token: state.manageLogin.token,
    channel: state.manageChannel,
    subscriptions: state.manageSubscriptions
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    push, addSubscription, deleteSubscription, getSubscription
  }, dispatch)
}

const ConnectedChannelSubscribe = connect(mapStateToProps, mapDispatchToProps)(ChannelSubscribe)

export default ConnectedChannelSubscribe
