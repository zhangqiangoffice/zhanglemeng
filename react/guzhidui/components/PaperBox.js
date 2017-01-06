import React from 'react';

const LoginBox = ({showPaperBox, paperContent, key1, key2, key3, onChangeKey1, onChangeKey2, onChangeKey3, onChangePaperContent, onSubmitPaper}) => {
  if (!showPaperBox) {
    return null;
  }

  return (
    <div className="paper_box">
      <textarea value={paperContent} onChange={onChangePaperContent} placeholder="关于历史的一个故事 ... ..."></textarea>
      <ul>
        <li><input type="text" placeholder="标签1" value={key1} onChange={onChangeKey1}/></li>
        <li><input type="text" placeholder="标签2" value={key2} onChange={onChangeKey2}/></li>
        <li><input type="text" placeholder="标签3" value={key3} onChange={onChangeKey3}/></li>
      </ul>
      <button type="button" onClick={onSubmitPaper}>提交</button>
    </div>
  );
}

export default LoginBox