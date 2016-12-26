import api from '../api'

export const RECEIVE_PAPERS = 'RECEIVE_PAPERS'
export const END_ASKING = 'END_ASKING'

const receivepapers = papers => ({
  type: RECEIVE_PAPERS,
  papers: papers
})

export const getAllPapers = () => (dispatch, getState) => {
  api.getPapers(getState(), msg => {
    
    if (msg.result === 1) {
      dispatch(receivePapers(msg.list))
    } else {
      alert(msg.message)
    } 
  })
}