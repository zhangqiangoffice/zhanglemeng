import { combineReducers } from 'redux'

import * as act from '../actions'

//纸条列表
const paperList = (state = [], action) => {
  switch (action.type) {
    case act.RECEIVE_PAPERS:
      return state.concat(action.papers)
    default:
      return state
  }
}

//页数，分页获取纸条列表
const page = (state = 0, action) => {
  switch (action.type) {
    case act.RECEIVE_PAPERS:
      return ++state
    default:
      return state
  }
}

//标签关键字
const word = (state = '', action) => {
  switch (action.type) {
    case act.RECEIVE_PAPERS:
      return state
    default:
      return state
  }
}

//是否已经登录
const hasLogin = (state = false, action) => {
  switch (action.type) {
    case act.LOGIN_SUCCESS:
    case act.INIT_LOCAL_STORAGE:
      return true
    default:
      return state
  }
}

//是否显示登陆框正在登陆
const isLogining = (state = false, action) => {
  switch (action.type) {
    case act.GO_LOGIN:
      return true
    case act.LOGIN_SUCCESS:
      return false
    default:
      return state
  }
}

//显隐加载中遮罩层
const isLoading = (state = false, action) => {
  switch (action.type) {
    case act.GO_LOGIN:
    case act.SHOW_PAPER_BOX:
      return true
    case act.LOGIN_SUCCESS:
      return false
    default:
      return state
  }
}

//登录用户名
const username = (state = '', action) => {
  switch (action.type) {
    case act.CHANGE_USERNAME:
    case act.INIT_LOCAL_STORAGE:
      return action.username
    default:
      return state
  }
}

//登录密码
const password = (state = '', action) => {
  switch (action.type) {
    case act.CHANGE_PASSWORD:
      return action.val
    case act.LOGIN_SUCCESS:
      return ''
    default:
      return state
  }
}

//姓名
const name = (state = '', action) => {
  switch (action.type) {
    case act.LOGIN_SUCCESS:
    case act.INIT_LOCAL_STORAGE:
      return action.name
    default:
      return state
  }
}

//是否显示写纸条框
const showPaperBox = (state = false, action) => {
  switch (action.type) {
    case act.SHOW_PAPER_BOX:
      return true
    default:
      return state
  }
}

//新写纸条的内容
const paperContent = (state = '', action) => {
  switch (action.type) {
    case act.CHANGE_PAPER_CONTENT:
      return action.val
    default:
      return state
  }
}

const rootReducer = combineReducers({
  paperList,
  page,
  word,
  hasLogin,
  isLoading,
  isLogining,
  username,
  password,
  name,
  showPaperBox,
  paperContent,
})

export default rootReducer