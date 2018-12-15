<template>
    <header class="nav-container">
        <div class="nav-bg"></div>
        <div id="nav">
            <nav class="site-nav">
                <router-link :to="{path: '/articles', query: {page: 0}}" class="nav-title">
                    <img class="logo" src="../../assets/img/logo.png" alt="草帽">
                    <span class="title">Ashen One</span>
                </router-link>
                <ul class="site-nav-list">
                    <li>
                        <a name="index" @click="jump($event)" :class="{'active': $route.path === '/'}">首页</a>
                    </li>
                    <li>
                        <a name="articles" @click="jump($event)" :class="{'active': $route.path === '/articles'}">文章</a>
                    </li>
                    <li>
                        <a name="archives" @click="jump($event)" :class="{'active': $route.path === '/archives'}">归档</a>
                    </li>
                    <li>
                        <a name="tags" @click="jump($event)" :class="{'active': $route.path === '/tags'}">标签</a>
                    </li>
                    <li>
                        <a name="lists" @click="jump($event)" :class="{'active': $route.path === '/lists'}">阅读列表</a>
                    </li>
                    <li>
                        <a name="about" @click="jump($event)" :class="{'active': $route.path === '/about'}">关于我</a>
                    </li>
                </ul>
                <!-- nav-menu使用inline svg，作为菜单按钮，优化加载两张图片实现hover这一问题 -->
                <svg class="nav-menu" :class="{'menu-chosen': isMaskShow}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" @click="toggleMask">
                    <defs></defs>
                    <path d="M133.31 296.552h757.207c19.782 0 35.951-16.169 35.951-35.95 0-19.782-15.997-35.952-35.95-35.952H133.31c-19.782 0-35.951 16.17-35.951 35.951 0 19.782 16.17 35.951 35.95 35.951zM890.517 476.135H133.311c-19.782 0-35.951 16.17-35.951 35.951 0 19.782 16.17 35.951 35.95 35.951h757.207c19.782 0 35.951-16.17 35.951-35.951 0-19.782-16.17-35.95-35.95-35.95zM890.517 727.448H133.311c-19.782 0-35.951 15.997-35.951 35.95s16.17 35.952 35.95 35.952h757.207c19.782 0 35.951-15.998 35.951-35.951s-16.17-35.951-35.95-35.951z" />
                </svg>
            </nav>
        </div>
        <transition name="slide-fade">
            <nav class="mask-nav" v-if="isMaskShow" @click="toggleMask">
                <ul class="mask-nav-list">
                    <li>
                        <a name="index" @click="jump($event)" :class="{'active': $route.path === '/'}">首页</a>
                    </li>
                    <li>
                        <a name="articles" @click="jump($event)" :class="{'active': $route.path === '/articles'}">文章</a>
                    </li>
                    <li>
                        <a name="archives" @click="jump($event)" :class="{'active': $route.path === '/archives'}">归档</a>
                    </li>
                    <li>
                        <a name="tags" @click="jump($event)" :class="{'active': $route.path === '/tags'}">标签</a>
                    </li>
                    <li>
                        <a name="lists" @click="jump($event)" :class="{'active': $route.path === '/lists'}">阅读列表</a>
                    </li>
                    <li>
                        <a name="about" @click="jump($event)" :class="{'active': $route.path === '/about'}">关于我</a>
                    </li>
                </ul>
            </nav>
        </transition>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: ['maskFlag'],
    data() {
        return {
            isMaskShow: false
        }
    },
    methods: {
        toggleMask() {
            this.isMaskShow = !this.isMaskShow
        },
        jump(evt) {
            // 输出的是当前的这个元素
            // console.log(evt.target);
            // this代表的是这个实力的vue对象
            
            const path = evt.target.name
            // 实现的是点击元素之后实现的相应路由跳转
            switch (path) {
                case 'index':
                    this.$router.push('/')
                    break
                case 'articles':
                    this.$router.push({path: `/${path}`, query: {page: 0}})
                    break
                case 'archives':
                    this.$router.push('/archives')
                    break
                case 'tags':
                    this.$router.push('/tags')
                    break
                case 'lists':
                    this.$router.push('/lists')
                    break
                case 'about':
                    this.$router.push('/about')
                    break
                default:
                    break
            }
        }
    },
    // 查看是新值还是发生变化之前的值
    watch: {
        masekFlag() {
            this.isMaskShow = false;
            // console.log(this.maskFlag); 
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable';
.nav-container {
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    .nav-bg {
        width: 100%;
        height: 5px;
        background: #000 linear-gradient(to left, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);
    }
}
#nav {
    width: 100%;
    color: $white;
    background-color: #333;
    box-shadow: 0 3px 6px rgba(0,0,0,.3);
}
.site-nav {
    position: relative;
    margin: 0 auto;
    @include flex($justify: space-between);
    z-index: 1000;
    padding: 0.5em 0;
    height: 4em;
    width: 95%;
    max-width: 1100px;
    margin-left: 26em;
    font-size: 1.6rem;
    .site-nav-list {
        @include flex;
        li {
            padding: .6em;
            margin: 0 .5em;
        }
    }
    .nav-title {
        @include flex;
        .logo {
            width: 2.5em;
            height: 2.5em;
            margin-right: 0.5em;
        }
        .title {
            font: {
                size: 2rem;
                family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
            }
            letter-spacing: 0.1em;
        }
    }
    .nav-menu {
        position: absolute;
        z-index: 1;
        right: 0.5em;
        top: 50%;
        transform: translateY(-50%);
        // 隐藏
        visibility: hidden;
        width: 1.5em;
        height: 1.5em;
        border: 1px solid $white;
        border-radius: 2px;
        fill: $white;
    }
}

.mask-nav {
    position: fixed;
    z-index: 999;
    right: 0;
    top: 0;
    bottom: 0;
    width: 235px;
    font-size: 1.6rem;
    padding: 4.5em 1.5em 4em 1.5em;
    background: #f9f9f9;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    .mask-nav-list {
        li {
            font-size: 1.4rem;
            margin-bottom: 0.8em;
            a {
                color: #333;
            }
        }
    }
}

[class$="nav-list"] {

    padding: 0;
    list-style: none;
    a {
        padding-bottom: 0.2em;
        margin: auto 0.3em;
        cursor: pointer;
        &:hover {
            @include chosen-item;
        }
    }
    .active {
        @include chosen-item;
    }
}

.menu-chosen {
    border: 1px solid $base !important;
    fill: $base !important;
}
@media screen and (max-width: 850px) {
        .site-nav{
            max-width: 850px;
            margin-left: 0;
        }
        .site-nav-list {
            display: none;
        }
    }
@media screen and (max-width: 630px) {
    .nav-img {
        display: none;
    }
    .site-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        max-width: 850px;
        margin-left: 0;
        padding: 0.5em;
        background: #333;
        box-shadow: 0 2px 4px rgba(0,0,0,.3);
        .site-nav-list {
            display: none;
        }
        .nav-menu {
            // 可见
            visibility: visible;
        }
    }
}
</style>
