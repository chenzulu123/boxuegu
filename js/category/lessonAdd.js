/**
 * 添加课程模块
 */
define(["jquery", "text!tpls/lessonAdd.html", "template"], function ($, lessonAddTpl, template) {
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
                    if (res.code != 200) throw new Error(res.msg);
                    $lessonAdd.modal('hide');
                }
            });
            return false;
        }).appendTo('body').modal();
    }
});