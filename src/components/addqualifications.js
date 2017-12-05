import React from 'react';
import { Link } from 'react-router-dom'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {push} from 'react-router-redux'
import Autocomplete from 'react-autocomplete'
import { listSkills, setUser, addQualification, listQualifications, deleteQualification } from '../actions'


class AddQualifications extends React.Component {

  constructor(){
    super()
    this.state = {
      skillInput: ''
    }
  }

  componentWillMount(){
    if (this.props.token){
      if (!this.props.account.id){
        this.props.setUser(this.props.token)
      }
      this.props.listSkills()
      this.props.listQualifications(this.props.token)
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
    return this.props.qualifications !== nextProps.qualifications || this.props.skills !== nextProps.skills
  }

  componentDidUpdate(prevProps, prevState){
  }

  handleChange(event){
   this.setState({
     skillInput: event.target.value
   })
  }

  handleSubmit(event){
   event.preventDefault()
   this.props.addQualification(this.props.token, { qualification: { skill: this.state.skillInput }})
   this.props.listSkills()
   this.setState({
     skillInput: ''
   })
  }

  deleteQualification(id){
   this.props.deleteQualification(this.props.token, id);
  }

  addQualification(cat){
   this.props.addQualification(this.props.token, { qualification: { skill: cat }})
  }

  matchStateToTerm(state, value) {
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  render() {
    var {account} = this.props
    return (

      <div>
        <Autocomplete
          getItemValue={(item) => item.name}
          items={this.props.skills.all}
          renderItem={(item, isHighlighted) =>
            <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
              {item.name}
            </div>
          }
          shouldItemRender={this.matchStateToTerm}
          value={this.state.skillInput}
          onChange={(e) => this.setState({skillInput: e.target.value})}
          onSelect={(val) => this.setState({skillInput: val})}
        />
      <button onClick={this.handleSubmit.bind(this)}>Submit</button>
      <h2>qualifications</h2>
      {this.props.qualifications.all.map((sub, index)=>{
        return(
          <div key={index}>{sub.skill_name} <button onClick={this.deleteQualification.bind(this, sub.id)}>x</button></div>
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
    skills: state.manageSkills,
    qualifications: state.manageQualifications
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser,
    listSkills: listSkills,
    listQualifications: listQualifications,
    deleteQualification: deleteQualification,
    addQualification,
    push: push
  }, dispatch)
}

const ConnectedAddQualifications = connect(mapStateToProps, mapDispatchToProps)(AddQualifications)

export default ConnectedAddQualifications
