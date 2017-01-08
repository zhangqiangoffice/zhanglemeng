import React from 'react'

const TitleBar = ({hasLogin, name, word, onGoLogin, onGoWritePaper, onSearch, onChangeWord}) => (
  <div className="title_bar">
    <div className="bar_main">
      <span className="title">故纸堆</span>
      <input type="text" placeholder="搜索历史人物或者历史事件" value={word} onChange={onChangeWord}/><button className="search" type="button" onClick={onSearch}>搜索</button>
      <button type="button" className="write_paper" onClick={onGoWritePaper}>写纸条</button>
      <div className="user">{hasLogin ? <span>{name}</span> : <button type="button" onClick={onGoLogin}>登录</button>}</div>
    </div>
  </div>
)

export default TitleBar