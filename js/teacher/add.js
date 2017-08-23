define(["jquery",'text!tpls/teacherAdd.html','template'], function($,teacherAdd,template) {
    
    return function(){
    // var $teacherAdd = $(teacherAdd);
    // $teacherAdd.appendTo('body').modal();
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
    }
});