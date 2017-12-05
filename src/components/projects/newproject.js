import React from 'react';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import Autocomplete from 'react-autocomplete'
import { push } from 'react-router-redux'
import { clearCurrentProject, createProject } from './actions'
import { listCategories, listSkills } from '../../actions'

class NewProject extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      categoryInput: '',
      skillInput: '',
      tags: [],
      requirements: []
    }
  }

  componentWillMount(){
    this.props.clearCurrentProject()
    this.props.listCategories()
    this.props.listSkills()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.currentProject.id) {
      this.props.push('/projects/' + nextProps.currentProject.id)
    }
  }

  handleSubmit() {
    var payload = {
      project: {
        title: this.state.title,
        description: this.state.description,
        tags_attributes: this.state.tags,
        requirements_attributes: this.state.requirements
      }
    }
    this.props.createProject(this.props.token, payload)
  }

  addTag(){
    this.setState({
      categoryInput: '',
      tags: [... this.state.tags, {category_name: this.state.categoryInput}]
    })
  }

  deleteTag(id){
    this.setState({
      tags: this.state.tags.filter((tag, index)=>{
        return index != id;
      })
    })
  }

  addRequirement(){
    this.setState({
      skillInput: '',
      requirements: [... this.state.requirements, {skill_name: this.state.skillInput}]
    })
  }

  deleteRequirement(id){
    this.setState({
      requirements: this.state.requirements.filter((requirement, index)=>{
        return index != id;
      })
    })
  }
  handleChange(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  matchStateToTerm(state, value) {
    return (
      state.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    )
  }

  render() {
    return (
      <div>
        <h2>Create a Project</h2>
        <label>Project Title:</label>
        <input type="text" placeholder="Project Title" value={this.state.title} onChange={this.handleChange.bind(this, "title")}  /><br />
        <label>Description:</label>
        <textarea value={this.state.description} onChange={this.handleChange.bind(this, "description")} /><br />
        <div className="add-tags">
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
          <button onClick={this.addTag.bind(this)}>Add Tag</button>
          <div>
            {this.state.tags.map((tag, index)=>{
              return (
                <span className="tag-label" key={index}>
                  {tag.category_name}
                  <button className="tag-label_delete" onClick={this.deleteTag.bind(this, index)}>x</button>
                </span>
              )
            })}
          </div>
        </div>
        <div className="add-requirements">
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
        <button onClick={this.addRequirement.bind(this)}>Add Requirement</button>
          <div>
            {this.state.requirements.map((requirement, index)=>{
              return (
                <span className="tag-label" key={index}>
                  {requirement.skill_name}
                  <button className="tag-label_delete" onClick={this.deleteRequirement.bind(this, index)}>x</button>
                </span>
              )
            })}
          </div>
        </div>
        <button onClick={this.handleSubmit.bind(this)}>Create Project</button>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.manageAccount,
    status: state.manageStatus,
    categories: state.manageCategories,
    skills: state.manageSkills,
    currentProject: state.manageProjects.current
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    listCategories,
    listSkills,
    clearCurrentProject,
    createProject,
    push
  }, dispatch)
}

const ConnectedNewProject = connect(mapStateToProps, mapDispatchToProps)(NewProject)

export default ConnectedNewProject
