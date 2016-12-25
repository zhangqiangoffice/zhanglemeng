import React from 'react'

const Paper = ({paperData}) => (
  <li className="paper">
    <div className="top"><span className="author_name">{paperData.author.name}</span></div>
    <div className="middle">
      <p>{paperData.paper.content}</p>
    </div>
    <div className="bottom">
      发布于：{paperData.paper.date}
      <span className="comments">添加评论</span>
    </div>  
  </li>
)

export default Paper