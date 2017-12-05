import React from 'react';
import { Link } from 'react-router-dom'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import Autocomplete from 'react-autocomplete'
import { listCategories, setUser, addSubscription, listSubscriptions, deleteSubscription } from '../actions'


class AddSubscriptions extends React.Component {

  constructor(){
    super()
    this.state = {
      categoryInput: ''
    }
  }

  componentWillMount(){
    if (this.props.token){
      if (!this.props.account.id){
        this.props.setUser(this.props.token)
      }
      this.props.listCategories()
      this.props.listSubscriptions(this.props.token)
    } else {
      this.props.push('/login')
    }
  }

  componentDidMount(){
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.state !== nextState) {
      return true
    }
    return this.props.subscriptions !== nextProps.subscriptions || this.props.categories !== nextProps.categories
  }

  componentDidUpdate(prevProps, prevState){
  }

  handleChange(event){
   this.setState({
     categoryInput: event.target.value
   })
  }

  handleSubmit(event){
   event.preventDefault()
   this.props.addSubscription(this.props.token, { subscription: { category: this.state.categoryInput }})
   this.props.listCategories()
   this.setState({
     categoryInput: ''
   })
  }

  deleteSubscription(id){
   this.props.deleteSubscription(this.props.token, id);
  }

  addSubscription(cat){
   this.props.addSubscription(this.props.token, { subscription: { category: cat }})
  }

  matchStateToTerm(state, value) {
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  // <h2>categories</h2>
  // {this.props.categories.all.filter((cat)=>{
  //   for(var i=0; i<this.props.subscriptions.all.length; i++){
  //     if(this.props.subscriptions.all[i].category_name === cat.name){
  //       return false
  //     }
  //   }
  //   return true;
  // }).map((cat, index)=>{
  //   return(
  //     <div key={index}>{cat.name} <button onClick={this.addSubscription.bind(this, cat.name)}>+</button></div>
  //   )
  // })}

  render() {
    var {account} = this.props
    return (

      <div>
        <Autocomplete
          getItemValue={(item) => item.name}
          items={this.props.categories.all}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.name}
            </div>
          }
          shouldItemRender={this.matchStateToTerm}
          value={this.state.categoryInput}
          onChange={(e) => this.setState({categoryInput: e.target.value})}
          onSelect={(val) => this.setState({categoryInput: val})}
        />
      <button onClick={this.handleSubmit.bind(this)}>Submit</button>
      <h2>subscriptions</h2>
      {this.props.subscriptions.all.map((sub, index)=>{
        return(
          <div key={index}>{sub.category_name} <button onClick={this.deleteSubscription.bind(this, sub.id)}>x</button></div>
        )
      })}
      <button onClick={this.props.close.bind(this)}>Next</button>
      </div>)
    }
}

const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.manageAccount,
    categories: state.manageCategories,
    subscriptions: state.manageSubscriptions
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser,
    listCategories: listCategories,
    listSubscriptions: listSubscriptions,
    deleteSubscription: deleteSubscription,
    addSubscription,
    push: push
  }, dispatch)
}

const ConnectedAddSubscriptions = connect(mapStateToProps, mapDispatchToProps)(AddSubscriptions)

export default ConnectedAddSubscriptions
