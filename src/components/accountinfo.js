// import React from 'react';
// import { Link } from 'react-router-dom'
// import {  bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import {push} from 'react-router-redux'
// import Autocomplete from 'react-autocomplete'
// import { setUser, login, logout, register, clearUser, listCategories, addSubscription, listSubscriptions} from '../actions'
//
//
// class AccountInfo extends React.Component {
//
//   constructor(){
//     super()
//     this.state = {
//       categoryInput: ''
//     }
//   }
//
//   componentWillMount(){
//     if (this.props.token){
//       this.props.setUser(this.props.token)
//       this.props.listCategories()
//       this.props.listSubscriptions(this.props.token)
//     }
//   }
//
//   componentDidUpdate(prevProps, prevState){
//      if(this.props.token && prevProps.token !== this.props.token){
//        this.props.setUser(this.props.token)
//      }
//    }
//
//    handleChange(event){
//      this.setState({
//        categoryInput: event.target.value
//      })
//    }
//
//    handleSubmit(event){
//      event.preventDefault()
//     //  this.props.newCategory(this.props.token, this.state.categoryInput)
//      this.props.addSubscription(this.props.token, { subscription: { category: this.state.categoryInput }})
//      this.setState({
//        categoryInput: ''
//      })
//    }
//
//   logOut(){
//     this.props.push('/')
//     this.props.logout()
//     this.props.clearUser()
//   }
//
//   matchStateToTerm(state, value) {
//     return (
//       state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
//     )
//   }
//
//   render() {
//     let account = this.props.account
//     if (account){
//       return (
//
//       <div>
//         <button onClick={this.props.listCategories.bind(this)}>click</button>
//         <hr />
//         <div id="left-column-sidebar">
//           <span id="welcome-msg">Welcome, {account.username.charAt(0).toUpperCase() + account.username.slice(1)}
//           </span>
//         </div>
//         <hr />
//
//         <Autocomplete
//           getItemValue={(item) => item.name}
//           items={this.props.categories.all}
//           renderItem={(item, isHighlighted) =>
//             <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
//               {item.name}
//             </div>
//           }
//           shouldItemRender={this.matchStateToTerm}
//           value={this.state.categoryInput}
//           onChange={(e) => this.setState({categoryInput: e.target.value})}
//           onSelect={(val) => this.setState({categoryInput: val})}
//         />
//       <button onClick={this.handleSubmit.bind(this)}>Submit</button>
//       <h2>subscriptions</h2>
//       {this.props.subscriptions.all.map((sub, index)=>{
//         return(
//           <div>{sub.name}</div>
//         )
//       })}
//       <h2>categories</h2>
//       {this.props.categories.all.map((cat, index)=>{
//         return(
//           <div>{cat.name}</div>
//         )
//       })}
//       </div>)
//   } else {
//     return null
//   }
// }
// }
//
// const mapStateToProps = (state) => {
//   return ({
//     token: state.manageLogin.token,
//     account: state.manageAccount,
//     categories: state.manageCategories,
//     subscriptions: state.manageSubscriptions
//   })
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({
//     setUser: setUser,
//     login: login,
//     logout: logout,
//     register: register,
//     clearUser: clearUser,
//     listCategories: listCategories,
//     listSubscriptions: listSubscriptions,
//     addSubscription,
//     push: push
//   }, dispatch)
// }
//
// const ConnectedAccountInfo = connect(mapStateToProps, mapDispatchToProps)(AccountInfo)
//
// export default ConnectedAccountInfo
