import { connect } from 'react-redux'
import { goLogin } from '../actions'
import TitleBar from '../components/TitleBar'

const mapStateToProps = (state) => ({
  hasLogin: state.hasLogin,
  userName: state.userName,
})

const mapDispatchToProps = (dispatch, state) => ({
  onGoLogin: () => {
    console.log(123);
    dispatch(goLogin())
  }
  // onClick: (comId, comName) => {
  //   dispatch(changeInsuranceCom(comId, comName))
  //   if (comId !== 1) {
  //     dispatch(askOrders())
  //   }
  // }
})
  
const TitleBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TitleBar)

export default TitleBarContainer
