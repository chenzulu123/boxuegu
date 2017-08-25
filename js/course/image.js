define(["jquery", 'text!tpls/courseImg.html', 'template', 'upload'], function ($, courseImgTpl, template) {
    return function (cs_id) {

        $.ajax({
            type: "get",
            url: "/api/course/picture",
            data: { cs_id: cs_id },
            success: function (res) {
                var courseImg = template.render(courseImgTpl,res.result);
                $('.panel-content .panel-body').html(courseImg);
                //使用上传图片插件实现图片的上传
                $('#uploadImg').uploadify({
                    //选择图片以后是否自动上传
                    auto:true,
                    fileObjName:'cs_cover_original',//上传文件的名称
                    //上传图片的文件格式
                    fileTypeExits:'*.jpg;*.png; *.gif',
                    //需要上传文件的额外参数
                    formData:{
                        cs_id:cs_id
                    },
                    itemTemplate:'<span></span>',
                    // 按钮的文本
                    buttonText:'选择图片',
                    swf:'/assets/uploadify/uploadify.swf',
                    // 上传图片请求的地址
                    uploader:'/api/uploader/cover',
                    //图片上传成功以后执行的操作
                    onUploadSuccess:function(){
                        $(".left .list-group .course-manager").trigger("click");
                    }

                });
            }
        });

    }
});