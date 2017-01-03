/**
 * @author liwei
 */


define(function() {
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
});