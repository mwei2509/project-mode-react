let defaultState={
    all: []
  }

export const manageSkills = (state=defaultState, action) => {
  switch (action.type) {
    // case "ADD_SKILL":
    //   return Object.assign({}, state, {all: [...state.all, action.payload]})
    case "SET_SKILLS":
      return Object.assign({}, state, {
        all: action.payload
      })
    default:
      return state
  }
}
