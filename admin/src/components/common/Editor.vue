<template>
    <div class="editor">
        <!--  v-model="title" @input="autoSave" -->
        <input type="text" class="title" id="title" v-model="title">
        {{title}}
        <!--  v-show="id && $route.path === '/lists'" -->
        <div class="operate-bar">
            <section class="tag-container">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-biaoqian"></use>
                </svg>
                <ul class="tags">
                    <li class="tag" v-for="(tag, index) in getTags" :key="index">
                        {{tag}}
                        <!--  @click="deleteTag(index)" -->
                        <sup>x</sup>
                    </li>
                </ul>
                <!--  v-if="inputNow" @keyup.enter="toggleInput" @change="autoSave" -->
                <input type="text" class="tag-input" id="tag-input">
                <!-- @click="toggleInput" v-else -->
                <span class="tag-add" >+</span>
            </section>
            <section class="btn-container">
                <!-- @click="deleteArticle" -->
                <button id="delete" class="delete" >删除文章</button>
                <!--  @click="publishArticle" -->
                <button id="submit" class="not-del">发布文章</button>
            </section>
        </div>
        <!--  v-if="$route.path !== '/lists'" -->
        <p class="tips">标签查询页面只能批量更改标签，修改的文章内容会自动保存。</p>
        <div class="content">
            <textarea></textarea>
        </div>
        <!-- {{tags}} -->
    </div>
</template>

<script>
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'
import { mapState, mapGetters } from 'vuex'
export default {
    name:"Editor",
    data(){
        return {
            simplemde:'', // 编辑器
        }
    },
    computed:{
        ...mapState(['id','title','content','isPublished']),
        ...mapGetters(['getTags'])
    },
    mounted(){        
        this.simplemde = new SimpleMDE({
            placeholder:'Talk to me , what are you say...',
            spellChecker:false,
            toolbarTips: false,
        });
        // 将vuex里面的正在编辑文章的相关信息输出到编辑器里面
        // console.log(this.content);
    },
    // 监控ID值的变化，如果一旦发生变化，就直接将内容变化
    watch:{
        id(newVal,oldVal){
            console.log(this.title);
            // this.SET_CURRENT_ARTICLE(title);
            this.simplemde.value(this.content)
        }
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/variable";
.title {
    margin-bottom: 0.3em;
    width: 100%;
    height: 2em;
    border: none;
    font-size: 2.4rem;
    color: $title;
    outline: none;
    border-bottom: 1px solid $special;
    background: none;
    text-align: center;
}
.operate-bar {
    @include flex($justify: space-between);
    height: 4em;
    font-size: 1.3rem;
    margin-bottom: 1em;
    .tag-container {
        @include flex($justify: flex-start);
        .icon {
            width: 1.2em;
            height: 1.2em;
            margin-right: 10px;
        }
        .tags {
            @include flex;
            list-style: none;
            margin-right: 10px;
            padding: 0;
            .tag {
                margin-right: 10px;
                color: $base;
                position: relative;
                &:last-child {
                    margin-right: 0px;
                }
            }

        }
        .tag-add {
            font: {
                weight: 600;
                size: 1.6rem;
            }
            color: $special;
            text-decoration: underline;
            cursor: pointer;
        }
    }
}
.tips {
    color: $quote;
    text-align: center;
}
.content {
    font-size: 1.6rem;
}
</style>

