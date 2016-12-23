/*!
 * v1.0.0
 *
 * localStorage
 * 
 * Copyright 2016 Live
 * Licensed MIT
 * 
 * Date: 2016-12-08 11:13:29
 */


define(function() {
	'use strict';

	let base = require('./base');

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
});