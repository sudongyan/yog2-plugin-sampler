var debuglog = require('debuglog')('yog/sampler');
var filters = require('./lib/filter.js');
var usePercent = require('./lib/helper.js').usePercent;
var buildLocation = require('./lib/helper.js').buildLocation;
var getProtocol = require('./lib/helper.js').getProtocol

module.exports.sampler = function (app, conf) {
    if (!conf.enabled || !conf.featrues.length) {
        debuglog('The sampler has been closed');
        return;
    }
 
    var featrues = conf.featrues;
    app.use(function (req, res, next) {
            debuglog('[Current url]: %s', getProtocol(req) + '://' +  req.hostname + req.url);
			var featrue;

            var pattern;
			var percent;
			var redirect;
			var flags;

			var redirectStatus;
			var redirectUrl;

            var passed;

        for (var i = 0; i < featrues.length; i++) {
			
			featrue = featrues[i];
            if (!featrue.enabled) {
                debuglog('[featrue %d] ===> The featrues[%d] has been closed', i, i);
                continue; 
            } 

            pattern = featrue.filter;
            if (typeof pattern == 'undefined') {
                pattern = {}; 
            }
			percent = featrue.percent;
			redirect = featrue.redirect;
			flags = featrue.flags;

            passed = false;

            // 校验配置，如果有不在处理范围内的类型则跳过这个featrue
            if (typeof pattern != 'object') {
                debuglog('[featrue %d] ===> this filter conf type is [%s], not qualified',i, typeof pattern);
                continue; 
            }
			
			if (percent > 1 || percent < 0) {
                debuglog('[featrue %d] ===> percent value is [%d], not qualified', i, percent);
				continue;
			}

            if (!redirect && !flags) {
                debuglog('[featrue %d] ===> "redirect" or "flags" conf, must have a', i);
                continue; 
            }

            if (redirect && (typeof redirect == 'object')) {
                redirectStatus  = parseInt(redirect.status, 10); 
                if (redirectStatus > 399 || redirectStatus < 299) {
                    debuglog('[featrue %d] ===> the "redirect status number" please use 300 ~ 390', i);
                    continue;
                }

                redirectUrl = redirect.url;
                if (!(typeof redirectUrl == 'string' || typeof redirectUrl == 'function')) {
                    debuglog('[featrue %d] ===> the "redirect url" please use string or function', i);
                    continue;
                }
            }

            if (flags && (!Array.isArray(flags) && typeof flags != 'string')) {
                debuglog('[featrue %d] ===> the "flags" please use string or array', i);
                continue;
            }

            // 筛选请求
			passed  = Object.keys(pattern).filter(function (item) {
				return pattern[item];
			}).every(function (item) {
				var patternVal = pattern[item];
				var type = Object.prototype.toString.call(patternVal).slice(8, -1);

				var handler = filters[item][type];
				return (typeof handler == 'function') ? handler(req, patternVal) : false; 
			});
            debuglog('[featrue %d] ===> this featrue is %s', i, passed ? 'passed' : 'no matched');
            
            // 按百分比处理
            if (passed && usePercent(percent)) {
                // 跳转
                if (redirect) {
                    if (typeof redirectUrl == 'function') {
                        redirectUrl = redirectUrl(buildLocation(req));
                    }
                    debuglog('[featrue %d] ===> redirect to %s, starus: %d', i, redirectUrl, redirectStatus);
                    res.redirect(redirectStatus, redirectUrl);   	
                    return;
                }
                // 打标签
                if (flags) {
                    if (!Array.isArray(res.locals.featrueFlags)) {
                        res.locals._featrueFlags = [];                
                    }
                    if (typeof flags == 'string') {
                        flags = [flags]; 
                    }

                    flags.forEach(function (flag) {
                        if (res.locals._featrueFlags.indexOf(flag) === -1) {
                            res.locals._featrueFlags.push(flag);
                        }  
                    });
                    debuglog('[featrue %d] ===> flags: %s', i, flags);
                }
            }

        }
        debuglog('Current "res.locals._featrueFlags" value is  %s', res.locals._featrueFlags);
        next();
    });


};



// 设置插件默认配置
module.exports.sampler.defaultConf = {
    enabled: false,
    featrues:[
    {
        enabled: false,
        filter: {
            idc: '',
            ip: '',
			date: '',

            headers: '',
            host: '',
            protocol: '',
            port: '',
            search: '',
            referer: '',
            cookie: '',
            ua: '',
            path: ''
        },
        percent: 1,
        redirect: {
            status: 307,
            url: function (location) {
                /*
                   host: "yd.baidu.com"
                   hostname: "yd.baidu.com"
                   href: "https://yd.baidu.com/topic/payhelp"
                   origin: "https://yd.baidu.com"
                   pathname: "/topic/payhelp"
                   port: ""
                   protocol: "https:"
                   search: ""
                   */
            } 
        },
        flags: []
    }     
    ] 
}
