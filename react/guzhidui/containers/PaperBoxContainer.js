import { connect } from 'react-redux'
import { changePaperContent, submitPaper } from '../actions'
import PaperBox from '../components/PaperBox'

const mapStateToProps = (state) => ({
  showPaperBox: state.showPaperBox,
  paperContent: state.paperContent,
})

const mapDispatchToProps = (dispatch, state) => ({
  onChangePaperContent: (event) => {
    dispatch(changePaperContent((event.target.value).trim()))
  },
  onSubmitPaper: () => {
    dispatch(submitPaper())
  },
})
  
const PaperBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaperBox)

export default PaperBoxContainer
