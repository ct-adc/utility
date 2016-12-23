/**
 * Created by wx-wangxiang on 16/12/23.
 */
define(function() {
	var base = require('./base'),
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
})