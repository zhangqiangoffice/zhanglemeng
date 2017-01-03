import * as api from '../api'

export const RECEIVE_PAPERS = 'RECEIVE_PAPERS'
export const END_ASKING = 'END_ASKING'
export const GO_LOGIN = 'GO_LOGIN'
export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const INIT_LOCAL_STORAGE = 'INIT_LOCAL_STORAGE'



//获取纸条列表
const receivePapers = papers => ({
  type: RECEIVE_PAPERS,
  papers: papers
})

export const getAllPapers = () => (dispatch, getState) => { 
  let has = window.localStorage.gzd_has
  let name = window.localStorage.gzd_name
  let username = window.localStorage.gzd_username

  if (has) {
    dispatch(initLocalStorage(name, username))
  }

  api.getPapers(getState(), msg => {
    
    if (msg.result === 1) {
      // dispatch(receivePapers(msg.list))
    } else {
      alert(msg.message)
    } 
  })
}

//点击登录按钮，打开登录框
export const goLogin = () => ({
  type: GO_LOGIN,
})

//点击登录提交按钮
export const login = () => (dispatch, getState) => {
  api.login(getState(), msg => {
    
    if (msg.result === 1) {
      window.localStorage.gzd_has = true
      window.localStorage.gzd_name = msg.name
      window.localStorage.gzd_username = msg.username

      dispatch(loginSuccess(msg.name))
    } else {
      alert(msg.message)
    } 
  })
}

//输入账号
export const changeUsername = (username) => ({
  type: CHANGE_USERNAME,
  username,
})

//输入密码
export const changePassword = (val) => ({
  type: CHANGE_PASSWORD,
  val,
})

//登录成功
export const loginSuccess = (name) => ({
  type: LOGIN_SUCCESS,
  name,
})

//打开页面，检查本地是否有存用户名
export const initLocalStorage = (name, username) => ({
  type: INIT_LOCAL_STORAGE,
  name,
  username,
})