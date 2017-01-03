define(function(){
    /**
     * 页面伪刷新
     * @param isLastRow
     */
    function refresh(isLastRow){
        var noPageBar=$('#page:empty').length> 0,
            $searchBtn = $('#searchBtn');
        if(noPageBar && $searchBtn.length===0){
            location.reload();
        }else if(!noPageBar){
            var $currentPage = $('.active',$('#page')),
                isLastPage=$currentPage.next('li').length==1;//只有li.next，说明为最后一页
            if(isLastPage && isLastRow){
                $currentPage.prev().find('a').click();
            }else{
                $currentPage.find('a').click();
            }
        }else{
            $searchBtn.click();
        }
    }

    return{
        refresh:refresh
    }
});

