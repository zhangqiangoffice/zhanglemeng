import { connect } from 'react-redux'
import { goLogin, goWritePaper, changeWord } from '../actions'
import TitleBar from '../components/TitleBar'

const mapStateToProps = (state) => ({
  hasLogin: state.hasLogin,
  name: state.name,
  word: state.word,
})

const mapDispatchToProps = (dispatch, state) => ({
  onGoLogin: () => {
    dispatch(goLogin())
  },
  onGoWritePaper: () => {
    dispatch(goWritePaper())
  },
  onSearch: () => {
    // dispatch()
  },
  onChangeWord: (event) => {
    console.log((event.target.value).trim());
    dispatch(changeWord((event.target.value).trim()))
  }
})
  
const TitleBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default TitleBarContainer
