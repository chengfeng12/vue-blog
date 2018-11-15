<template>
    <ul class="list">
        <li class="article">
            <header></header>
            <p></p>
        </li>
    </ul>
</template>

<script>
import request from '@/utils/request'
export default {
    name:"ArticleList",
    data:function () {
        return {
            articleList:[]
        }
    },
    // 当该组件创建的时候自动执行里面的请求
    mounted(){
        request({
            method:'get',
            url:"/articles"
        }).then(res=>{
            this.articleList.push(...res);
            console.log(this.articleList);
        }).catch(err=>{
            console.log(err);
        })
    }
}
</script>

<style lang="scss" type='text/scss' scoped>
@import "../../assets/style/variable";
.article {
    @include flex($flow: column wrap, $align: flex-start);
    padding: 0.2em 0.5em;
    margin-bottom: 1.5em;
    height: 5em;
    max-width: 100%;
    background: $white;
    border: 0.1em solid $special;
    cursor: pointer;
    header {
        max-width: 100%;
        font-size: 1.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.2em;
    }
    p {
        margin: 0;
        color: $special;
    }
    &:last-child {
        margin-bottom: 0;
    }
}

.active {
    border: 1px solid $base;
}

.published {
    border-right: 4px solid $base;
}
</style>

