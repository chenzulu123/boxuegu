define(["text!tpls/chart.html", 'echarts'], function (chartTpl, echarts) {
    return function () {
        $.ajax({
            type: "get",
            url: "/api/teacher",
            success: function (res) {
                if (res.code != 200) throw new Error(res.msg);
                var count = [{
                    name: '男', value: 0
                }, {
                    name: '女', value: 0
                }];
                //统计男女教师的人数
                res.result.forEach(function (v) {
                    if (v.tc_gender == 0) {
                        count[0].value++
                    }
                    else {
                        count[1].value++
                    }
                });
                var chart = $(chartTpl);
                $('.panel-content .panel-body').html(chart);
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById('main'));
                // 指定图表的配置项和数据
                var option = {
                    title: {
                        text: '教师男女比例',
                        subtext: '数据仅供参考',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        //返回一个新数组
                        data: count.map(function (v) {
                            return v.name;
                        })
                    },
                    series: [
                        {
                            name: '数据占比',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: count,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            }
        });
    }
});