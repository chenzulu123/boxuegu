define(['jquery', 'text!/tpls/teacherShow.html', 'template'], function ($, teacherShowTpl, template) {
    return function (tc_id) {
        $.ajax({
            url: 'api/teacher/view',
            type: 'get',
            data: {
                tc_id: tc_id
            },
            success: function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                // if(res.code != 200) return console.log(res.msg);等价于上面的代码逻辑
                var teacherShow = template.render(teacherShowTpl,res.result);
                var $teacherShow = $(teacherShow);
                //清除页面存在的模态框，否则下面的加载会出现重复的情况
                //使用bootstrap的模态框框的时候需要注意的一些事项：
                // 1、模态框页面中不能出现注释、空格
                // 否则关闭的模态框是无法关闭，因为空格和注释节点的时候会多出遮罩层
                $('#modalShowTeacher').remove();
                $teacherShow.appendTo('body').modal();
            }
        });
    }
});