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
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){
	  var base=__webpack_require__(1),
	    objTransfer=__webpack_require__(2),
	    dateFilter=__webpack_require__(3);
	  return {
	    base:base,
	    objTransfer:objTransfer,
	    dateFilter:dateFilter
	  }
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
	  //将字符串转化为数字
	  toInt: function(str){
	    return parseInt(str, 10) || 0;
	  },
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

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by wx-wangxiang on 16/12/23.
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		var base = __webpack_require__(1),
			DATE_FORMATS = {
			yyyy: dateGetter("FullYear", 4),
			yy: dateGetter("FullYear", 2, 0, true),
			y: dateGetter("FullYear", 1),
			MM: dateGetter("Month", 2, 1),
		  	M: dateGetter("Month", 1, 1),
		  	dd: dateGetter("Date", 2),
		  	d: dateGetter("Date", 1),
		  	HH: dateGetter("Hours", 2),
		  	H: dateGetter("Hours", 1),
		  	hh: dateGetter("Hours", 2, -12),
		  	h: dateGetter("Hours", 1, -12),
		  	mm: dateGetter("Minutes", 2),
		  	m: dateGetter("Minutes", 1),
		  	ss: dateGetter("Seconds", 2),
		  	s: dateGetter("Seconds", 1),
		},
			rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
			raspnetjson = /^\/Date\((\d+)\)\/$/;
		function dateGetter(name, size, offset, trim) {
		    return function (date) {
			    var value = date["get" + name]();
			    if (offset > 0 || value > -offset){
			      	value += offset;
			    }
			    if (value === 0 && offset === -12) {
			      	value = 12;
			    }
			    return padNumber(value, size, trim);
			}
		}
		function padNumber(num, digits, trim) {
			var neg = '';
			if (num < 0) {
			    neg = '-';
			    num = -num;
			}
			num = '' + num;
			while (num.length < digits) {
			    num = '0' + num;
			}
			if (trim){
			    num = num.substr(num.length - digits);
			}
			return neg + num;
		}
		function dateFilter(date, format) {
			var text = "",
			    parts = [],
			    fn, match;
			format = format || "yyyy-M-d";
			if (typeof date === "string") {
			    if (/^\d+$/.test(date)) {
			      	date = base.toInt(date);
			    } else if (raspnetjson.test(date)) {
			      	date = +RegExp.$1;
			    } else {
			      	var trimDate = date.trim();
			      	var dateArray = [0, 0, 0, 0, 0, 0, 0];
			      	var oDate = new Date(0);
			      //取得年月日
			      	trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function (_, a, b, c) {
			        	var array = c.length === 4 ? [c, a, b] : [a, b, c];
			        	dateArray[0] = base.toInt(array[0]);    //年
			        	dateArray[1] = base.toInt(array[1]) - 1; //月
			        	dateArray[2] = base.toInt(array[2]);     //日
			        	return "";
			      	});
			      	var dateSetter = oDate.setFullYear;
			      	var timeSetter = oDate.setHours;
			      	trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (_, a, b, c, d) {
			        	dateArray[3] = base.toInt(a); //小时
			        	dateArray[4] = base.toInt(b); //分钟
			        	dateArray[5] = base.toInt(c); //秒
			        	if (d) {                //毫秒
			         		dateArray[6] = Math.round(parseFloat("0." + d) * 1000);
			        	}
			        	return "";
			      	});
			      	var tzHour = 0;
			      	var tzMin = 0;
			      	trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function (z, symbol, c, d) {
			        	dateSetter = oDate.setUTCFullYear;
			        	timeSetter = oDate.setUTCHours;
			        	if (symbol) {
			         		tzHour = base.toInt(symbol + c);
			          		tzMin = base.toInt(symbol + d);
			        	}
			        	return '';
			      	});
			      	dateArray[3] -= tzHour;
			      	dateArray[4] -= tzMin;
			      	dateSetter.apply(oDate, dateArray.slice(0, 3));
			      	timeSetter.apply(oDate, dateArray.slice(3));
			      	date = oDate;
			    }
			};
			if (typeof date === 'number') {
			    date = new Date(date);
			}
			while (format) {
			    match = rdateFormat.exec(format);
			    /* istanbul ignore else */
			    if (match) {
			      	parts = parts.concat(match.slice(1));
			      	format = parts.pop();
			    } else {
			      	parts.push(format);
			      	format = null;
			    }
			}
			parts.forEach(function (value) {
			    fn = DATE_FORMATS[value];
			    text += fn ? fn(date) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'");
			});
			return text;
		}

		return dateFilter
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))

/***/ }
/******/ ])
});
;