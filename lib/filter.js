function headers (req) {
	return typeof req.headers === 'object' ? req.headers : {};
}

module.exports = {
    headers: {
      'Function': function (req, val) {
            var reqheaders = headers(req);

            return val(reqheaders);
      }
    },
    host: {
        'String': function (req, val) {
            var reqheaders = headers(req);
            return reqheaders.host == val;
        },
        'RegExp': function (req, val) {
            var reqheaders = headers(req);
            return val.test(reqheaders.host);
        },
        'Function': function (req, val) {
            var reqheaders = headers(req);
            return val(reqheaders.host);
        }
    },
    path: {
        'String': function (req, val) {
            var path = req.path;
            return path == val;
        },
        'RegExp': function (req, val) {
            var path = req.path;
            return val.test(path);
        },
        'Function': function (req, val) {
            var path = req.path;
            return val(path);
        }
    },
    date: {
        'String': function (req, val) {
			var times = String(val).split("|");
			var startStamp = 0, endStamp = 0,nowStamp = Date.now();
			if(times.length == 2){
				if(times[0].trim() != "*"){
					startStamp = +new Date(times[0]); //此处暂时用new Date，对日期字符串有格式要求
				}
				//第二个*代表无限大
				if(times[1].trim() == "*"){
					endStamp = 2145953471000;
				}else{
					endStamp = +new Date(times[1]);
				}
				//日期范围内的功能开启
				if(startStamp <  nowStamp && nowStamp < endStamp){
					return true;
				}else{
					return false;
				}
			}else{
				return false;
			}
			return false;
        },
        'RegExp': function (req, val) {
       		return val.test(Date.now());
        },
        'Function': function (req, val) {
			return val(Date.now());
        }
    },
	idc: {
		'String': function (req, val) {
            var reqheaders = headers(req);
			return reqheaders['x_bd_idc'] == val;

        },
		'RegExp': function (req, val) {
            var reqheaders = headers(req);
			return val.test(reqheaders['x_bd_idc']);

        },
		'Function': function (req, val) {
            var reqheaders = headers(req);
            return val(reqheaders['x_bd_idc']);
        }
    },
	ip: {
		'String': function (req, val) {
			return val == req.ip;

        },
		'RegExp': function (req, val) {
			return val.test(req.ip);
        },
		'Function': function (req, val) {
			return val(req.ip);
        }
    },
	protocol: {
		'String': function (req, val) {
            var reqheaders = headers(req);
            var bfessl = (1 != reqheader['x-ssl-header']);
			if (bfessl) {
				return true;
			}
			return req.protocol == val;
        },
		'RegExp': function (req, val) {
            var reqheaders = headers(req);
            var bfessl = (1 != reqheader['x-ssl-header']);
			var protocol = req.protocol;
			if (bfessl) {
				protocol = 'https';
			}
			return val.test(protocol);

        },
		'Function': function (req, val) {
            var reqheaders = headers(req);
            var bfessl = (1 != reqheader['x-ssl-header']);
			var protocol = req.protocol;
			if (bfessl) {
				protocol = 'https';
			}
			return val(protocol);

        }
    },
	port: {
		'String': function (req, val) {
            var reqheaders = headers(req);
			return reqheaders['clientport'] == val;
        },
		'RegExp': function (req, val) {
            var reqheaders = headers(req);
			return val.test(reqheaders['clientport']);

        },
		'Function': function (req, val) {
            var reqheaders = headers(req);
			return val(reqheaders['clientport']);
        }
    },
	search: {
		'String': function (req, val) {
			var search = req.originalUrl.split('?')[1] || '';
			if (search) {
				search = '?' + search;
			}
			return search == val;

        },
		'RegExp': function (req, val) {
			var search = req.originalUrl.split('?')[1] || '';
			if (search) {
				search = '?' + search;
			}
			return val.test(search);

        },
		'Function': function (req, val) {
			var search = req.originalUrl.split('?')[1] || '';
			if (search) {
				search = '?' + search;
			}
			return val(search);

        }
    },
	referer: {
		'String': function (req, val) {
            var reqheaders = headers(req);
			return reqheaders.referer == val;

        },
		'RegExp': function (req, val) {
            var reqheaders = headers(req);
			return val.test(reqheaders.referer);
        },
		'Function': function (req, val) {
            var reqheaders = headers(req);
			return val(reqheaders.referer);
        }
    },
	cookie: {
		'String': function (req, val) {
            var reqheaders = headers(req);
			return  val == reqheaders.cookie;
        },
		'RegExp': function (req, val) {
            var reqheaders = headers(req);
			return val.test(reqheaders.cookie);
        },
		'Function': function (req, val) {
            var reqheaders = headers(req);
			return val(reqheaders.cookie);
        }
    },
	ua: {
		'String': function (req, val) {
            var reqheaders = headers(req);
			return val == reqheaders['user-agent'];
        },
		'RegExp': function (req, val) {
            var reqheaders = headers(req);
			return val.test(reqheaders['user-agent']);

        },
		'Function': function (req, val) {
            var reqheaders = headers(req);
			return val(reqheaders['user-agent']);
        }
	}
};
