<template>
<div style="height: 100%">
    <head-nav></head-nav>
    <Aside></Aside>
    <div class="tag-container main">
        <h2>标签筛选 /
            <span>CHOOSE BY TAG</span>
        </h2>
        <hr>
        <main>
            <div class="tag-list">
                <section class="tag">
                    <h5>标签</h5>
                    <!--  @click="chooseTag($event)" -->
                    <ul class="tags">
                        <!-- :class="{chosen: chosenTags.indexOf(tag) > -1}" -->
                        <li class="tag" v-for="(tag,index) in tags" :key="index" :newArr="tag">{{ tag.tags }}</li>
                    </ul>
                </section>
                <!-- v-show="chosenTags.length" -->
                <section class="chosen-tag">
                    <h5>修改标签</h5>
                    <ul class="tags">
                        <!-- v-for="tag,index in chosenTags" -->
                        <li class="tag-edit">
                            <!--  :value="tag" @change="changeTag($event, index)"  -->
                            <input type="text" class="tag-input">
                            <!-- @click="deleteTag(tag, index)" -->
                            <sup>x</sup>
                        </li>
                    </ul>
                </section>
                <!-- ref="articleList" -->
                <article-list v-on:tags="getTags"></article-list>
            </div>
            <editor></editor>
        </main>
    </div>
</div>
</template>

<script>
// 引入request请求模块
import request from '@/utils/request'
// 引入组件
import Aside from "@/components/common/Aside";
import HeadNav from "@/components/common/HeadNav";
// 引入文章列表的组件
import ArticleList from '@/components/common/ArticleList'
// 引入文章的编辑的组件
import Editor from '@/components/common/Editor'

export default {
    name: 'Tag',
    components: {
        Aside,
        HeadNav,
        Editor,
        ArticleList
    },
    data () {
        return {
            tags: [],
            chosenTags: [],
            tag:''
        }
    },
    methods: {
        getTags(tags) {
            console.log(tags);
            this.tags.push(...tags);
        }
    },
    mounted () {
        request({
            url: '/getTag',
            method: 'get'
        }).then(res=>{
            console.log(res);
            this.tags = res;
        }).catch(err=>{
            console.log(err);
        })
    } 
}
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
main {
    @include flex($justify: space-between);
    height: calc(100% - 48px);
    padding: 0.5em 0;
}

.tag-list {
    width: 40%;
    height: 100%;
    overflow: auto;
    padding: 0 0.8em 0.5em 0;
    .tags {
        @include flex($justify: flex-start);
        list-style: none;
        margin-bottom: 2em;
        padding: 0;
        .tag {
            margin: 0 1em 1em 0;
            padding: 0.3em;
            color: $base;
            border-radius: 2px;
            border: 1px solid $base;
            cursor: pointer;
        }
        .chosen {
            color: $white;
            background: $base;
        }

        .tag-edit {
            margin-right: 3px;
        }
    }
    .list {
        margin: 0;
        list-style: none;
        padding: 0;
    }
}

.editor {
    width: 58%;
    height: 100%;
    padding: 0 0.8em 0.5em 0;
    overflow: auto;
}
</style>
