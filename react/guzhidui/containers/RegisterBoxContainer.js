import { connect } from 'react-redux'
import { login, changeUsername, changeName, changePassword1, changePassword, checkUsername, passwordNotSame, register, closeBox } from '../actions'
import RegisterBox from '../components/RegisterBox'

const mapStateToProps = (state) => ({
  showRegisterBox: state.showRegisterBox,
  username: state.username,
  password: state.password,
  showRegisterTips: state.showRegisterTips,
  registerTips: state.registerTips,
})

const mapDispatchToProps = (dispatch, state) => ({
  onCheckSame: (p, p1) => {
    if (p === p1) {
      dispatch(register())
    } else {
      dispatch(passwordNotSame())
    }
  },
  onCheckUsername: () => {
    dispatch(checkUsername())
  },
  onChangeUsername: (event) => {
    dispatch(changeUsername((event.target.value).trim()))
  },
  onChangeName: (event) => {
    dispatch(changeName((event.target.value).trim()))
  },
  onChangePassword1: (event) => {
    dispatch(changePassword1((event.target.value).trim()))
  },
  onChangePassword: (event) => {
    dispatch(changePassword((event.target.value).trim()))
  },
  onClose: () => {
    dispatch(closeBox())
  }
})
  
const RegisterBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterBox)

export default RegisterBoxContainer
