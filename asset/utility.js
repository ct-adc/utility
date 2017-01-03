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

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Created by wx-wangxiang on 17/01/03.
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		var numberFormat = __webpack_require__(4),
			rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
	    	raspnetjson = /^\/Date\((\d+)\)\/$/, //匹配 /Date(12345)/ 类型的字符串
			DATE_FORMATS = {
			yyyy: dateGetter("FullYear", 4), //对年份进行四位数的显示 如：2017/01/06
			yy: dateGetter("FullYear", 2, 0, true), //对年份进行两位数的显示 如：17/01/06
			y: dateGetter("FullYear", 1), //年份的一般的显示 如：2017/01/06
			MM: dateGetter("Month", 2, 1), //对于月份的单个数字会进行补零, 如：2017/01/06
		  	M: dateGetter("Month", 1, 1), //对于月份的单个数字不会进行补零, 如：2017/1/06
		  	dd: dateGetter("Date", 2), //对于日期的单个数字会进行补零, 如：2017/01/06
		  	d: dateGetter("Date", 1), //对于日期的单个数字不会补零, 如：2017/01/6
		  	HH: dateGetter("Hours", 2), //对于小时的单个数字会进行补零,并且是24小时制 如：2017/01/06 08:01
		  	H: dateGetter("Hours", 1), //对于小时的单个数字不会进行补零,并且是24小时制 如：2017/01/06 8:01
		  	hh: dateGetter("Hours", 2, -12), //对于小时的单个数字会进行补零,并且是12小时制 如：2017/01/06 08:01
		  	h: dateGetter("Hours", 1, -12), //对于小时的单个数字不会进行补零,并且是12小时制 如：2017/01/06 8:01
		  	mm: dateGetter("Minutes", 2), //对于分钟的单个数字会进行补零 如：2017/03/06 08:01
		  	m: dateGetter("Minutes", 1), //对于分钟的单个数字不会进行补零 如：2017/03/06 08:1
		  	ss: dateGetter("Seconds", 2), //对于秒数的单个数字会进行补零 如：2017/03/06 08:01:09
		  	s: dateGetter("Seconds", 1), //对于秒数的单个数字会进行补零 如：2017/03/06 08:01:9
		};
		/**
		 * 根据不同的日期format,获取相应的年，月，日，时，分，秒的显示格式
		 * @param  {string} name   函数通过该参数执行不同的时间操作的方法
		 * @param  {int} size   日期显示的位数
		 * @param  {int} offset 时间显示的格式，12小时制还是24小时制(用于小时的显示)
		 * @param  {boolean} trim   用于年份的两位数的显示
		 * @return {Function}        返回数字格式化方法
		 */
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
		/**
		 * 数字格式化
		 * @param  {int} num    获得的日期
		 * @param  {[type]} digits 日期要显示的位数
		 * @param  {boolean} trim   年份是否是两位数显示
		 * @return {string}        返回格式化后的数字
		 */
		function padNumber(num, digits, trim) {
			var neg = '';
			if (num < 0) {
			    neg = '-';
			    num = -num;
			}
			num = numberFormat.zeroFill(num, digits); //补零操作
			if (trim){
			    num = num.substr(num.length - digits);
			}
			return neg + num;
		}
		/**
		 * 日期格式化
		 * @param  {obj} date   日期对象
		 * @param  {string} format 格式化的方式
		 * @return {string}        格式化后的日期
		 */
		function dateFilter(date, format) {
			var text = "",
			    parts = [],
			    fn, match;
			format = format || "yyyy-M-d";
			if (typeof date === "string") {
			    if (/^\d+$/.test(date)) {
			      	date = numberFormat.toInt(date);
			    } else if (raspnetjson.test(date)) { //匹配 '/Date(1483410908227)/' 类型的字符串
			      	date = +RegExp.$1; //RegExp.$1 表示前面raspnetjson.test()匹配到的第一个括号中的内容
			    } else {
			      	console.error('请输入合法的日期');
			      	return;
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wx-wangxiang on 17/01/03.
	 */
	!(module.exports = {
		//将字符串转化为数字
		toInt: function(str){
		    return parseInt(str, 10) || 0;
		},
		/**
		 * 补零操作
		 * @param  {int} num    需要进行补零操作的参数
		 * @param  {int} digits 想要拓展的位数
		 * @return {string}     补零操作后的数字
		 */
		zeroFill: function(num, digits) {
			var num = '' + num; //将数字转为字符串的简便方法，同样的如果将数字字符串转为数字可以在其前面加上"+"号
			while(num.length < digits) {
				num = '0' + num;
			}
			return num;
		}
	})

/***/ }
/******/ ])
});
;