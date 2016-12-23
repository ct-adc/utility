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
	 * Created by rubyisapm on 16/12/21.
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var base = __webpack_require__(1),
	    objTransfer = __webpack_require__(2),
	    _cookie = __webpack_require__(3),
	    _localStorage = __webpack_require__(4),
	    _sessionStorage = __webpack_require__(5);

	  return {
	    base: base,
	    objTransfer: objTransfer,
	    cookie: _cookie,
	    localStorage: _localStorage,
	    sessionStorage: _sessionStorage
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by rubyisapm on 16/12/21.
	 */
	!(module.exports = {
	  upperCaseFirst:function(str){
	    return str.replace(/^[a-z]/,function(firstLetter){
	      return firstLetter.toUpperCase();
	    })
	  },
	  lowerCaseFirst:function(str){
	    return str.replace(/^[A-Z]/,function(firstLetter){
	      return firstLetter.toLowerCase();
	    })
	  },
	  isArray:function(val){
	    return Object.prototype.toString.call(val)==='[object Array]';
	  },
	  isObject:function(val){
	    return typeof val==='object' && !utility.base.isArray(val);
	  },
	  isStorageAvailable: function(type = 'localStorage') {
	    try {
	      let x = '__storage_test__',
	        storage = window[ type ];

	      storage.setItem( x, x );
	      storage.removeItem( x );

	      return true;
	    } catch(e) {
	      return false;
	    }
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by rubyisapm on 16/12/21.
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	  var base=__webpack_require__(1);
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
	    upperKey:function(obj){
	      return transferKeyInObj(base.upperCaseFirst,obj);
	    },
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
	 * v1.0.0
	 *
	 * localStorage
	 * 
	 * Copyright 2016 Live
	 * Licensed MIT
	 * 
	 * Date: 2016-12-08 11:13:29
	 */


	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		'use strict';

		const base = __webpack_require__(1);

		const IS_LOCAL_STORAGE_AVAILABLE = base.isStorageAvailable( 'localStorage' );

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
	 * v1.0.0
	 *
	 * sessionStorage
	 * 
	 * Copyright 2016 Live
	 * Licensed MIT
	 * 
	 * Date: 2016-12-08 11:13:29
	 */


	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		'use strict';

		const base = __webpack_require__(1);

		const IS_SESSION_STORAGE_AVAILABLE = base.isStorageAvailable( 'sessionStorage' );

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

/***/ }
/******/ ])
});
;