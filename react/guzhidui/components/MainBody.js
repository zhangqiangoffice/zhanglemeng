import React from 'react'
import KeyWord from './KeyWord'
import PaperListContainer from '../containers/PaperListContainer'

const MainBody = () => (
  <div className="main_body">
    <div className="left_body">
      <KeyWord word=""/>
      <PaperListContainer />

    </div>
    <div className="right_body"></div>
  </div>
)

export default MainBody