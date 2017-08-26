/**
 * 编辑列表模块
 * 1、先通过ajax获取列表的数据
 * 2、使用text插件和template模板进行页面渲染
 * 3、用户点击提交按钮时，获取表单数据
 * 4、提交列表信息
 */
define(["jquery", 'text!tpls/categoryEdit.html', 'template', 'common/api'], function ($, categoryEditTpl, template, api) {
    return function (cg_id) {
        $('#modalEditCategory').remove();
        //获取需要修改的数据
        api.get('category/edit', { cg_id: cg_id }, function (res) {
            var categoryEdit = template.render(categoryEditTpl, res.result);
            var $categoryEdit = $(categoryEdit).on('submit', 'form', function () {
                var formData = $(this).serialize();
                //提交修改的数据
                api.post('category/modify', formData, function (res) {
                    $categoryEdit.modal('hide');
                    //模拟用户点击刷新列表(页面不刷新)
                    $('.left .list-group .course-category').trigger('click');
                });
                return false;
            }).appendTo('body').modal();
        });
    }
});