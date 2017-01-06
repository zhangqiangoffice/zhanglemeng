import zAJAX from 'z-ajax'

//获取纸条列表
export const getPapers = (state, cb) => {
  const datas = {
    word: state.word,
    page: state.page
  }

  zAJAX('api/getPapers', datas, cb)
}

//登录接口
export const login = (state, cb) => {
  const datas = {
    username: state.username,
    password: state.password
  }

  zAJAX('api/login', datas, cb)
}

//检查登录是否有效
export const check = (state, cb) => {
  const datas = {
    username: state.username,
  }

  zAJAX('api/check', datas, cb)
}

//提交新纸条
export const submitPaper = (state, cb) => {
  const datas = {
    paperContent: state.paperContent,
    key1: state.key1,
    key2: state.key2,
    key3: state.key3,
  }

  zAJAX('api/submitPaper', datas, cb)
}

//数字前补零
const tran_val = (val) => {
  if((val - 0) < 10){
    val = "0" + val;
  }
  return val;
}

//日期转字符串
export const dateToString = (time) => {
  const datenew = new Date(time); 

  const year = datenew.getFullYear(); 
  const month = tran_val(datenew.getMonth() + 1);
  const date = tran_val(datenew.getDate()); 
  const hour = tran_val(datenew.getHours());
  const minute = tran_val(datenew.getMinutes()); 

  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute;
}
