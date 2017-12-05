import React, { Component } from 'react'
import ProjectPreview from '../projects/projectpreview'
import ChannelSubscribe from './channelsubscribe'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route, Redirect, Switch} from 'react-router-dom'
import { push } from 'react-router-redux'
import { utils } from '../../utils'
import {  addSubscription, deleteSubscription } from '../../actions'
import { setChannel, getSubscription } from './actions'
import queryString from 'query-string'

class Channel extends Component {

  constructor(props){
    super(props)
  }

  displayProjects(source){
    var projects = utils.sortByTime(source, 'created_at', 'desc');
    return projects.map((proj, index)=>{
      return(
        <ProjectPreview
          key={index}
          proj={proj}
          account={this.props.account}
          />
      )
    })
  }

  componentWillMount(){
    let search = queryString.parse(this.props.search)
    this.props.setChannel(this.props.match.params.channel, this.props.token, search.limit ? search.limit : 10, search.offset ? search.offset : 0)
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.search != nextProps.search || this.props.match.params.channel !== nextProps.match.params.channel) {
      let search = queryString.parse(nextProps.search)
      this.props.setChannel(nextProps.match.params.channel, this.props.token, search.limit ? search.limit : 10, search.offset ? search.offset : 0)
    }
    if (this.props.channel.is_subscribed != nextProps.channel.is_subscribed) return true;
    if (this.props.channel == nextProps.channel) return false;
    return true
  }

  render() {
    return (
        <div className="channel">
          <h1>{this.props.match.params.channel}</h1>
          <ChannelSubscribe />
          {this.displayProjects(this.props.channel.projects)}
        </div>
    );
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
    push, setChannel, addSubscription, deleteSubscription, getSubscription
  }, dispatch)
}

const ConnectedChannel = connect(mapStateToProps, mapDispatchToProps)(Channel)

export default ConnectedChannel
