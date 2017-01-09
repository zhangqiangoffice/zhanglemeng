import * as api from '../api'

export const RECEIVE_PAPERS = 'RECEIVE_PAPERS'
export const END_ASKING = 'END_ASKING'
export const GO_LOGIN = 'GO_LOGIN'
export const CHANGE_USERNAME = 'CHANGE_USERNAME'
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const INIT_LOCAL_STORAGE = 'INIT_LOCAL_STORAGE'
export const SHOW_PAPER_BOX = 'SHOW_PAPER_BOX'
export const CHANGE_PAPER_CONTENT = 'CHANGE_PAPER_CONTENT'
export const CHANGE_KEY1 = 'CHANGE_KEY1'
export const CHANGE_KEY2 = 'CHANGE_KEY2'
export const CHANGE_KEY3 = 'CHANGE_KEY3'
export const CHANGE_WORD = 'CHANGE_WORD'
export const SEARCH_WORD = 'SEARCH_WORD'
export const SHOW_LOADING = 'SHOW_LOADING'

//获取纸条列表
const receivePapers = (first, papers, word) => ({
  type: RECEIVE_PAPERS,
  first,
  papers,
  word,
})

//首次打开页面，获取纸条，初始化登录值
export const getAllPapers = () => (dispatch, getState) => { 
  
  //从本地获取用户信息
  let has = window.localStorage.gzd_has
  if (has) {
    let name = window.localStorage.gzd_name
    let username = window.localStorage.gzd_username
    dispatch(initLocalStorage(name, username))
  }

  //请求首页纸条列表
  api.getPapers(true, getState(), msg => {
    
    if (msg.result === 1) {
      dispatch(receivePapers(true, msg.list, msg.word))
    } else {
      alert(msg.message)
    } 
  })
}

//点击搜索按钮
export const searchWord = () => (dispatch, getState) => { 
  dispatch(showLoading());

  api.getPapers(true, getState(), msg => {
    
    if (msg.result === 1) {
      dispatch(receivePapers(true, msg.list , msg.word))
    } else {
      alert(msg.message)
    } 
  })
}

//点击登录按钮，打开登录框
export const goLogin = () => ({
  type: GO_LOGIN,
})

//显示遮罩层
export const showLoading = () => ({
  type: SHOW_LOADING,
})

//点击登录提交按钮
export const login = () => (dispatch, getState) => {
  dispatch(showLoading());

  api.login(getState(), msg => {
    
    if (msg.result === 1) {
      window.localStorage.gzd_has = true
      window.localStorage.gzd_name = msg.name
      window.localStorage.gzd_username = msg.username

      dispatch(loginSuccess(msg.name))
    } else {
      alert(msg.message)
      dispatch(goLogin())
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

//检查是否登录，未登录则登录，已登录则打开发纸条框
export const goWritePaper = () => (dispatch, getState) => {
  api.check(getState(), msg => {
    
    if (msg.result === 1) {
      if (msg.check) {
        dispatch(showPaperBox())
      } else {
        dispatch(goLogin())
      }
    } else {
      alert(msg.message)
    } 
  })
}

//显示写纸条输入框
export const showPaperBox = () => ({
  type: SHOW_PAPER_BOX,
})

//编辑写纸条的内容
export const changePaperContent = (val) => ({
  type: CHANGE_PAPER_CONTENT,
  val,
})

//编辑写标签1的内容
export const changeKey1 = (val) => ({
  type: CHANGE_KEY1,
  val,
})

//编辑写标签2的内容
export const changeKey2 = (val) => ({
  type: CHANGE_KEY2,
  val,
})

//编辑写标签3的内容
export const changeKey3 = (val) => ({
  type: CHANGE_KEY3,
  val,
})

//发表新纸条
export const submitPaper = () => (dispatch, getState) => {
  api.submitPaper(getState(), msg => {
    
    if (msg.result === 1) {
      // dispatch(loginSuccess(msg.name))
    } else {
      alert(msg.message)
    } 
  })
}

//修改搜索关键字
export const changeWord = (word) => ({
  type: CHANGE_WORD,
  word,
})

