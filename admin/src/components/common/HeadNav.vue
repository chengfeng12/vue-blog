<template>
    <nav class="head-nav">
        <div class="logo-container">
            <img src="../../assets/image/logo.png" alt="" class="logo"  title="yxr博客">
        </div>
        <div class="content-container">
            <section>
                <h4 class="title">
                    尹旭冉博客之家
                </h4>
            </section>
            <a class="log-out" @click="logOut">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-kaiguan"></use>
                </svg>
                <span>&nbsp;登出</span>
            </a>
        </div>
    </nav>
</template>

<script>
import request from '@/utils/request'
import { removeToken } from '@/utils/auth'
export default {
    methods:{
        logOut () {
            request({
                url:'/logout',
                method:'get'
            }).then(res=>{
                console.log(res);
                if(res.success == true){
                    this.$store.commit('SET_TOKEN','');
                    removeToken(); 
                    location.reload();// 强制刷新当前页面，重新判断是否具备权限
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/variable";
.head-nav {
    font-family: KaiShu, Arial, sans-serif;
    @include flex($justify: flex-start);
    font-size: 1.6rem;
    height: 3em;
    .logo-container {
        @include flex;
        width: 3em;
        height: inherit;
        border-bottom: 2px solid $word;
        padding-left: 20px;
    }
    .content-container {
        @include flex($justify: space-between);
        padding: 0.5em 1em;
        height: 100%;
        width: calc(100% - 50px);
        border-bottom: 2px solid $base;
        .log-out {
            @include flex;
            color: $word;
            &:hover {
                color: $base;
            }
        }
    }

    h4 {
        @include flex;
        margin: 0;
    }
    .subhead {
        width: 130px;
    }
    .log-out {
        cursor: pointer;
    }
}
</style>

