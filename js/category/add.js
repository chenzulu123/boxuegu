/**
 * 添加分类模块
 */
define(["jquery", 'text!tpls/categoryAdd.html', 'template'], function ($, categoryAddTpl, template) {
    return function () {
        //移除页面模态框的内容
        $('#modalAddCategory').remove();
        //获得顶级列表
        $.ajax({
            type: "get",
            url: "/api/category/top",
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                res.result.unshift({ cg_id: 0, cg_name: '顶级分类' });
                var categoryAdd = template.render(categoryAddTpl, res);
                var $categoryAdd = $(categoryAdd).on('submit', 'form', function () {
                    //通过序列化，获取表单数据
                    var formData = $(this).serialize();
                    $.ajax({
                        url: '/api/category/add',
                        type: 'post',
                        data: formData,
                        success: function (res) {
                            if (res.code != 200) throw new Error(res.msg);
                            //隐藏模态框
                            $categoryAdd.modal('hide');
                            $('.left .list-group .course-category').trigger('click');
                        }
                    });
                    //阻止submit的默认行为，把同步表单变为异步表单
                    return false;
                }).appendTo('body').modal();
            }
        });
    }
});