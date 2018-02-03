define(function(){

    function isInCTAdm(){
        document.domain = location.host.indexOf('ct108.net') > -1 ? 'ct108.net' : 'ct108.org';
        var domain = location.host.indexOf('ct108.net') > -1 ? 'admin.ct108.net' : 'admin.ct108.org';

        return window.parent.window.location.hostname.indexOf(domain)===0;
    }
    /**
     * 打开一个畅唐业务管理后台的某个菜单(该菜单需在页面上，否则会抛出异常)
     * @param href 链接 形式可以为'HREF?t='+new Date()(其中HREF为菜单原有链接)或'http://admin.ct108.org:1505....' 一般情况下，链接为菜单原有链接+查询字符串;
     * @param permissionCode 权限码 需要打开的页面的权限码
     */
    function openCTAdmPage(href, permissionCode) {
        document.domain = location.host.indexOf('ct108.net') > -1 ? 'ct108.net' : 'ct108.org';
        var parentDoc = $(window.parent.window.document);
        var link = parentDoc.find('a[data-id=' + permissionCode + ']');
        var tab = parentDoc.find('li[data-key=' + permissionCode + ']');
        var hrefBefore = link.attr('href');
        if (typeof parentDoc === 'undefined' || link.length === 0) {
            throw '访问不到菜单项';
        } else {
            tab.find('a')
                .append('<span> </span>')
                .find('span')
                .click();
            link.attr('href', href.replace('HREF', hrefBefore))
                .append('<span> </span>')
                .find('span')
                .click()
                .remove('span');
            link.attr('href', hrefBefore);
        }
    }

    return{
        isInCTAdm:isInCTAdm,
        openCTAdmPage:openCTAdmPage
    }
});

