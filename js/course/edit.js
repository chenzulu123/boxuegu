define(["jquery", 'text!tpls/courseEdit.html', 'template','course/lessonEdit'], function ($, courseEditTpl, template,lessonEdit) {
    return function (id) {
        $.ajax({
            type: "get",
            url: "/api/course/lesson",
            data: { cs_id: id },
            success: function (res) {
                //容错处理
                if (res.code != 200) throw new Error(res.msg);
                var courseEdit = template.render(courseEditTpl, res.result);
                var $courseEdit = $(courseEdit).on('click', '.btn-add', function () {
                    alert('添加课时模块');
                });
                //给课时信息中的编辑按钮绑定事件
                $courseEdit.find('.btn-edit').on('click', function () {
                    var ct_id = $(this).parent().siblings('.ct_id').html();
                    lessonEdit(ct_id);
                });
                $('.panel-content .panel-body').html($courseEdit);
            }
        });
    }
});