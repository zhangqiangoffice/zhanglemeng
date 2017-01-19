import { connect } from 'react-redux'
import { login, changeUsername, changePassword, closeBox } from '../actions'
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
  
const RegisterBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterBox)

export default RegisterBoxContainer
