import { connect } from 'react-redux'
import { askMorePapers } from '../actions'
import PaperList from '../components/PaperList'

const mapStateToProps = state => ({
  paperList: state.paperList,
  canAsking: state.canAsking,
})

const mapDispatchToProps = (dispatch) => ({
  onCheckMore: () => {
    dispatch(askMorePapers())
  }
})

const PaperListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaperList)

export default PaperListContainer
