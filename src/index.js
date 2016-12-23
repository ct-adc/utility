/**
 * Created by rubyisapm on 16/12/21.
 */
define(function(){
  var base=require('./base'),
    objTransfer=require('./objTransfer'),
    dateFilter=require('./dateFilter');
  return {
    base:base,
    objTransfer:objTransfer,
    dateFilter:dateFilter
  }
});