/**
 * 文件：公共函数
 * 作者：无名小强
 * 版本：v0.1
 * 日期：2016-12-02
**/

//获取当前时间字符串
function nowString() {
    var time = new Date();
    var year = time.getFullYear();
    var month = addZero(time.getMonth() + 1);
    var day = addZero(time.getDate());
    var hour = addZero(time.getHours());
    var minute = addZero(time.getMinutes());
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    // body...
}

//补充时间字符的前导0
function addZero(num) {
    var no = num - 0;
    if (no < 10) {
        no = '0' + no;
    } else {
        no = '' + no;
    }
    return no;
}
