import React from 'react'
import { dateToString } from '../api'

const Paper = ({paper}) => (
  <li className="paper">
    <div className="top"><span className="author_name">{paper.author.name}</span></div>
    <div className="middle">
      <p>{paper.content}</p>
    </div>
    <div className="bottom">
      发布于：{dateToString(paper.date)}
      <span className="hide comments">添加评论</span>
    </div>  
  </li>
)

export default Paper