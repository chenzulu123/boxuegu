require.config({
    baseUrl: "js",
    paths: {
        jquery: "./lib/jquery-2.1.4",
        bootstrap: '../assets/bootstrap/js/bootstrap'
    },
    //这里的设置是为了让bootstrap等待jQuery加载完成之后才使用jQuery模块
    shim: {
        bootstrap: {
            deps: ['jquery'],
        }
    },
});
//引入模块
require(["jquery","bootstrap"], function ($) {
    //这段话表示开启严格模式
    'use strict'
    
});
