define(["jquery", 'text!tpls/lessonInfo.html', 'template'], function ($, lessonInfoTpl, template) {
    return function (id) {
        $.ajax({
            type: "get",
            url: "/api/course/basic",
            data: { cs_id: id },
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var lessonInfo = template.render(lessonInfoTpl, res.result);
                var $lessonInfo = $(lessonInfo).on('submit', 'form', function (e) {
                    //阻止submit事件的默认行为
                    e.preventDefault();
                    //获取表单数据
                    var formData = $(this).serialize();
                    $.ajax({
                        type: "post",
                        url: "/api/course/update/basic",
                        data: formData,
                        success: function (res) {
                            if (res.code != 200) throw new Error(res.msg);
                            $('.left .list-group .course-manager').trigger('click');
                        }
                    });
                    //通过form表单的中的chgange事件来判定下拉框的状态改变
                }).on('change', '.category-top', function () {
                    //通过父类id获取子类元素 
                    var val = $(this).val();
                    $.ajax({
                        type: "get",
                        url: "/api/category/child",
                        data: {
                            cg_id: val
                        },
                        success: function (res) {
                            if (res.code != 200) throw new Error(res.msg)
                            var str = '';
                            res.result.forEach(function (v, i) {
                                //v表示的是值，i表示的是索引,进行dom元素拼接
                                str += "<option value='" + v.cg_id + "'>" + v.cg_name + "</option>"
                            });
                            //将动态拼接的数据加载到子类下拉列表中
                            $lessonInfo.find('.category-child').html(str);
                        }
                    });
                });
                $('.panel-content .panel-body').html($lessonInfo);
            }
        });
    }
});