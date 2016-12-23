/*!
 * v1.0.0
 *
 * sessionStorage
 * 
 * Copyright 2016 Live
 * Licensed MIT
 * 
 * Date: 2016-12-08 11:13:29
 */


define(function() {
	'use strict';

	const base = require('./base');

	const IS_SESSION_STORAGE_AVAILABLE = base.isStorageAvailable( 'sessionStorage' );

	function set( key, value ) {
		if ( IS_SESSION_STORAGE_AVAILABLE ) {

			sessionStorage.setItem( key, value );
		}
	}

	function get( key ) {
		if ( IS_SESSION_STORAGE_AVAILABLE ) {

			return sessionStorage.getItem( key );
		}
	}

	function clear() {
		if ( IS_SESSION_STORAGE_AVAILABLE ) {
			
			sessionStorage.clear();
		}
	}

	function remove( key ) {
		if ( IS_SESSION_STORAGE_AVAILABLE ) {

			sessionStorage.removeItem( key );
		}
	}

	return {
		set: set,
		get: get,
		clear: clear,
		remove: remove
	};
});