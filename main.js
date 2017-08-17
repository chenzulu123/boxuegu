require.config({
    baseUrl: "js",
    paths: {
        jquery: "./lib/jquery-2.1.4",
        bootstrap: '../assets/bootstrap/js/bootstrap',
        text:'lib/text',
        //配置模板文件夹路径
        tpls:'../tpls',
        //配置template文件路径
        template:'lib/template-web'
    },
    //这里的设置是为了让bootstrap等待jQuery加载完成之后才使用jQuery模块
    shim: {
        bootstrap: {
            deps: ['jquery'],
        }
    },
});
//引入模块
require(["jquery",'teacher/list',"bootstrap"], function ($,teacherList) {

    $('.left .list-group').on('click', '.list-group-item', function () {
        //已经实现点击不同菜单都会触发该回调函数
        // -->需求：判断到底是什么样的菜单？--->通过判断菜单类名
        if ($(this).hasClass("teacher-manager")) {
            teacherList();
        } else if ($(this).hasClass("course-manager")) {
            $('.panel-content .panel-body').html('课程管理');
        } else if ($(this).hasClass("course-category")) {
            $('.panel-content .panel-body').html('课程分类');
        } else if ($(this).hasClass("chart")) {
            $('.panel-content .panel-body').html('图表统计');
        }
        $(this).addClass('active').siblings().removeClass('active');
    });
    //希望页面一刷新的时候就加载讲师列表
    // --->当用户点击讲师管理系统才会加载讲师列表
    //    ---->解决方案：模拟用户点击见识管理菜单
    $('.left .list-group .teacher-manager').trigger('click');//触发讲师管理菜单的click事件
});
