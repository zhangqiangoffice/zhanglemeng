import { connect } from 'react-redux'
import { login, changeUsername, changePassword, closeBox } from '../actions'
import LoginBox from '../components/LoginBox'

const mapStateToProps = (state) => ({
  showLoginBox: state.showLoginBox,
  username: state.username,
  password: state.password,
})

const mapDispatchToProps = (dispatch, state) => ({
  onSubmit: () => {
    dispatch(login())
  },
  changeUsername: (event) => {
    dispatch(changeUsername((event.target.value).trim()))
  },
  changePassword: (event) => {
    dispatch(changePassword((event.target.value).trim()))
  },
  onClose: () => {
    dispatch(closeBox())
  }
})
  
const LoginBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox)

export default LoginBoxContainer
