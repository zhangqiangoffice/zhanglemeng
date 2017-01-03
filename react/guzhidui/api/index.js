import zAJAX from 'z-ajax'

const _products = {result: 1, list: []}

export const getPapers = (state, cb) => {
  let datas = {
    word: state.word,
    page: state.page
  }

  zAJAX('api/getPapers', datas, cb)
}

export const login = (state, cb) => {
  let datas = {
    username: state.username,
    password: state.password
  }

  zAJAX('api/login', datas, cb)
}