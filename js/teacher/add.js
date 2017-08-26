define(["jquery",'text!tpls/teacherAdd.html','template','common/date'], function($,teacherAdd,template,dateTool) {
    return function(){
    $("#modalAddTeacher").remove();
     var $teacherAdd = $(teacherAdd).on('submit','form',function(){
         var formData = $(this).serialize();
         console.log(formData);
        $.ajax({
            url:'/api/teacher/add',
            type:'post',
            data:formData,
            success:function(res){
              if(res.code!=200) return console.log(res.msg);
                //隐藏模态框
                $teacherAdd.modal('hide');
                // 模拟用户点击菜单实现自刷新
                $('.left .list-group .teacher-manager').trigger('click');
            }
        });
        return false;
     }).appendTo('body').modal();
     $().ready(function () {
        //日期控件的使用
        dateTool('#tc_join_date');
        //表单验证
        $("#dataValidate").validate({
            rules: {
                tc_name: {
                    required: true,
                    minlength: 2
                },
                tc_pass: {
                    required: true,
                    minlength: 5
                },
                tc_join_date: {
                    required: true,
                    date:true,
                },
                tc_gender: {
                    required: true,
                },
                tc_type: {
                    required: true,
                },
            },
            messages: {
                tc_name: {
                    required: "请输入用户名",
                    minlength: "用户名的长度不能小于2个字符"
                },
                tc_pass: {
                    required: "请输入密码",
                    minlength: "密码长度不能小于5个字符"
                },
                tc_join_date: {
                    required: "请输入入职日期",
                },
                tc_gender: {
                    required: "请输入性别",
                },
                tc_type: {
                    required: "请输入类型",
                },
                date: "请输入一个正确的日期",
            }
        });
    });
    }
});