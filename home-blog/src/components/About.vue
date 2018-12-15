<template>
    <div class="about-container">
        <h1>关于我</h1>
        <p v-html="parseMarkdown(about)"></p>
    </div>
</template>

<script>
import parseMarkdown from '@/utils/parseMarkdown'
import axios from '@/utils/axios'
export default {
    data() {
        return {
            about: ''
        }
    },
    created() {
        axios({
            url: '/aboutNull',
            method: 'get'
        }).then(res=>{
            this.about = res.data[0].content;
            // console.log(res.data[0]);
        }).catch(err=>{
            console.log(err)}
        )
    },
    methods: {
        parseMarkdown
    }
}
</script>

<style lang="scss" scoped>
h1 {
    padding-bottom: 1em;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
}

ul {
    padding-left: 1.2em;
    li {
        margin: 1em auto;
    }
}
</style>
