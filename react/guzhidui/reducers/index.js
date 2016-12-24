import { combineReducers } from 'redux'

const postsByReddit = (state = { }, action) => {
  switch (action.type) {

    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsByReddit
})

export default rootReducer