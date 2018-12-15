<template>
    <div id="articleId">
        <header>
            <h1>{{ title }}</h1>
            <h4 class="time">{{ publishTime }}</h4>
            <h4>
                <span class="tag" v-for="(tag,index) in tags" :key="index">{{ tag }}</span>
            </h4>
        </header>
        <p v-html="parseMarkdown(content)"></p>
    </div>
</template>

<script>
import parseMarkdown from '@/utils/parseMarkdown'
import axios from '@/utils/axios'
import moment from 'moment'
moment.locale('zh-CN')
export default {
    name: 'Article',
    data() {
        return {
            title: '',
            publishTime: '',
            tags: '',
            content: ''
        }
    },
    mounted () {
        const id = this.$route.params.id;
        axios({
            url: `/getArticle/${id}`,
            method: 'get'
        }).then(res=>{
            // console.log(res.data[0]);
            this.title = res.data[0].title;
            this.publishTime = moment( res.data[0].publishTime).format('YYYY年 MMM DD日 HH:mm:ss');
            this.content = res.data[0].content;
            this.tags = res.data[0].tags ? res.data[0].tags.split(',') : [];
            // console.log(this.content);
            
        }).catch(err=>{
            console.log(err);
        })
    },
    methods: {
        parseMarkdown,
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variable';
.tag {
    color: $quote;
    margin-right: 1em;
}
p {
    // background-color: red;
}
#articleId a{
    // color: black;
}

</style>
