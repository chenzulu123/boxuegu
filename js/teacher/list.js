//定义讲师列表模块
// 依赖text插件
define(['jquery', 'text!tpls/teacherList.html','template'], function ($, teacherListTpl,template) {
    //正常情况下、能够读取该模板，那么同样的可以通过依赖注入(形参)
    return function () {
        //发送ajax请求
        $.ajax({
            url: 'api/teacher',
            type: 'get',
            success: function (res) {
            //把数据放在表格中-->模板引擎
                // console.log(res.result);
                //把存有真实数据的表格放到页面中
                var html = template.render(teacherListTpl,res);
                $('.panel-content .panel-body').html(html);
            }
        });


    }
});