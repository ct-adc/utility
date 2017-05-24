/**
 * @author rubyisapm
 */
define(function () {
    var base = require('./base');

    /**
     * 按照给定的规则转换原对象中的key的格式
     * @param {Function} transfer 转换函数
     * @param {?Object} obj 原对象
     * @returns {?Object} obj 转换后的对象
     */
    function transferKeyInObj(transfer, obj, jsonTransfer) {
        if (obj === null) {
            return obj;
        }
        var newObj = {},
            keys = Object.keys(obj);
        if (keys.length === 0) {
            return obj;
        }
        keys.map(function (key) {
            var val = obj[key],
                newKey = transfer(key);
            if (base.isObject(val)) {
                newObj[newKey] = transferKeyInObj(transfer, val, jsonTransfer);
            } else if (base.isArray(val)) {
                newObj[newKey] = transferKeyInArray(transfer, val, jsonTransfer);
            } else if (base.isJSON(val) && jsonTransfer) {
                newObj[newKey] = JSON.stringify(transferKeyInJSON(transfer, val, jsonTransfer));
            } else {
                newObj[newKey] = val;
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
    function transferKeyInArray(transfer, arr, jsonTransfer) {
        if (arr.length == 0) {
            return arr;
        }
        var newArray = [];
        arr.map(function (item, index) {
            if (base.isArray(item)) {
                newArray[index] = transferKeyInArray(transfer, item, jsonTransfer);
            } else if (base.isObject(item)) {
                newArray[index] = transferKeyInObj(transfer, item, jsonTransfer);
            } else if (base.isJSON(item) && jsonTransfer) {
                newArray[index] = JSON.stringify(transferKeyInJSON(transfer, item, jsonTransfer));
            } else {
                newArray[index] = item;
            }
        });
        return newArray;
    }

    /**
     * 按照给定的规则转换原json字符串中的key的格式
     * @param {Function} transfer
     * @param {String} json
     */
    function transferKeyInJSON(transfer, json) {
        var jsonObj = JSON.parse(json);
        if (base.isArray(jsonObj)) {
            return transferKeyInArray(transfer, jsonObj, true);
        } else if (base.isObject(jsonObj)) {
            return transferKeyInObj(transfer, jsonObj, true);
        } else if (base.isJSON(jsonObj)) {
            return transferKeyInJSON(transfer, jsonObj, true)
        }

    }

    /**
     * 去除对象中某些属性值的前后空格
     * @param {object} obj 原对象
     * @param {array} keys 要修改的key，支持以.分隔的串联属性如app.id
     * @returns {*} 处理后的对象
     */
    function trimSomeInObj(obj, keys) {
        var objClone = JSON.parse(JSON.stringify(obj));
        keys.map(function (key) {
            objClone = base.setObjValByKey(objClone, key, function (obj, key) {
                obj[key] = obj[key].replace(/(^\s*|\s*$)/g, '');
            });
        });
        return objClone;
    }

    /**
     * 去除数组中单一项的某些属性值的前后空格
     * @param {Array} arr 原数组
     * @param {Array} keys 要修改的key，支持以.分隔的串联属性如app.id
     * @returns {*} 处理后的数组
     */
    function trimSomeInArray(arr, keys) {
        return arr.map(function(item){
            return trimSomeInObj(item,keys);
        })
    }

    /**
     * 以具体的方式转换对象中的key
     * @param {Object} obj 原对象
     * @param {Array} rules 规则定义
     * @param {Array} rules[].keys 每项为要转换的key
     * @param {String | Function} rules[].rule 转换规则
     */
    function transferSomeInObj(obj,rules){
        var objClone = JSON.parse(JSON.stringify(obj));
        rules.map(function(item){
            var keys=item.keys,
                transfer=item.rule;
            keys.map(function (key) {
                objClone = base.setObjValByKey(objClone, key, transfer);
            });
        });
        return objClone;
    }

    /**
     * 以具体的方式转换对象中的key
     * @param {Array} arr 原数组
     * @param {Array} rules 规则定义
     * @param {Array} rules[].keys 每项为要转换的key
     * @param {String | Function} rules[].rule 转换规则
     */
    function transferSomeInArray(arr,rules){
        return arr.map(function(item){
            return trimSomeInObj(item,rules);
        })
    }

    return {
        /**
         * 将原对象中的key的首字母小写
         * @param {Object} obj 原对象
         * @param {Boolean} jsonTransfer 是否转换json中的内容
         * @returns {Object} 转换后的对象
         */
        upperKey: function (obj, jsonTransfer) {
            if (base.isArray(obj)) {
                return transferKeyInArray(base.upperCaseFirst, obj, jsonTransfer);
            } else {
                return transferKeyInObj(base.upperCaseFirst, obj, jsonTransfer);
            }
        },
        /**
         * 将原对象中的key的首字母小写
         * @param {Object} obj 原对象
         * @param {Boolean} jsonTransfer 是否转换json中的内容
         * @returns {Object} 转换后的对象
         */
        lowerKey: function (obj, jsonTransfer) {
            if (base.isArray(obj)) {
                return transferKeyInArray(base.lowerCaseFirst, obj, jsonTransfer);
            } else {
                return transferKeyInObj(base.lowerCaseFirst, obj, jsonTransfer);
            }
        },
        trimSome: function(obj,keys){
            if (base.isArray(obj)) {
                return trimSomeInArray(obj,keys);
            } else {
                return trimSomeInObj(obj,keys);
            }
        },
        transferSome:function(obj,rules){
            if (base.isArray(obj)) {
                return transferSomeInArray(obj,rules);
            } else {
                return transferSomeInObj(obj,rules);
            }
        }
    }
});