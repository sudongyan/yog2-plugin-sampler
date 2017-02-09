/* eslint-disable */
/**
 * @file yog2/plugins/sampler 的配置
 * @author sudongyan<sudongyan@baidu.com>
 */
module.exports.sampler = {
    // enabled: false,
    // featrues:[
    // {
        // desc: 'featrue 的描述，如：https 小流量发布',
        // enabled: true,
        // filter: {
            // idc: '',
            // ip: '',
            // date: '2016-07-10 00:01:00 | 2017-04-13 23:45:00' ,

            // headers: function (header) {
                // if(typeof header != 'object') {
                    // return;
                // }
                // return (1 != header['x-ssl-header']);
            // },
            // host: 'yd.baidu.com',
            // protocol: '',
            // port: '',
            // search: '',
            // referer: '',
            // cookie: '',
            // ua: '',
            // path: /^(?!.*?\.(png|jpg|jpeg|gif|css|js|json|map|svg|ico|swf|flv|apk|woff|eot|ttf|tif|tiff|mp3|ogg|mp4)$)/gi
        // },
        // percent: 1,
        // redirect: {
            // status: 307,
            // url: function (location) {
                // return 'https://' + location.host + location.pathname + location.search
            // }
        // },
        // flags: ['a=====','b=====']
    // },
     // {
         // enabled: true,
         // filter: {
             // idc: '',
             // ip: '',

             // headers: function (header) {
                 // if(typeof header != 'object') {
                     // return;
                 // }
                 // return (1 != header['x-ssl-header']);
             // },
             // host: 'yd.baidu.com',
             // protocol: '',
             // port: '',
             // search: '',
             // referer: '',
             // cookie: '',
             // ua: '',
             // path: /^(?!.*?\.(png|jpg|jpeg|gif|css|js|svg|ico|swf|flv|apk|woff|eot|ttf|tif|tiff|mp3|ogg|mp4)$)/gi
         // },
         // percent: 1,
 // //        redirect: {
 // //            status: 307,
 // //            url: function (location) {
 // //                return 'https://' + location.host + location.pathname + location.search
 // //            }
 // //        },
         // flags: ['c=====','d=====','d=====']
     // },
     // {
         // enabled: true,
         // filter:{
             // path: /^(?!.*?\.(png|jpg|jpeg|gif|css|js|json|map|svg|ico|swf|flv|apk|woff|eot|ttf|tif|tiff|mp3|ogg|mp4)$)/gi
         // },
         // percent: 1,
         // flags: 'e====='
     // }
     // ]
 };

// module.exports.sampler = {
    // enabled: true,
    // featrues:[
    // {
        // desc: 'wap站点，yd.baidu.com域名的http到https的小流量跳转。sudongyan@baidu.com',
        // enabled: true,
        // filter: {
            // host: 'yd.baidu.com',
            // protocol: 'http',
            // cookie: /\;?\s?USESSL=1\;?/g,
            // ua: /^(?!.*?YUEDU\-NA)/g,
            // path: /^(?!.*?\.(png|jpg|jpeg|gif|css|js|json|map|svg|ico|swf|flv|apk|woff|eot|ttf|tif|tiff|mp3|ogg|mp4)$)/gi
        // },
        // percent: 1,
        // redirect: {
            // status: 307,
            // url: function (location) {
                // return 'https://' + location.host + location.pathname + location.search
            // }
        // }
    // }
    // ]
 // };
