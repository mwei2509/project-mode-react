import axios from 'axios'

//login

export const createProject = (token, payload) => {
  return(dispatch)=>{
    axios
      .post('http://localhost:4000/projects', payload, { headers: {token: token }})
      .then(({data}) => {
        dispatch({
          type: 'SET_CURRENT_PROJECT',
          payload: data
        })

        dispatch({
          type: 'ADD_PROJECT_TO_USER',
          payload: data
        })
      })
      .catch((errors) => {
        debugger;
      })
  }
}

export const clearCurrentProject = () =>{
  return{
    type: "CLEAR_CURRENT_PROJECT"
  }
}

export const setCurrentProject = (id) => {
  return(dispatch)=>{
    axios
      .get('http://localhost:4000/projects/' + id)
      .then(({data}) => {
        dispatch({
          type: 'SET_CURRENT_PROJECT',
          payload: data
        })
      })
      .catch((errors) => {
        debugger
      })
  }
}

export const addFlexHelperToProject = (token, payload) => {
  return(dispatch)=>{
    axios
      .post('http://localhost:4000/flexhelpers/', payload, { headers: {token: token }})
      .then(({data})=>{
        console.log('successfully added flexhelper')
        dispatch({
          type: 'ADD_SUCCESS',
          payload: 'Successfully added flexhelper'
        })

        dispatch({
          type: 'ADD_FLEX_TO_CURRENT_PROJ',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger
      })
  }
}

export const likeProject = (token, id, payload) => {
  return(dispatch)=>{
    axios
      .post(`http://localhost:4000/projects/${id}/like`, payload, { headers: { token: token }})
      .then(({data})=>{
        //?
        dispatch({
          type: 'SET_CURRENT_PROJECT',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger
      })
  }
}

export const submitComment = (token, id, payload) => {
  return(dispatch)=>{
    axios
      .post(`http://localhost:4000/projects/${id}/comment`, payload, { headers: { token: token }})
      .then(({data})=>{
        //?
        dispatch({
          type: 'SET_CURRENT_PROJECT',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger
      })
  }
}
