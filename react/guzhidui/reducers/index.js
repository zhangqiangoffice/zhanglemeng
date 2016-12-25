import { combineReducers } from 'redux'

import {
  RECEIVE_PAPERS,
} from '../actions'

const data = {
  'qsh': [{author:{name: '姓名', id:'987'}, paper: {id:'456', content: '秦时明月汉时关，万里长征人未还', date: '2016-12-25'}}, {author:{name: '小七', id:'988'}, paper: {id:'457', content: '很久很久以前'}}]
}

const paperBase = (state = data, action) => {
  switch (action.type) {
    case RECEIVE_PAPERS:
      return state.concat(action.papers)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  paperBase
})

export default rootReducer