import React from 'react'
import TitleBarContainer from '../containers/TitleBarContainer'
import MainBody from './MainBody'
import LoadingContainer from '../containers/LoadingContainer'
import LoginBoxContainer from '../containers/LoginBoxContainer'
import PaperBoxContainer from '../containers/PaperBoxContainer'

const App = () => (
  <div>
    <TitleBarContainer />
    <MainBody />
    <LoadingContainer />
    <LoginBoxContainer />
    <PaperBoxContainer />

  </div>
)

export default App