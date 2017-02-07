/**
 * @file 抽样器用到的一些辅助处理代码
 * @author sudongyan<sudongyan@baidu.com>
 */

/**
 * 通过百分比切分流量
 *
 * @param {string} percent 百分比，取值0-1
 * @return {Bool} bool
 */
function usePercent(percent) {
    if (percent > 1 || percent < 0) {
        return;
    }

    percent = parseInt(percent * 100, 10);

    var random = Math.random() * 100;
    if (random <= percent) {
        return true;
    }

    return false;
}

/**
 * 构造一个和浏览器中的location相似的对象
 *
 * @param {Object} req http request
 * @return {Object} location
 */
function buildLocation(req) {
    var port = 80;

    var hostname = '';

    try {
        hostname = req.headers.host;
    }
    catch (e) {}

    var origin = req.protocol + '://' + req.headers.host;

    var search = req.originalUrl.split('?')[1] || '';
    if (search) {
        search = '?' + search;
    }

    port = hostname.split(':')[1] || 80;

    var location = {
        host: req.hostname,
        hostname: hostname,
        href: origin + req.originalUrl,
        origin: origin,
        pathname: req.path,
        port: port,
        protocol: req.protocol + ':',
        search: search
    };

    return location;
}

/**
 * 获取请求协议名称，上游接入层代理给传了一个header 来标识是https 请求
 *
 * @param {Object} req http request
 * @return {string} 'http' or 'https'
 */
function getProtocol(req) {
    var protocol = 'http';

    if (typeof req.headers !== 'object') {
        return protocol;
    }

    if (1 === req.headers['x-ssl-header']) {
        protocol = 'https';
    }

    return protocol;
}

module.exports.buildLocation = buildLocation;
module.exports.usePercent = usePercent;
module.exports.getProtocol = getProtocol;
