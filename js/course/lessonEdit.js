/**
 * 课时编辑模块
 */
define(["jquery",'text!tpls/lessonEdit.html','template'], function($,lessonEditTpl,template) {
  return function(id){
      $('#modalEditLesson').remove();
      $.ajax({
          type: "get",
          url: "/api/course/chapter/edit",
          data:{ct_id:id},
          success: function (res) {
              if(res.code!=200) throw new Error(res.msg);
                var lessonEdit = template.render(lessonEditTpl,res.result);
                var $lessonEdit = $(lessonEdit).on('submit','form',function(e){
                    //阻止submit的默认行为,效果和return false是一样的
                    e.preventDefault();
                    var formData = $(this).serialize();
                    $.ajax({
                        type: "post",
                        url: "/api/course/chapter/modify",
                        data: formData,
                        success: function (res) {
                            if(res.code!=200) throw new Error(res.msg);
                            // console.log('数据提交成功！');
                            $lessonEdit.modal('hide');
                            $('.left .list-group .course-manager').trigger('click');
                        }
                    });
                }).appendTo('body').modal();
          }
      });
  }
});