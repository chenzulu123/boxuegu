/**
 * 分类列表功能模块
 */
define(['jquery', 'text!tpls/categoryList.html', 'template', 'category/add', 'category/edit'], function ($, categoryList, template, categoryAdd, categoryEdit) {
    return function () {
        $.ajax({
            url: 'api/category',
            type: 'get',
            success: function (res) {
                //容错处理
                if (res.code != 200) throw new Error(res.msg);
                //把顶级分类的数据预加载到result数据中去
                var html = template.render(categoryList, res);
                var $categoryList = $(html).
                //列表编辑
                on('click', '.btn-edit', function () {
                    var cg_id = $(this).parent().parent().attr('cg_id');
                    categoryEdit(cg_id);
                }).
                //增加列表
                on('click', '.btn-add', function () {
                    categoryAdd();
                });
                $('.panel-content .panel-body').html($categoryList);
            }
        });
    }
});