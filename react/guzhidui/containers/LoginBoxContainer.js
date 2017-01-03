import { connect } from 'react-redux'
import { login, changeUsername, changePassword } from '../actions'
import LoginBox from '../components/LoginBox'

const mapStateToProps = (state) => ({
  isLogining: state.isLogining,
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
})
  
const LoginBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBox)

export default LoginBoxContainer
