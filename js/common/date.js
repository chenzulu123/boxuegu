define(['jquery', "datetime", 'datetimeLang'], function ($) {
    return function (element) {
        $(element).datetimepicker({
            format: 'yyyy-mm-dd',       //指定日期显示格式
            language: "zh-CN",           //指定日期控件的语言-->需要导入相应的语言包
            weekStart: 1,        //1：周一：日期框的标题中一周从哪里开始
            //daysOfWeekDisabled:[1,2]        //1：周一和2：周二不能选择
            autoclose: true,         //当选择完毕一个时间之后就自动隐藏
            //startView:"year"      //当日期控件刚加载出来的时候就给用户看什么界面？year-->12个月   month-->"30天"
            minView: "month",        //可以看到的最小视图-->"month"那么就只能选择到几号
            todayBtn: true,          //在选择框下面将会出现一个今天的按钮
            todayHighlight: true     //高亮今天的日期
        });
    }
});