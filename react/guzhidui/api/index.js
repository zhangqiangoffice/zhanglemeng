import zAJAX from 'z-ajax'

const _products = {result: 1, list: []}

export default {
  getPapers: (state, cb) => {
    let datas = {
      word: state.word,
      page: state.page
    }

    zAJAX('api/api001', datas, cb)

  },
}