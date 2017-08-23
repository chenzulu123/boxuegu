/**
 * 课程列表模块
 */
define(["jquery", 'text!tpls/courseList.html', 'template'], function ($, courseListTpl, template) {
    return function () {
        //请求数据
        $.ajax({
            url: '/api/course',
            type: 'get',
            success: function (res) {
                //容错处理
                if (res.code != 200) throw new Error(res.msg);
                var courseList = template.render(courseListTpl, res);
                console.log(res);
                $('.panel-content .panel-body').html(courseList);
            }
        });
    }
});