/**
 * 课程列表模块
 */
define(["jquery", 'text!tpls/courseList.html', 'template','course/edit','course/lessonInfo','course/image'], function ($, courseListTpl, template,courseEdit,lessonInfo,courseImg) {
    return function () {
        //请求数据
        $.ajax({
            url: '/api/course',
            type: 'get',
            success: function (res) {
                //容错处理
                if (res.code != 200) throw new Error(res.msg);
                var courseList = template.render(courseListTpl, res);
                var $courseList = $(courseList).on('click','.course-edit',function(){
                    // alert('编辑课时模块');
                    var cs_id = $(this).parent().parent().parent().parent().attr('cs_id');
                    // console.log();
                     courseEdit(cs_id);

                }).on('click','.info-edit',function(){
                    // alert('编辑基本信息模块');
                    var cs_id = $(this).parent().parent().parent().parent().attr('cs_id');
                    lessonInfo(cs_id);
                }).on('click','.upload-img',function(){
                    var cs_id = $(this).parent().parent().parent().attr('cs_id');
                    courseImg(cs_id);
                });
                $('.panel-content .panel-body').html($courseList);
            }
        });
    }
});