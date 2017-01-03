import React from 'react'

const TitleBar = ({hasLogin, name, onGoLogin}) => (
  <div className="title_bar">
    <div className="bar_main">
      <span className="title">故纸堆</span>
      <input type="text" placeholder="搜索历史人物或者历史事件"/><button className="search" type="button">搜索</button>
      <div className="user">{hasLogin ? <span>{name}</span> : <button type="button" onClick={onGoLogin}>登录</button>}</div>
    </div>
  </div>
)

export default TitleBar