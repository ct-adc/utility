/**
 * @author rubyisapm
 */
define(function () {
    var base = require('./src/base'),
        objTransfer = require('./src/objTransfer'),
        cookie = require('./src/cookie'),
        localStorage = require('./src/localStorage'),
        sessionStorage = require('./src/sessionStorage'),
        URIParser = require('./src/URIParser'),
        numberFormat = require('./src/numberFormat'),
        dateFilter = require('./src/dateFilter'),
        areaDataFormat = require('./src/areaDataFormat'),
        INFO = require('./src/info'),
        scrollbar = require('./src/scrollbar'),
        coordinator=require('./src/coordinator');

    return {
        base: base,
        objTransfer: objTransfer,
        cookie: cookie,
        localStorage: localStorage,
        sessionStorage: sessionStorage,
        URIParser: URIParser,
        numberFormat: numberFormat,
        dateFilter: dateFilter,
        areaDataFormat:areaDataFormat,
        INFO: INFO,
        scrollbar: scrollbar,
        coordinator: coordinator
    };
});