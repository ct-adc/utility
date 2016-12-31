/**
 * @author rubyisapm
 */
define(function(){
    var base=require('./base.js');
    /**
     * 将查询字符串解析为查询参数数组
     * @param {string} search
     */
    function searchToParamGroup(search){
        var paramGroup={};
        if(search!==''){
            search.replace(/(([^=?&]+)=([^=&]*))/g,function($0,$1,$2,$3){
                paramGroup[$2]=$3;
            });
        }
        return paramGroup;
    }

    /**
     * URL解析并返回对应的参数
     * @param {string} uri uri
     * @returns {{protocol: *, hostname: *, port: *, pathname: *, search: *, hash: *, host: *}}
     */
    function uriParser(uri){
        var parser = document.createElement('a');
        parser.href = uri;
        return {
            protocol:parser.protocol,
            hostname:parser.hostname,
            port:parser.port,
            pathname:parser.pathname,
            search:parser.search,
            hash:parser.hash,
            host:parser.host
        };
    }

    /**
     * 获取url中指定参数的值
     * @param {string} uri 要解析的url
     * @param {string} param 要获取的查询参数的key值
     * @returns {undefined | string}
     */
    function getParam(uri,param){
        var paramGroup=searchToParamGroup(uriParser(uri).search);
        if(!base.isEmptyObject(paramGroup)){
            return paramGroup[param];
        }
    }

    /**
     * 获取url中的参数集合
     * @param {string} uri 要解析的url
     * @returns {object}
     */
    function getParamGroup(uri){
        return searchToParamGroup(uriParser(uri).search);
    }


    return{
        uriParser:uriParser,
        getParamGroup:getParamGroup,
        getParam:getParam,
        searchToParamGroup:searchToParamGroup
    };
});
