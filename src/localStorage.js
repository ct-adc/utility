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

	const base = require('./base');

	const IS_LOCAL_STORAGE_AVAILABLE = base.isStorageAvailable( 'localStorage' );

	function set( key, value ) {
		if ( IS_LOCAL_STORAGE_AVAILABLE ) {

			localStorage.setItem( key, value );
		}
	}

	function get( key ) {
		if ( IS_LOCAL_STORAGE_AVAILABLE ) {

			return localStorage.getItem( key );
		}
	}

	function clear() {
		if ( IS_LOCAL_STORAGE_AVAILABLE ) {

			localStorage.clear();
		}
	}

	function remove( key ) {
		if ( IS_LOCAL_STORAGE_AVAILABLE ) {

			localStorage.removeItem( key );
		}
	}

	return {
		set: set,
		get: get,
		clear: clear,
		remove: remove
	};
});