//定义讲师列表模块
// 依赖text插件
define(
    ['jquery',
        'text!tpls/teacherList.html',
        'template',
        'teacher/show',
        'teacher/add',
        'teacher/edit'
    ],
    function ($, teacherListTpl, template, teacherShow, teacherAdd, teacherEdit) {
        //正常情况下、能够读取该模板，那么同样的可以通过依赖注入(形参)
        return function () {
            //发送ajax请求
            $.ajax({
                url: 'api/teacher',
                type: 'get',
                success: function (res) {
                    //把数据放在表格中-->模板引擎
                    //把存有真实数据的表格放到页面中
                    var html = template.render(teacherListTpl, res);
                    //为动态元素添加绑定事件
                    var $teacherLisst = $(html).
                        //查看讲师信息
                        on('click', '.btn-show', function () {
                            var tc_id = $(this).parent().attr('tc_id');
                            teacherShow(tc_id);
                        }).
                        //添加讲师
                        on('click', '.btn-add', function () {
                            teacherAdd();
                        }).
                        //权限的启用/注销
                        on('click', '.btn-use', function () {
                            // 获取tc_id的值
                            var tc_id = $(this).parent().attr('tc_id');
                            // 获取状态的值
                            var tc_status = $(this).parent().attr('tc_status');
                            // console.log(tc_status);
                            //使用注销/启用模块
                            // 绑定事件的三要素   给谁绑定事件/事件类型/事件源
                            var $this = $(this);
                            $.ajax({
                                url: '/api/teacher/handle',
                                type: 'post',
                                data: {
                                    tc_id: tc_id,
                                    tc_status: tc_status
                                },
                                success: function (res) {
                                    if (res.code != 200) return console.log(res.msg);
                                    //这里没有使用列表刷新主要是因为这里更改的数据比较少，如果使用页面刷新的话会增加服务器的消耗
                                    //如果页面存在分页的情况时，也会导致所有的数据都会刷新，而是用这种方式，只需要修改几个地方的值，而且不需要刷新
                                    //这样不仅能减少服务器端资源浪费，并且不刷新可以提高用户的用户体验
                                    var tc_status = res.result.tc_status;
                                    $this.parent().siblings('.tc_status').text(tc_status == 0 ? '注销' : '启用');
                                    $this.text(tc_status == 0 ? '启用' : '注销');
                                    $this.parent().attr('tc_status', res.result.tc_status);
                                }
                            });
                            // teacherLogoff(tc_id, tc_status,$this);
                        }).
                        //编辑讲师
                        on('click', '.btn-edit', function () {
                            var tc_id = $(this).parent().attr('tc_id');
                            // alert('编辑按钮');
                            teacherEdit(tc_id);
                        });
                    $('.panel-content .panel-body').html($teacherLisst);
                    // 以上代码等同于:$('.panel-content .panel-body').empty().append($teacherLisst);
                }
            });
        }
    });