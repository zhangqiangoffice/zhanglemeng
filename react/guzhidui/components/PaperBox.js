import React from 'react';

const LoginBox = ({showPaperBox, paperContent, onChangePaperContent, onSubmitPaper}) => {
  if (!showPaperBox) {
    return null;
  }

  return (
    <div className="paper_box">
      <textarea value={paperContent} onChange={onChangePaperContent} placeholder="关于历史的一个故事 ... ..."></textarea>
      <button type="button" onClick={onSubmitPaper}>提交</button>
    </div>
  );
}

export default LoginBox