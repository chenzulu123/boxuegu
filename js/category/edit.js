/**
 * 编辑列表模块
 * 1、先通过ajax获取列表的数据
 * 2、使用text插件和template模板进行页面渲染
 * 3、用户点击提交按钮时，获取表单数据
 * 4、提交列表信息
 */
define(["jquery", 'text!tpls/categoryEdit.html', 'template'], function ($, categoryEditTpl, template) {
    return function (cg_id) {
        $('#modalEditCategory').remove();
        $.ajax({
            url: '/api/category/edit',
            type: 'get',
            data: {
                cg_id: cg_id
            },
            success: function (res) {
                //容错处理
                if (res.code != 200) throw new Error(res.msg);
                
                var categoryEdit = template.render(categoryEditTpl, res.result);
                var $categoryEdit = $(categoryEdit).on('submit', 'form', function () {
                    var formData = $(this).serialize();
                    $.ajax({
                        url: '/api/category/modify',
                        type: 'post',
                        data: formData,
                        success: function (res) {
                            //容错处理
                            if (res.code != 200) throw new Error(res.msg);
                            $categoryEdit.modal('hide');
                            //模拟用户点击刷新列表(页面不刷新)
                            $('.left .list-group .course-category').trigger('click');
                        }
                    });
                    return false;
                }).appendTo('body').modal();
            }
        });
    }
});