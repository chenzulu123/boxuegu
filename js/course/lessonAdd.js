/**
 * 添加课程模块
 */
define(["jquery", "text!tpls/courseAdd.html", "template"], function ($, lessonAddTpl, template) {
    return function () {
        $("#modalAddCLesson").remove();
        //渲染模板
        var lessonAdd = template.render(lessonAddTpl);
        var $lessonAdd = $(lessonAdd).on('submit', 'form', function () {
            var formData = $(this).serialize();
            //提交数据  
            $.ajax({
                type: "post",
                url: "/api/course/create",
                data: formData,
                success: function (res) {
                    //容错处理
                    if (res.code != 200) throw new Error(res.msg);
                    $lessonAdd.modal('hide');
                    //模仿用户点击，刷新列表
                    $('.left .list-group .course-manager').trigger('click');
                }
            });
            return false;
        }).appendTo('body').modal();
    }
});