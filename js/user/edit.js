/**
 * 编辑用户信息
 */
define(['jquery', 'text!tpls/userEdit.html', 'template', 'ueAll'], function ($, userEditTpl, template) {
    return function () {
        $.ajax({
            url: '/api/teacher/profile',
            type: 'get',
            success: function (res) {
                //容错处理
                if (res.code != 200) throw new Error(res.msg);
                //渲染模板数据
                var userEdit = template.render(userEditTpl, res.result);
                //移除页面上的模态框，确保页面只有一个模态框
                $('#modalEditUser').remove();
                var $userEdit = $(userEdit).on('submit', 'form', function () {
                    //通过序列化，获取表单数据 
                    var formData = $(this).serialize();
                    $.ajax({
                        url: '/api/teacher/modify',
                        type: 'post',
                        data: formData,
                        success: function (res) {
                            //容错处理
                            if (res.code != 200) throw new Error(res.msg);
                            $userEdit.modal('hide');
                            //    location.href = '/';  '/'表示的是网站的根目录
                            //    location.href = '/index.html';
                            location.reload();//页面刷新
                        }
                    });
                    //阻止submit的默认行为
                    return false;
                }).appendTo('body').modal();
                //初始化富文本编辑器
                // 使用之前删除原来有的富文本编辑器，否则再次打开富文本编辑器的时候会报错
                UE.delEditor('ueContainer');
                var ue = UE.getEditor('ueContainer');
                ue.ready(function () {
                    //设置富文本编辑器的内容
                    ue.setContent(res.result.tc_introduce);
                });
            }
        });
    }
});