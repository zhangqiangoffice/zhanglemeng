const _products = {result: 1, list: []}

export default {
  getPapers: (cb) => setTimeout(() => cb(_products), 2000),
}