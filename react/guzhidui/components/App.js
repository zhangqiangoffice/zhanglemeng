import React from 'react'
import TitleBarContainer from '../containers/TitleBarContainer'
import MainBody from './MainBody'
import LoadingContainer from '../containers/LoadingContainer'
import LoginBoxContainer from '../containers/LoginBoxContainer'

const App = () => (
  <div>
    <TitleBarContainer />
    <MainBody />
    <LoadingContainer />
    <LoginBoxContainer />

  </div>
)

export default App