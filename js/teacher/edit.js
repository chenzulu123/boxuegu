/**
 * 用户编辑模块，通过用户id修改(先通过tc_id获取用户信息)用户的信息
 */
define(["jquery", 'text!/tpls/teacherEdit.html', 'template'], function ($, teacherEditTpl, template) {

  return function (id) {
    $.ajax({
      url: 'api/teacher/edit',
      type: 'get',
      data: {
        tc_id: id
      },
      success: function (res) {
        if (res.code != 200) throw new Error(res.msg);
        //渲染模板
        $('#modalEditTeacher').remove();
        var teacherEdit = template.render(teacherEditTpl, res.result);
        //加载模态框之前，删除页面上的模态框，确保页面永远只有一个模态框
        var $teacherEdit = $(teacherEdit).on('submit', 'form', function () {
          //获取表单上的数据(使用序列化)
          var formData = $(this).serialize();
          $.ajax({
            url: 'api/teacher/update',
            type: 'post',
            data: formData,
            success: function (res) {
              //容错处理
              if (res.code != 200) throw new Error(res.msg);
              //数据提交成功以后，隐藏模态框
              $teacherEdit.modal('hide');
              //模拟用户点击，自刷新页面
              $('.left .list-group .teacher-manager').trigger('click');
            }
          });
          //阻止submit事件的默认行为
          return false;
          //把模态框添加到页面中去
        }).appendTo('body').modal()
      }
    });
  }
});