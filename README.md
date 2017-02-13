# sampler (https request 抽样器)
用于小流量发布，灰度上线，A/B test, 跳转控制等场景的辅助

## 安装
> yog2 plugin install https://github.com/sudongyan/yog2-plugin-sampler

## 功能说明
![处理过程](http://s0.nuomi.bdimg.com/img/yog2-sampler.jpg)
> 如上图所示，sampler 会在router 前对req 进行筛选过滤，在过滤后可以进一步对req进行百分比选择，最终可以在与拣出req相对应的res上进行跳转或打标签的操作。

### 配置接口


    // yog2/conf/plugins/sampler.js
    module.exports.sampler = {
        enabled: false, // type: {bool} 启用或关闭抽样器
        featrues: [
        {
                    desc: 'featrue 的描述，如：https 小流量发布',
                    enabled: true, // type: {bool} 启用或关闭这个featrue
                    filter: {
                        idc: '', // type: {string | regexp | function} [可选]
                        ip: ''  // type: {string | regexp | function} [可选]
                        date: '' // type: {string | regexp | function} [可选]
                        host: '' // type: {string | regexp | function} [可选]
                        protocol: '' // type: {string | regexp | function} [可选]
                        port: '' // type: {string | regexp | function} [可选]
                        search: '' // type: {string | regexp | function} [可选]
                        referer: '' // type: {string | regexp | function} [可选]
                        cookie: '' // type: {string | regexp | function} [可选]
                        ua: '' // type: {string | regexp | function} [可选]
                        path: '' // type: {string | regexp | function} [可选]
                        headers: '' // type: {function} [可选]
                    },
                    percent: 1, // 0 ~ 1 的数字，如 0.5，
                    redirect: {
                        status: 307, // 300 段的http 状态码
                        url: '' // type: {string | function}
                    },
                    flags: '' // type: {string | array}  如 "flagA" 或 "['flagA', 'flagB']" 在模板中取到一个名`_featrueFlags`的数组，这个数组中会有在这里设置的falg
                },
                {
                    desc: '定义另一个 featrue',
                    enabled: false,
                    filter: {},
                    percent: 0,
                    flags: 'xxx',
                }
            ]
        }
    };

- 设置全局的enabled项可以使sampler关闭或开启
- featrues 是由一个或多个featrue 项组成的数组
- 每个featrue 都有一个desc字段，来供对当前的featrue进行描述，建议填写，方便多个使用时的理解
- 每个featrue 都有一个enabled字段用作开关

- filter 可选字段，如里不需要过滤request，可以略过。
    - 每个过滤选项都支持用字符串、正则表达式、函数来设置匹配，程序中会从request 中提取相应的信息进得比对；对字符串使用 `===` 对比对，正则使用`test`方法，使用函数时，会将对应的信息作为参数传给你定义的`function`,取得执行结果的`bool`值。
    - `filter.idc` 取值来自req 的 headers 中的 x_bd_idc 字段，这个字段来自上游的代理服务器
    - `ip` 取值来自 req 的 ip 字段
    - `date` 字段取值是服务器的当前时间，可以设置一个时间范围段如 `'2016-07-10 00:01:00 | 2017-04-13 23:45:00'`, 开始时间和结束时间可以为`*`,代表最小或最大，如，`'* | 2017-04-13 23:45:00'` 表示当前到17年4月13日23点45分，使用时请注意时间配置的格式; 同样也可以使用正则和函数来实现更复杂的时间选择。
    - `filter.host` 字段取值来自 `req.headers.host` 通常是域名或ip地址加端口号，在`80`和`433`时没有端口号
    - `filter.protcol`取值通常来自`req.protocol`
    - `filter.port` 取值来自`req.headers.clientport`
    - `filter.search` 取值来自`req.originalUrl`的查询参数部分，包括`?`号，如`?a=1&b=2`
    - `filter.referer` 取值来自`req.headers.referer`
    - `cookie` 取值来自 `req.headers.cookie`,是原始的cookie字符串
    - `ua` 取值来自`req.headers.user-agent`
    - `path` 取值来自`req.path`
    - `headers` 这个filter 只支持函数定义，取值`req.headers`, 满足需要用自定义的header字段来作为过滤条件的使用。

- `percent` 字段用于请求量的控制，值在0 ~ 1 之间。如需要50%的请求可以看到某个页面，可以设置为 0.5 。

- `redirect` 字段用于跳转的设置，支持string 和 function, 在使用function里程序会传入一个`location` 对象，可以利用这个location中的属性按需要进行url的构造。`location`对象的属性同浏览器中的`window.location`。如：我们需要让请求yd.baidu.com/a.html时跳转到yd.baidu.com/b.html, 可以在这里设置`{status: 302, url: 'https://yd.baidu.com/b.html'}`，

- `flags` 可以是字符串或数组，在设置了`redirect` 后会忽略`flags`的定义。这个设置可以用于A/B test 或其它的需要特定request请求才可以看到的功能或UI元素时使用；如我们设置了一个名为`falgA` 的标签，在模板中可以使用`{%if _featrueFlags.indexOf('flagA') !== -1%}` 来判断是否命中。

## 调试
- 指定环境变量`NODE_DEBUG`的`yog/sampler`值，如`"env NODE_DEBUG=yog/dispatcher,yog/loader,yog/plugins,yog/sampler YOG_DEBUG=true node app.js"`， 可以在控制台看到相应的debug信息输出。

## 注意
- 在使用跳转时注意“循环跳转”的问题
- 配置filter 过滤条件时就注意性能开销，由其时使用函数里应该使用没有副作用的操作。
- 配置filter 时可以调整定义的顺序来获得更好的性能
