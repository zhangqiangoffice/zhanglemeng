/**
 * 文件：相册脚本
 * 作者：无名大强
 * 版本：v0.1
 * 版权：张强
 * 日期：2016-7-21
**/

$(function(){

    //点击右侧页
    $('#right_sheet').click(function(){
        var id = $(this).data('i');
        getTwoPhotos(id, 1);
        
    });

    //点击左侧页
    $('#left_sheet').click(function(){
        var id = $(this).data('i');
        getTwoPhotos(id, 0);
        
    });


    /**
     * 函数：获取新的相片
     * 输入：
     * 输出：
    **/
    function getTwoPhotos(id, to) {
        $('.clip').fadeOut();
        console.log(to);
        $.ajax({
            type: "post",
            url: "/api/get_two_photos",
            data : {id: id, to: to},
            dataType: "json",
            success: function(msg) {
                // console.log(msg);
                if (msg.result.toString() === "1") {
                    var list = msg.list;
                    $('#left_sheet').find('img').attr('src',list[0].path);
                    $('#left_sheet').find('label').text(list[0].date);
                    $('#left_sheet').data('i', list[0].id);
                    $('#right_sheet').find('img').attr('src',list[1].path);
                    $('#right_sheet').find('label').text(list[1].date);
                    $('#right_sheet').data('i', list[1].id);
                } else {
                    alert(msg.message);
                }
                $('.clip').fadeIn();
            }
        });
    }
});