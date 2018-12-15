<template>
    <div class="tag-container">
        <h1>标签</h1>
        <nav>
            <ul class="tags">
                <li v-for="(tag,index) in tags" :key="index">
                    <a href="javascript:void(0)" @click="goAnchor(tag)">{{ tag }}</a>
                </li>
            </ul>
        </nav>
        <ul class="tag-list">
            <li v-for="tag in tags" :key="tag">
                <span :id="tag" :name="tag">{{ tag }}</span>
                <ul>
                    <li v-for="(intro,index) in introductions[tag]" :key="index">
                        <router-link :to="'/articles/' + intro.id">{{ intro.title }}</router-link>
                        <span class="time"> {{ intro.publishTime }}</span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import moment from 'moment'

moment.locale('zh-CN')
export default {
    name: 'Tag',
    data () {
        return {
            introductions: {},
            tags: []
        }
    },
    methods: {
        goAnchor(id) {
            const anchor = document.getElementById(id)
            if (window.innerWidth > 480) {
                document.documentElement.scrollTop = anchor.offsetTop
                document.body.scrollTop = anchor.offsetTop
            }
            else {
                document.documentElement.scrollTop = anchor.offsetTop - 64
                document.body.scrollTop = anchor.offsetTop - 64
            }
        }
    },
    created () {
        axios({
            url: '/getArticle',
            method: 'get'
        }).then(res=>{
            // console.log(res);
            for (let intro of res.data) {
                // split切割成一个数组
                intro.tags = intro.tags ? intro.tags.split(',') : []
                intro.publishTime = moment(intro.publishTime).format('MM-DD')
                // console.log(intro.tags);
                
                // 把所有文章列表中的tag标签取出来
                for (let tag of intro.tags) {
                    // console.log(this.tags);
                    if (this.tags.indexOf(tag) === -1) {
                        // 把每一个标签都存进这个数组
                        this.tags.push(tag)
                        this.introductions[tag] = [];
                    }
                    // 查找到了添加进这个数组
                    this.introductions[tag].push(intro)
                }
            }
        }).catch(err=>{
            console.log(err);
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variable';
.tag-container {
    .tags {
        padding: 0;
        list-style: none;
        li {
            display: inline;
            margin-right: 0.3em;
        }
    }

    .tag-list {
        padding: 0;
        list-style: none;
        li {
            margin: 0.8em 0;
        }
    }

    a {
        color: $base;
    }
}
</style>