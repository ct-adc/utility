define({
    // 获取滚动条宽度
    getWidth: function () {
        var scrollBarWidth = 0;

        var outer = document.createElement('div');

        outer.className = 'ct-adc-scrollbar__wrap';
        outer.style.visibility = 'hidden';
        outer.style.width = '100px';
        outer.style.position = 'absolute';
        outer.style.top = '-9999px';
        document.body.appendChild(outer);

        var widthNoScroll = outer.offsetWidth;

        outer.style.overflow = 'scroll';

        var inner = document.createElement('div');

        inner.style.width = '100%';
        outer.appendChild(inner);

        var widthWithScroll = inner.offsetWidth;

        outer.parentNode.removeChild(outer);
        scrollBarWidth = widthNoScroll - widthWithScroll;

        return scrollBarWidth;
    }
});