import React from 'react'
import KeyWord from './KeyWord'
import PaperList from './PaperList'

const MainBody = () => (
  <div className="main_body">
    <div className="left_body">
      <KeyWord word="秦始皇"/>
      <PaperList />

    </div>
    <div className="right_body"></div>
  </div>
)

export default MainBody