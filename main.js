require.config({
    baseUrl: "js",
    paths: {
        jquery: "./lib/jquery-2.1.4",
        bootstrap: '../assets/bootstrap/js/bootstrap',
        text: 'lib/text',
        //配置模板文件夹路径
        tpls: '../tpls',
        //配置template文件路径
        template: 'lib/template-web'
    },
    //这里的设置是为了让bootstrap等待jQuery加载完成之后才使用jQuery模块
    shim: {
        bootstrap: {
            deps: ['jquery']
        }
    },
});
//引入模块
require(["jquery", 'teacher/list', 'category/list', 'user/edit','course/list','course/lessonAdd', "bootstrap"], function ($, teacherList, categoryList, userEdit,courseList,lessonAdd) {
    // 验证用户是否登陆过，如果用户没有登录过的话，需要跳转到登录页面
    var userInfoStr = sessionStorage.getItem('userInfo');
    var userInfo = JSON.parse(userInfoStr);//将JSON字符串转换成JSON对象
    // 判断用户被是否已经登录
    if (!userInfo) {
        location.href = 'login.html';
    }
    // 设置用户头像和用户名
    $('.profile img').attr('src', userInfo.tc_avatar);
    $('.left h4').html(userInfo.tc_name);
    //菜单栏
    $('.left .list-group').on('click', '.list-group-item', function () {
        //已经实现点击不同菜单都会触发该回调函数
        // -->需求：判断到底是什么样的菜单？--->通过判断菜单类名
        // 教师列表
        if ($(this).hasClass("teacher-manager")) {
            teacherList();
        //课程列表
        } else if ($(this).hasClass("course-manager")) {
            // $('.panel-content .panel-body').html('课程管理');
            courseList();
        //分列列表 
        } else if ($(this).hasClass("course-add")){
            // alert('添加课程模块');
            lessonAdd();
        }else if ($(this).hasClass("course-category")) {
            categoryList();
        //图标
        } else if ($(this).hasClass("chart")) {
            $('.panel-content .panel-body').html('图表统计');
        }
        //---为菜单切换的时候，添加样式》
        $(this).addClass('active').siblings().removeClass('active');
    });

    //个人中心(查看当前登录用户的信息)
    $('.right .panel-top .person-center').on('click', function () {
        userEdit();
    });
    //希望页面一刷新的时候就加载讲师列表
    // --->当用户点击讲师管理系统才会加载讲师列表
    //    ---->解决方案：模拟用户点击讲师管理菜单
    $('.left .list-group .teacher-manager').trigger('click');//触发讲师管理菜单的click事件
    //用户退出登录，直接跳转到登录页面
    $('.right .panel-top .logOut').on('click', function () {
        $.ajax({
            url: '/api/logout',
            type: 'post',
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    //移除页面的用户信息
                    sessionStorage.removeItem('userInfo');
                    // 并且跳转到登录页面
                    location.href = 'login.html';
                }
            }
        });
    })
});
