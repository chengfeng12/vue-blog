<template>
    <div class="editor">
        <!-- <input type="text" class="title" id="title" v-model="title" @input="autoSave">
        <div class="operate-bar" v-show="id && $route.path === '/lists'">
            <section class="tag-container">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-huiyuanbiaoqian"></use>
                </svg>
                <ul class="tags">
                    <li v-for="tag, index in tags" class="tag" :key="index">{{ tag }}
                        <sup @click="deleteTag(index)">x</sup>
                    </li>
                </ul>
                <input type="text" class="tag-input" id="tag-input" v-if="inputNow" @keyup.enter="toggleInput" @change="autoSave">
                <span class="tag-add" @click="toggleInput" v-else>+</span>
            </section>
            <section class="btn-container">
                <button id="delete" class="delete" @click="deleteArticle">删除文章</button>
                <button id="submit" class="not-del" @click="publishArticle">发布文章</button>
            </section>
        </div>
        <p class="tips" v-if="$route.path !== '/lists'">标签查询页面只能批量更改标签，修改的文章内容会自动保存。</p>
        <div class="content">
            <textarea></textarea>
        </div> -->
    </div>
</template>

<script>
export default {

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
            width: 1.5em;
            height: 1.5em;
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

