/**
 * @author rubyisapm
 */
define(function () {
    var base = require('./base'),
        objTransfer = require('./objTransfer'),
        cookie = require('./cookie'),
        localStorage = require('./localStorage'),
        sessionStorage = require('./sessionStorage'),
        URIParser = require('./URIParser');

    return {
        base: base,
        objTransfer: objTransfer,
        cookie: cookie,
        localStorage: localStorage,
        sessionStorage: sessionStorage,
        URIParser:URIParser
    };
});