import { connect } from 'react-redux'
import { goLogin, goWritePaper } from '../actions'
import TitleBar from '../components/TitleBar'

const mapStateToProps = (state) => ({
  hasLogin: state.hasLogin,
  name: state.name,
})

const mapDispatchToProps = (dispatch, state) => ({
  onGoLogin: () => {
    dispatch(goLogin())
  },
  onCheck: () => {
    dispatch(goWritePaper())
  }
})
  
const TitleBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default TitleBarContainer
