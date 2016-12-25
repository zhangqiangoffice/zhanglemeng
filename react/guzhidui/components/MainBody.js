import React from 'react'
import KeyWord from './KeyWord'
import PapersContainer from '../containers/PapersContainer'

const MainBody = () => (
  <div className="main_body">
    <div className="left_body">
      <KeyWord word="秦始皇"/>
      <PapersContainer />

    </div>
    <div className="right_body"></div>
  </div>
)

export default MainBody