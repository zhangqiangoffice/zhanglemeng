import api from '../api'

export const RECEIVE_PAPERS = 'RECEIVE_PAPERS'

const receivepapers = papers => ({
  type: RECEIVE_PAPERS,
  papers: papers
})

export const getAllPapers = () => dispatch => {
  api.getPapers(res => {
    if (res.result === 1) {
      dispatch(receivePapers(res.list))
    } else {
      alert(res.message)
    } 
  })
}