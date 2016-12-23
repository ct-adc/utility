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
  isStorageAvailable: function(type = 'localStorage') {
    try {
      let x = '__storage_test__',
        storage = window[ type ];

      storage.setItem( x, x );
      storage.removeItem( x );

      return true;
    } catch(e) {
      return false;
    }
  }
});