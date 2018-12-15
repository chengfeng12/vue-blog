<template>
    <div style="height: 100%">
        <head-nav></head-nav>
        <Aside></Aside>
        <div class="about-container main">
            <h2>关于我 /
                <span>ABOUT ME</span>
            </h2>
            <hr>
            <main>
                <div class="content">
                    <textarea></textarea>
                </div>
                <section class="btn-container">
                    <button class="not-del" @click="updateAbout">提交修改</button>
                </section>
            </main>
        </div>
    </div>
</template>

<script>
// 引入头部和侧边导航组件
import HeadNav from '@/components/common/HeadNav'
import Aside from '@/components/common/Aside'
// 引入编辑器
import 'simplemde/dist/simplemde.min.css'
import SimpleMDE from 'simplemde'
// 引入请求模块
import request from '@/utils/request'
export default {
    name: 'About',
        components: {
        HeadNav,
        Aside
    },
    data () {
        return {
            id: '',
            simplemde: ''
        }
    },
    mounted () {
        this.simplemde = new SimpleMDE({
            placeholder:'State your own personality...',
            spellChecker:false,
            toolbarTips:false
        });
        request({
            url: '/about',
            method: 'get'
        }).then(res=>{
            this.id = res[0].id;
            this.simplemde.value(res[0].content);
        }).catch(err=>{
            console.log(err);
        })
    },
    methods: {
        updateAbout () {
            // this.simplemde.codemirror.on('keyHandle')
            // this.simplemde.codemirror.on('inputRead')
            request({
                url: '/updateAbout',
                method: 'put',
                data:{
                    id: this.id,
                    content: this.simplemde.value()
                }
            }).then(res=>{
                console.log('保存成功');
            }).catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
main {
    
    height: calc(100% - 48px);
    padding: 0.5em 0;
    overflow: auto;
    font-size: 1.6rem;
}

.btn-container {
    @include flex($justify: flex-end);
}
</style>
