define(["jquery",'text!tpls/lessonInfo.html','template'], function($,lessonInfoTpl,template) {
  return function(id){
      $.ajax({
          type: "get",
          url: "/api/course/basic",
          data: {cs_id:id},
          success: function (res) {
            if(res.code!=200) throw new Error(res.msg);
            var lessonInfo = template.render(lessonInfoTpl,res.result);
            var $lessonInfo = $(lessonInfo).on('submit','form',function(e){
                //阻止submit事件的默认行为
                e.preventDefault();
                //获取表单数据
                var formData = $(this).serialize();
                $.ajax({
                    type: "post",
                    url: "/api/course/update/basic",
                    data: formData,
                    success: function (res) {
                        if(res.code!=200) throw new Error(res.msg);
                        $('.left .list-group .course-manager').trigger('click');
                    }
                });
            });
            $('.panel-content .panel-body').html($lessonInfo);
          }
      });
  }
});