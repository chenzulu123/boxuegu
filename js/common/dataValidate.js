/**
 * 数据校验模块
 */
define(["jquery", "validate", "validateLang"], function ($) {
    return function (element) {
        $().ready(function () {
            $(element).validate({
                rules: {
                    tc_name: {
                        required: true,
                        minlength: 2,
                        maxlength: 10
                    },
                    tc_pass: {
                        required: true,
                        minlength: 5,
                        maxlength: 16
                    },
                    cs_name: {
                        required: true,
                    },
                    tc_join_date: {
                        required: true,
                    },
                    messages: {
                        tc_name: {
                            required: "请输入用户名！",
                            minlength: "用户名不能长度小于2个字符！",
                            maxlength: '用户名长度不能大于10个字符！'
                        },
                        tc_pass: {
                            required: "请输入密码！",
                            minlength: "密码长度不能小于5个字符！",
                            maxlength: '密码长度不能大于16个字符！'
                        },
                        cs_name: {
                            required: "请输入课程名称！",
                        },
                        tc_join_date:{
                            required: "请输入入职日期！",
                            date:true
                        }
                    }
                }
            });
        });
    }
});