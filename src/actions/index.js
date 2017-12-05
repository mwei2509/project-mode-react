import axios from 'axios'

//login

export const login = (username, password) => {
  return(dispatch)=>{
    axios
    .post(`http://localhost:4000/login`, {
      account: { username: username, password: password}
    })
    .then(({data}) => {
      window.localStorage.setItem("current user", data.jwt)
      dispatch({
        type: 'LOGIN',
        payload: data.jwt
      })
    })
    .catch((errors) => {
      dispatch({
        type: "ADD_ERROR",
        payload: errors.response.data.error
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
    })
  }
}

export const register = (username, email, password) => {
  return(dispatch)=>{
    axios
    .post(`http://localhost:4000/register`, {
      account: { username: username, email: email, password: password}
    })
    .then(({data})=>{
      window.localStorage.setItem("current user", data.jwt)
      dispatch({
        type: 'LOGIN',
        payload: data.jwt
      })
    })
    .catch((errors)=>{
      let builderror
      debugger
      if(!!errors.response.data.errors.username){
        builderror="Username " + errors.response.data.errors.username
      } else if(!!errors.response.data.errors.email){
        builderror="Email " + errors.response.data.errors.email
      }
      dispatch({
        type: "ADD_ERROR",
        payload: builderror
      })
      setTimeout(()=>{dispatch({
        type: "ADD_ERROR",
        payload: ""
      })}, 2000)
    })
  }
}

export const logout = (token) => {
  console.log("hi")
  window.localStorage.removeItem("current user")
  return{
    type: "LOGOUT"
  }
}

//account
export const clearUser = () =>{
  return{
    type: "CLEAR_USER"
  }
}

export function setUser(token){
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/account`,
        {headers: {token: token}})
      .then(({data}) => {
        console.log('set user success')
        dispatch({
          type: "LOAD_USER",
          data: data
        })
      })
      .catch((errors)=>{
        console.log('set user error')
        debugger
        dispatch({
          type: "ADD_ERROR",
          payload: errors.response.data.error
        })
        setTimeout(()=>{dispatch({
          type: "ADD_ERROR",
          payload: ""
        })}, 2000)
      })
  }
}

//categories
export function listCategories(){
  return (dispatch) => {
    axios
      .get('http://localhost:4000/categories')
      .then(({data}) => {
        dispatch({
          type: 'SET_CATEGORIES',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger;
      })
  }
}

//subscription
export function listSubscriptions(token){
  return (dispatch) => {
    axios
      .get('http://localhost:4000/subscriptions',
        {headers: {token: token}})
      .then(({data}) => {
        dispatch({
          type: 'SET_SUBSCRIPTIONS',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger;
      })
  }
}

export function addSubscription(token, payload){
  return (dispatch) => {
    axios
      .post('http://localhost:4000/subscriptions', payload, { headers: {token: token }})
      .then(({data})=>{
        dispatch({
          type: 'ADD_SUBSCRIPTION',
          payload: data
        })
      })
      .catch((errors)=>{
        let error = errors.response.data.errors
        let errorMsg
        if (error && error.category){
          errorMsg = error.category[0]
        }
        dispatch({
          type: "ADD_ERROR",
          payload: errorMsg
        })
        setTimeout(()=>{dispatch({
            type: "ADD_ERROR",
            payload: ""
          })}, 2000)
      })
  }
}

export function deleteSubscription(token, id){
  return (dispatch) => {
    axios
      .delete('http://localhost:4000/subscriptions/' + id, { headers: {token: token }})
      .then(({data})=>{
        dispatch({
          type: 'DELETE_SUBSCRIPTION',
          payload: Number(data.success)
        })
      })
      .catch((errors)=>{
        debugger
      })
  }
}

//categories
export function listSkills(){
  return (dispatch) => {
    axios
      .get('http://localhost:4000/skills')
      .then(({data}) => {
        dispatch({
          type: 'SET_SKILLS',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger;
      })
  }
}

//qualification
export function listQualifications(token){
  return (dispatch) => {
    axios
      .get('http://localhost:4000/qualifications',
        {headers: {token: token}})
      .then(({data}) => {
        dispatch({
          type: 'SET_QUALIFICATIONS',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger;
      })
  }
}

export function addQualification(token, payload){
  return (dispatch) => {
    axios
      .post('http://localhost:4000/qualifications', payload, { headers: {token: token }})
      .then(({data})=>{
        console.log('add sub')
        dispatch({
          type: 'ADD_QUALIFICATION',
          payload: data
        })
      })
      .catch((errors)=>{
        let error = errors.response.data.errors
        let errorMsg
        if (error && error.category){
          errorMsg = error.category[0]
        }
        dispatch({
          type: "ADD_ERROR",
          payload: errorMsg
        })
        setTimeout(()=>{dispatch({
            type: "ADD_ERROR",
            payload: ""
          })}, 2000)
      })
  }
}

export function deleteQualification(token, id){
  return (dispatch) => {
    axios
      .delete('http://localhost:4000/qualifications/' + id, { headers: {token: token }})
      .then(({data})=>{
        dispatch({
          type: 'DELETE_QUALIFICATION',
          payload: Number(data.success)
        })
      })
      .catch((errors)=>{
        debugger
      })
  }
}

// DASHBOARD

export function setProjects(limit, offset){
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/projects?limit=${limit}&offset=${offset}`)
      .then(({data})=>{
        dispatch({
          type: 'SET_PROJECTS',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger;
      })
  }
}
