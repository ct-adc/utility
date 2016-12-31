(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["utility"] = factory();
	else
		root["utility"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author rubyisapm
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    var base = __webpack_require__(1),
	        objTransfer = __webpack_require__(2),
	        cookie = __webpack_require__(3),
	        localStorage = __webpack_require__(4),
	        sessionStorage = __webpack_require__(5),
	        URIParser = __webpack_require__(6);

	    return {
	        base: base,
	        objTransfer: objTransfer,
	        cookie: cookie,
	        localStorage: localStorage,
	        sessionStorage: sessionStorage,
	        URIParser:URIParser
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @author rubyisapm
	 */
	!(module.exports = {
	    /**
	     * 将字符串的首字母大写
	     * @param {string} str 原字符串
	     * @returns {string} 转换后的字符串
	     */
	    upperCaseFirst: function (str) {
	        str = str + '';
	        return str.replace(/^[a-z]/, function (firstLetter) {
	            return firstLetter.toUpperCase();
	        })
	    },
	    /**
	     * 将字符串的首字母小写
	     * @param {string} str 原字符串
	     * @returns {string} 转换后的字符串
	     */
	    lowerCaseFirst: function (str) {
	        str = str + '';
	        return str.replace(/^[A-Z]/, function (firstLetter) {
	            return firstLetter.toLowerCase();
	        })
	    },
	    /**
	     * 判断一个值是不是数组
	     * @param {*} val 要判断的值
	     * @returns {boolean} 是否为数组
	     */
	    isArray: function (val) {
	        return Object.prototype.toString.call(val) === '[object Array]';
	    },
	    /**
	     * 判断一个值是不是对象
	     * @param {*} val 要判断的值
	     * @returns {boolean} 是否为数组
	     */
	    isObject: function (val) {
	        return typeof val === 'object' && !utility.base.isArray(val);
	    },

	    /**
	     * 检测对象是否为空对象
	     * @param {?Object} obj 要检测的对象，null会被检测为空对象
	     * @returns {boolean}
	     */
	    isEmptyObject:function(obj){
	        for(var i in obj){
	            return false;
	        }
	        return true;
	    },


	    /**
	     * 判断浏览器是否支持storage
	     * @param {string} type 'localStorage'/'sessionStorage'
	     * @returns {boolean}
	     */
	    isStorageAvailable: function (type) {
	        try {
	            var x = '__storage_test__',
	                storage = window[type];
	            storage.setItem(x, x);
	            storage.removeItem(x);
	            return true;
	        } catch (e) {
	            return false;
	        }
	    }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author rubyisapm
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	  var base=__webpack_require__(1);

	  /**
	   * 按照给定的规则转换原对象中的key的格式
	   * @param {Function} transfer 转换函数
	   * @param {?Object} obj 原对象
	   * @returns {?Object} obj 转换后的对象
	   */
	  function transferKeyInObj(transfer,obj){
	    if(obj===null){
	      return obj;
	    }
	    var newObj={},
	      keys=Object.keys(obj);
	    if(keys.length===0){
	      return obj;
	    }
	    keys.map(function(key){
	      var val=obj[key],
	        newKey=transfer(key);
	      if(base.isObject(val)){
	        newObj[newKey]=transferKeyInObj(val);
	      }else if(base.isArray(val)){
	        newObj[newKey]=transferKeyInArray(transfer,val);
	      }else{
	        newObj[newKey]=val;
	      }
	    });
	    return newObj;
	  }

	  /**
	   * 按照给定的规则转换原数组中的对象中的key的格式
	   * @param {Function} transfer 转换函数
	   * @param {Array} arr 原对象
	   * @returns {?Object} obj 转换后的对象
	   */
	  function transferKeyInArray(transfer,arr){
	    if(arr.length==0){
	      return arr;
	    }
	    var newArray=[];
	    arr.map(function(item,index){
	      if(base.isArray(item)){
	        newArray[index]=transferKeyInArray(transfer,item);
	      }else if(base.isObject(item)){
	        newArray[index]=transferKeyInObj(transfer,item);
	      }else{
	        newArray[index]=item;
	      }
	    });
	    return newArray;
	  }

	  return {
	    /**
	     * 将原对象中的key的首字母大写
	     * @param {?Object} obj 原对象
	     * @returns {?Object} 转换后的对象
	     */
	    upperKey:function(obj){
	      return transferKeyInObj(base.upperCaseFirst,obj);
	    },
	    /**
	     * 将原对象中的key的首字母小写
	     * @param {?Object} obj 原对象
	     * @returns {?Object} 转换后的对象
	     */
	    lowerKey:function(obj){
	      return transferKeyInObj(base.lowerCaseFirst,obj);
	    }
	  }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * v1.0.0
	 *
	 * localStorage
	 * 
	 * Copyright https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
	 * 
	 * Date: 2016-12-23 16:27:00
	 */


	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		"use strict";

		/**
		 * 获取 cookie
		 * @param  {String} sKey 键名
		 * @return {String}      键名
		 */
		function get(sKey) {
			return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
		}

		/**
		 * 设置 cookie
		 * @param {String} sKey    键名
		 * @param {String} sValue  键值
		 * @param {[type]} vEnd    过期时间
		 * @param {String} sPath   路径
		 * @param {String} sDomain 域名
		 * @param {Boolean} bSecure 安全
		 */
		function set(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
			var sExpires = '';

			if ( !sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey) ) {
				return false;
			}

			if (vEnd) {
				switch (vEnd.constructor) {
					case Number:
						sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd;
						break;

					case String:
						sExpires = '; expires=' + vEnd;
						break;
						
					case Date:
						sExpires = '; expires=' + vEnd.toUTCString();
						break;
				}
			}

			document.cookie = encodeURIComponent( sKey ) + '=' + encodeURIComponent( sValue ) +
				sExpires +
				(sDomain ? '; domain=' + sDomain : '') +
				(sPath ? '; path=' + sPath : '') +
				(bSecure ? '; secure' : '');

			return true;
		}

		/**
		 * 移除某个 cookie
		 * @param  {String} sKey    键名
		 * @param  {String} sPath   路径
		 * @param  {String} sDomain 域名
		 * @return {Boolean}        true-删除成功，false-删除失败
		 */
		function remove(sKey, sPath, sDomain) {
			if ( !sKey || !has(sKey) ) {
				return false;
			}

			document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
								(sDomain ? '; domain=' + sDomain : '') +
									(sPath ? '; path=' + sPath : '');
			
			return true;
		}

		/**
		 * 判断是否拥有某个 key
		 * @param  {String}  sKey 键名
		 * @return {Boolean}
		 */
		function has(sKey) {
			var patt = new RegExp( '(?:^|;\\s*)' + encodeURIComponent( sKey ).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=' );

			return patt.test( document.cookie );
		}

		/**
		 * 获取
		 * @return {Object} 所有的 cookie 键值对
		 */
		function keys() {
			var map     = {},
				allKeys = document.cookie.
							replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').
								split( /\s*(?:\=[^;]*)?;\s*/ );


			allKeys.forEach(function( key ) {
				map[ decodeURIComponent(key) ] = get( key );
			});

			return map;
		}

		return {
			get    : get,
			set    : set,
			remove : remove,
			has    : has,
			keys   : keys
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * @author liwei
	 */

	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		'use strict';

		var base = __webpack_require__(1);

		var IS_LOCAL_STORAGE_AVAILABLE = base.isStorageAvailable( 'localStorage' );

		/**
		 * 设置一个 storage
		 * @param {String} sKey   键名
		 * @param {String} sValue 键值
		 */
		function set( sKey, sValue ) {
			if ( IS_LOCAL_STORAGE_AVAILABLE ) {
				localStorage.setItem( sKey, sValue );
			}
		}

		/**
		 * 获取 storage
		 * @param  {String} sKey 键名
		 * @return {String}      键值
		 */
		function get( sKey ) {
			if ( IS_LOCAL_STORAGE_AVAILABLE ) {

				return localStorage.getItem( sKey );
			}
		}

		/**
		 * 清除所有 storage
		 */
		function clear() {
			if ( IS_LOCAL_STORAGE_AVAILABLE ) {

				localStorage.clear();
			}
		}

		/**
		 * 删除一个 storage
		 * @param  {String} sKey 键名
		 */
		function remove( sKey ) {
			if ( IS_LOCAL_STORAGE_AVAILABLE ) {

				localStorage.removeItem( sKey );
			}
		}

		return {
			set: set,
			get: get,
			clear: clear,
			remove: remove
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * @author liwei
	 */


	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		'use strict';

		var base = __webpack_require__(1);

		var IS_SESSION_STORAGE_AVAILABLE = base.isStorageAvailable( 'sessionStorage' );

		/**
		 * 设置一个 storage
		 * @param {String} sKey   键名
		 * @param {String} sValue 键值
		 */
		function set( sKey, sValue ) {
			if ( IS_SESSION_STORAGE_AVAILABLE ) {

				sessionStorage.setItem( sKey, sValue );
			}
		}

		/**
		 * 获取 storage
		 * @param  {String} sKey 键名
		 * @return {String}      键值
		 */
		function get( sKey ) {
			if ( IS_SESSION_STORAGE_AVAILABLE ) {

				return sessionStorage.getItem( sKey );
			}
		}

		/**
		 * 清除所有 storage
		 */
		function clear() {
			if ( IS_SESSION_STORAGE_AVAILABLE ) {
				
				sessionStorage.clear();
			}
		}

		/**
		 * 删除一个 storage
		 * @param  {String} sKey 键名
		 */
		function remove( sKey ) {
			if ( IS_SESSION_STORAGE_AVAILABLE ) {

				sessionStorage.removeItem( sKey );
			}
		}

		return {
			set: set,
			get: get,
			clear: clear,
			remove: remove
		};
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * @author rubyisapm
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	    var base=__webpack_require__(1);
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ])
});
;