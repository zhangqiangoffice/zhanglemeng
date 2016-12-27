import React from 'react'
import TitleBarContainer from '../containers/TitleBarContainer'
import MainBody from './MainBody'
import LoadingContainer from '../containers/LoadingContainer'

const App = () => (
  <div>
    <TitleBarContainer />
    <MainBody />
    <LoadingContainer />

  </div>
)

export default App