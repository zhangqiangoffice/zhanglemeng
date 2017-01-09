import { connect } from 'react-redux'
import { goLogin, goWritePaper, changeWord, searchWord } from '../actions'
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
    dispatch(searchWord())
  },
  onChangeWord: (event) => {
    dispatch(changeWord((event.target.value).trim()))
  },
  onKeyUpEnter: (event) => {
    if (event.keyCode === 13) {
      dispatch(searchWord())
    }
  }
})
  
const TitleBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default TitleBarContainer
