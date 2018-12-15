<template>
    <div class="articlelist-container">
        <div class="header clear">
            <div>
                <img src="../assets/img/tx2.jpg" alt="tx">
            </div>
            <div>
                <h3>个人博客文章</h3>
                <p>这是我的个人博客，由于是本人一手创建的，风格都比较简约，这个博客是为了博主自己的学习，分享一些零碎的知识</p>
            </div>
        </div>
        <div class="BlogArticle">
            <h3>个人博客文章</h3>
        </div>
        <div class="article-list">
            <article class="article-items" v-for="({id, title, publishTime, content},index) in articles" :key="id">
                <header>
                    <h2>
                        <router-link class="title" :to="'/articles/' + id">{{ articles[index].title }}</router-link>
                    </h2>
                </header>
                <p class="abstract" v-html="articles[index].content"></p>
                <footer>
                    <span class="time">{{ articles[index].publishTime }}</span>
                    <router-link class="read-more" :to="'/articles/' + id">... continue reading</router-link>
                </footer>
            </article>
        </div>
        <div class="pagination">
            <span class="prev" :class="{'hide': parseInt(this.$route.query.page, 10) === 0}">←
                <a @click="prevPage">上一页</a>
            </span>
            <span class="next" :class="{'hide': parseInt(this.$route.query.page, 10) === this.maxPage - 1}">
                <a @click="nextPage">下一页</a>→</span>
        </div>
    </div>
</template>

<script>
import parseMarkdown from '@/utils/parseMarkdown'
import axios from '@/utils/axios'
import moment from 'moment'
moment.locale('zh-CN')
export default {
    name: 'ArticleList',
    data() {
        return {
            offset: '',
            articles: '',
            maxPage: ''
        }
    },
    created() {
        axios({
            url: '/getArticle',
            method: 'get'
        }).then(res=>{
            // console.log(res);
            const pattern = /<!-- more -->/i
            for (let article of res.data) {
                // console.log(article.publishTime);
                article.publishTime = moment(article.publishTime).format('YYYY年 MMM DD日')
                pattern.test(article.content)
            }
            this.articles = res.data
            this.maxPage = res.data.maxPage
            // console.log(this.articles)
        }).catch(err=>{
            console.log(err);
        })
    },
    methods: {
        parseMarkdown,
        prevPage() {
            if (this.$route.query.page > 0) {
                this.$router.push({path: '/articles', query: {page: this.$route.query.page - 1}})
            }
        },
        nextPage() {
            if (this.$route.query.page < this.maxPage - 1) {
                this.$router.push({path: '/articles', query: {page: parseInt(this.$route.query.page, 10) + 1}})
            }
        }
    },
    beforeRouteUpdate(to, from, next) {
        if (to.path === '/articles') {
            this.offset = to.query.page * 5
            axios({
                url: `/api/v1/articles?isPublished=1&offset=${this.offset}&limit=5`,
                method: 'get'
            }).then(res => {
                const pattern = /<!-- more -->/i
                for (let article of res.data) {
                    pattern.test(article.content)
                    article.content = RegExp['$`']
                }
                this.articles = res.data
            }).catch(err => alert(err))
        }
        next()
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variable';
    .articlelist-container {
        width: 100%;
        background-color: $white;
        padding: 1em;
        margin-top: 3em;
        border: 1px solid #ccc;
        .header {
            width: 100%;
            background-color: $white;
            padding: 8px;
            border-radius: 5px;
            div:nth-child(1) {
                float: left;
                width: 16%;
                height: 100px;
                padding: 3px;
                border-radius: 3px;
                border: 1px solid #ccc;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            div:nth-child(2) {
                width: 78%;
                margin-left: 2%;
                float: right;
                h3 {
                    margin: 8px 0;
                    font-size: 20px;
                }
            }
        }
        .BlogArticle {
            h3 {
                position: relative;
                padding-top: 5px;
                height: 60px;
                line-height: 60px;
                // background-color: red;
                font-weight: 200;
                margin-bottom: 40px;
            }
            h3::after {
                content: '';
                position: absolute;
                bottom: 0;
                display: block;
                width: 80px;
                height: 2px;
                background-color: $black;
                transition: all .5s;
            }
            &:hover h3::after {
                width: 120px;
            }
        }
        .article-list {
            .article-items {
                margin: 40px 0 0 0;
                h2 {
                    margin: 0;
                    padding: .6em 0;
                    border-top: 1px solid #c1bfb5;
                    a {
                        font-size: 20px;
                        font-weight: 400;
                        color: $black;
                        transition: color .5s;
                    }
                }
                &:hover h2 a {
                    color: $base;
                }
                p {
                    text-indent: 2em;
                    line-height: 1.6em;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                }
                footer {
                    padding: 10px 0;
                    a {
                        float: right;
                        color: $black;
                        transition: color .5s;
                    }
                    &:hover a{
                        color: $base;
                    }  
                }
            }
        }
    }
    h3::before {
        display: none;
    }

    .pagination {
        @include flex($justify: space-between);
        font-size: 1.5rem;
        margin-top: 1.5em;
    }

    .prev,
    .next {
        a {
            cursor: pointer;
            color: $base;
        }
    }

    .hide {
        opacity: 0;
    }
</style>
