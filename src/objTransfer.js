/**
 * Created by rubyisapm on 16/12/21.
 */
define(function(){
  var base=require('./base');
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
    upperKey:function(obj){
      return transferKeyInObj(base.upperCaseFirst,obj);
    },
    lowerKey:function(obj){
      return transferKeyInObj(base.lowerCaseFirst,obj);
    }
  }
});