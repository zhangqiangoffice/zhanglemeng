import { connect } from 'react-redux'
import { login, changeUsername, changePassword1, changePassword, checkUsername, closeBox } from '../actions'
import RegisterBox from '../components/RegisterBox'

const mapStateToProps = (state) => ({
  showRegisterBox: state.showRegisterBox,
  username: state.username,
  password: state.password,
})

const mapDispatchToProps = (dispatch, state) => ({
  onSubmit: () => {
    dispatch(login())
  },
  onCheckUsername: () => {
    dispatch(checkUsername())
  },
  onChangeUsername: (event) => {
    dispatch(changeUsername((event.target.value).trim()))
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
