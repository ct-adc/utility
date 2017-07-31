/**
 * Created by wx-wangxiang on 17/01/03.
 */
define({
	//将字符串转化为数字
	toInt: function(str){
	    return parseInt(str, 10) || 0;
	},
	/**
	 * 补零操作
	 * @param  {int} num    需要进行补零操作的参数
	 * @param  {int} digits 想要拓展的位数
	 * @return {string}     补零操作后的数字
	 */
	zeroFill: function(num, digits) {
		var num = '' + num; //将数字转为字符串的简便方法，同样的如果将数字字符串转为数字可以在其前面加上"+"号
		while(num.length < digits) {
			num = '0' + num;
		}
		return num;
	},
    split: function(num, len, sep) {
	    len = len || 3; // 默认3位分割
	    sep = sep || ','; // 默认分隔符为 ','

        // \B   匹配非单词边界（单词字符包括：a-z、A-Z、0-9，以及下划线）
        // ?=n  匹配任何其后紧接指定字符串 n 的字符串
        // (?:x)    匹配 x 不会捕获匹配项。这被称为非捕获括号（non-capturing parentheses）。匹配项不能够从结果数组的元素 [1], ..., [n] 或已被定义的 RegExp 对象的属性 $1, ..., $9 再次访问到。
        // x(?!y)   只有当 x 后面不是紧跟着 y 时，才匹配 x。例如，/\d+(?!\.)/ 只有当一个数字后面没有紧跟着一个小数点时，才会匹配该数字。/\d+(?!\.)/.exec("3.141") 匹配 141 而不是 3.141。
        // 嗯，合起来就懵逼了吧= =
        var reg = new RegExp('\\B(?=(?:\\d{' + len + '})+(?!\\d))', 'g');

        // 把数字以小数点分割：parts[0] 整数部分，parts[1] 小数部分
        var parts = (num + '').split('.');

        // 如果整数部分大于需要分割的位数
        if (parts[0].length > len) {
            parts[0] = parts[0].replace(reg, sep);
        }

        return parts.join('.');
    }
})