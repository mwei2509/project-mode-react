let defaultState = {
  category: {},
  skill: {},
  projects: [],
  has_skill: false,
  is_subscribed: false
}
export const manageChannel = (state=defaultState, action) => {
  switch (action.type) {
    case "SET_CHANNEL":
      return Object.assign({}, state, action.payload)
    case "SET_CHANNEL_SUBSCRIPTION":
      return Object.assign({}, state, {is_subscribed: action.payload.subscription})
    default:
      return state
  }
}
