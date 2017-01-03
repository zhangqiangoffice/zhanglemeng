import React from 'react';

const LoginBox = ({isLogining}) => {
  if (!isLogining) {
    return null;
  }

  return (
    <div className="login_box">
      <div>
        <table>
          <tbody>
            <tr>
              <td>账号：</td>
              <td>
                <input type="text" id="username" placeholder="请输入手机、邮箱或身份证"></input>
              </td>
            </tr>
            <tr>
              <td>密码：</td>
              <td><input type="password" id="password" /></td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="button" id="login">登录</button>
              </td>
            </tr>
          </tbody>
        </table> 
      </div>
    </div>
  );
}

export default LoginBox