<template>
    <ul class="list">
        <!-- <li class="article">
            <header></header>
            <p></p>
        </li> -->
    </ul>
</template>

<script>
import request from '@/utils/request'
export default {
   /*  methods:{
        logout () {
            request({
                url:'/logout',
                method:'get'
            }).then(res=>{
                console.log(res);
            }).catch(err=>{
                console.log(err);
            })
        }
    } */
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

