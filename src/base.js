/**
 * @author rubyisapm
 */
define({
    /**
     * 将字符串的首字母大写
     * @param {string} str 原字符串
     * @returns {string} 转换后的字符串
     */
    upperCaseFirst: function (str) {
        str=str+'';
        return str.replace(/^[a-z]/, function (firstLetter) {
            return firstLetter.toUpperCase();
        })
    },
    /**
     * 将字符串的首字母小写
     * @param {string} str 原字符串
     * @returns {string} 转换后的字符串
     */
    lowerCaseFirst: function (str) {
        str=str+'';
        return str.replace(/^[A-Z]/, function (firstLetter) {
            return firstLetter.toLowerCase();
        })
    },
    /**
     * 判断一个值是不是数组
     * @param {*} val 要判断的值
     * @returns {boolean} 是否为数组
     */
    isArray: function (val) {
        return Object.prototype.toString.call(val) === '[object Array]';
    },
    /**
     * 判断一个值是不是对象
     * @param {*} val 要判断的值
     * @returns {boolean} 是否为数组
     */
    isObject: function (val) {
        return typeof val === 'object' && !utility.base.isArray(val);
    }
});