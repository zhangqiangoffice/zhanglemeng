import { combineReducers } from 'redux'

import {
  RECEIVE_PAPERS,
  GO_LOGIN
} from '../actions'

const data = {
  'qsh': [{author:{name: '姓名', id:'987'}, paper: {id:'456', content: '秦时明月汉时关，万里长征人未还', date: '2016-12-25'}}, {author:{name: '小七', id:'988'}, paper: {id:'457', content: '很久很久以前'}}]
}

//纸条列表数据库
const paperBase = (state = data, action) => {
  switch (action.type) {
    case RECEIVE_PAPERS:
      return state.qsh.concat(action.papers)
    default:
      return state
  }
}

//页数，分页获取纸条列表
const page = (state = 0, action) => {
  switch (action.type) {
    case RECEIVE_PAPERS:
      return ++state
    default:
      return state
  }
}

//标签关键字
const word = (state = '', action) => {
  switch (action.type) {
    case RECEIVE_PAPERS:
      return state
    default:
      return state
  }
}

//是否登录
const hasLogin = (state = false, action) => {
  switch (action.type) {
    case RECEIVE_PAPERS:
      return state
    default:
      return state
  }
}

//显隐加载中遮罩层
const isLoading = (state = false, action) => {
  switch (action.type) {
    case GO_LOGIN:
      return true
    default:
      return state
  }
}



const rootReducer = combineReducers({
  paperBase,
  page,
  word,
  hasLogin,
  isLoading,
})

export default rootReducer