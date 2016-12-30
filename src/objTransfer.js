/**
 * Created by rubyisapm on 16/12/21.
 */
define(function(){
  var base=require('./base');

  /**
   * 按照给定的规则转换原对象中的key的格式
   * @param {Function} transfer 转换函数
   * @param {?Object} obj 原对象
   * @returns {?Object} obj 转换后的对象
   */
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

  /**
   * 按照给定的规则转换原数组中的对象中的key的格式
   * @param {Function} transfer 转换函数
   * @param {Array} arr 原对象
   * @returns {?Object} obj 转换后的对象
   */
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
    /**
     * 将原对象中的key的首字母大写
     * @param {?Object} obj 原对象
     * @returns {?Object} 转换后的对象
     */
    upperKey:function(obj){
      return transferKeyInObj(base.upperCaseFirst,obj);
    },
    /**
     * 将原对象中的key的首字母小写
     * @param {?Object} obj 原对象
     * @returns {?Object} 转换后的对象
     */
    lowerKey:function(obj){
      return transferKeyInObj(base.lowerCaseFirst,obj);
    }
  }
});