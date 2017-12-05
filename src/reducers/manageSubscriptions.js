let defaultState={
    all: []
  }

export const manageSubscriptions = (state=defaultState, action) => {
  switch (action.type) {
    case "ADD_SUBSCRIPTION":
      return Object.assign({}, state, {all: [...state.all, action.payload]})
    case "SET_SUBSCRIPTIONS":
      return Object.assign({}, state, {
        all: action.payload
      })
    case "DELETE_SUBSCRIPTION":
      console.log('delete subscription')
      return Object.assign({}, state, { all: state.all.filter(sub => sub.id !== action.payload)})
    default:
      return state
  }
}
