import axios from 'axios'

//login

export function setChannel(channel, token, limit, offset){
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/channel/${channel}?limit=${limit}&offset=${offset}`,
        { headers: {token: token }})
      .then(({data})=>{
        dispatch({
          type: 'SET_CHANNEL',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger;
      })
  }
}

export function getSubscription(channel, token){
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/channel/${channel}/subscription`,
        { headers: {token: token }})
      .then(({data})=>{
        dispatch({
          type: 'SET_CHANNEL_SUBSCRIPTION',
          payload: data
        })
      })
      .catch((errors)=>{
        debugger;
      })
  }
}
