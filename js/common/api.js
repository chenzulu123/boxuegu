/**
 * 进一步封装的aja方法
 */
define(["jquery"], function () {

    var obj = {
        /**
         * @param url 请求地址
         * @param type 请求类型
         * @param data 请求吧数据
         * @param callback 请求成功后执行的回调函数
         */
        ajax: function (url, type, data, callback) {
            $.ajax({
                url: "/api/" + url,
                type: type,
                data: data,
                success: function (res) {
                    if (res.code != 200) throw new Error(res.msg);
                    callback(res);
                }
            });
        }
    };
    var fns = "get,post".split(',');
    fns.forEach(function (fnName) {
        obj[fnName] = function (url, data, callback) {
            this.ajax(url, fnName, data, callback);
        }
    })
    return obj;
});