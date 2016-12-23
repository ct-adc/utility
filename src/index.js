/**
 * Created by rubyisapm on 16/12/21.
 */
define(function(){
  var base = require( './base' ),
    objTransfer = require( './objTransfer' ),
    _localStorage = require( './localStorage' ),
	_sessionStorage = require( './sessionStorage' );

  return {
    base: base,
    objTransfer: objTransfer,
    localStorage: _localStorage,
    sessionStorage:  _sessionStorage
  }
});