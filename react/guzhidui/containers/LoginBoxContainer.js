import { connect } from 'react-redux'
import { goLogin } from '../actions'
import LoginBox from '../components/LoginBox'

const mapStateToProps = (state) => ({
  isLogining: state.isLogining
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
  
const LoginBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox)

export default LoginBoxContainer
