/**
 * Created by rubyisapm on 16/12/21.
 */
define({
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