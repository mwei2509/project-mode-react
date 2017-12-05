import React, {Component} from 'react';

export default class AccountInput extends Component {
  constructor(props) {
    super(props);

    this.state={
      email: '',
      username: '',
      password: ''
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.token){
      this.props.nextStep()
    }
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.register(this.state.username, this.state.email, this.state.password)
  }

  handleChange(field, event){
    this.setState({
      [field]: event.target.value
    })
  }

  render() {
    return (
      <div className="account-input">
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleChange.bind(this, "username")}  /><br />
          <input type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange.bind(this, "email")} /><br />
          <input type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} /><br />
          <button type="submit">Register</button>
        </form>
      </div>);
  }
}
