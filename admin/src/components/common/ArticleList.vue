<template>
    <div>
        <ul class="list">
            <!-- ,published:isPublished === 1 -->
            <li class="article" :class="{active:activeIndex === index}" v-for="({title,createTime,isPublished,isChosen},index) in articleList" :key="index" @click="select(index)" v-if="isChosen">
                <header>{{title}}</header>
                <p>{{createTime}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import request from '@/utils/request'
import moment from 'moment'
import { mapState,mapMutations } from 'vuex'
export default {
    name:"ArticleList",
    data:function () {
        return {
            articleList:[],
            activeIndex:-1
        }
    },
    // 把全局的vuex里面的state和mutations放在计算属性中
    computed:{
        ...mapState(['id','title','tags','content','isPublished','toggleDelete'])
    },
    // 当该组件创建的时候自动执行里面的请求
    created(){
        request({
            url:"/articles",
            method:'get'
        }).then(res=>{
            // console.log(res);
            for(let article of res){
                article.createTime = moment(article.createTime).format('YYYY年--MM月--DD日 HH:mm:ss')
                // console.log(article.createTime);
                article.isChosen = true
            }
            this.articleList.push(...res);
            // 如果查询文章，则将第一篇文章作为正在编辑的文章
            if(this.articleList.legth !== 0){
                this.SET_CURRENT_ARTICLE(this.articleList[0]);
                this.activeIndex = 0;
            }
            // console.log(this.articleList);
        }).catch(err=>{
            console.log(err);
        })
    },
    methods:{
        updateList (updateId) {
            request({
                url:`/articles/${updateId}`,
                method:'get'
            }).then(res=>{
                const article = res[0];
                article.createTime = moment(article.createTime).format('YYYY年-MM月-DD日 HH-mm-ss')
                article.isChosen = true;
                this.articleList.unshift(article);
                // 如果发布新文章的话，当前被传中的文章下标自动加1
                this.activeIndex++;
            }).catch(err=>{
                console.log(err);
            })
        },
        select (index) {
            this.activeIndex = index;
            // 当在选择文章的时候，当前选中的文章扔到全局状态管理里面
            this.SET_CURRENT_ARTICLE(this.articleList[index])
        },
        ...mapMutations(['SET_CURRENT_ARTICLE']),
        // 更新列表中的Tags
        // 这个方法是为了让父组件传递过来的数据，实现tag的文章显示或者隐藏
        updateListByTags(chosenTags) {
            //  tag组件传递过来的参数
            // 传递过来的值长度为0的话让article.isChosen 为 true  (article) 文章数组列表
            if (chosenTags.length === 0) {
                // 让每一个article.isChosen都为treue
                for (let article of this.articleList) {
                    // console.log(article.isChosen);
                    article.isChosen = true;
                }
            }else {
                for (let article of this.articleList) {
                    let flag = false
                    for (let tag of chosenTags) {
                        if (article.tags.indexOf(tag) !== -1) {
                            flag = true
                        }
                    }
                    // 如果查找到article里面是否有对应的tag，有的话让显示
                    if (flag) {
                        article.isChosen = true
                    }else {
                        article.isChosen = false
                    }
                }
                // entries() 方法返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)。
                // 迭代对象中数组的索引值作为 key， 数组元素作为 value。
                for (let [index, article] of this.articleList.entries()) {
                    // console.log(article);
                    // console.log(index);
                    
                    if (article.isChosen) {
                        this.activeIndex = index;
                        
                        // console.log(this.articleList[this.activeIndex]);
                        
                        // 调用方法，进行全局存储
                        this.SET_CURRENT_ARTICLE(this.articleList[this.activeIndex]);
                        break
                    }
                }
            }
        },
        updateArticleTag(oldVal, newVal, chosenTags) {
            // console.log('我被调用了');
            
            for (let [i, article] of this.articleList.entries()) {
                if (article.tags.length) {
                    const tags = article.tags.split(',')
                    const index = tags.indexOf(oldVal)
                    if (index !== -1) {
                        // console.log(newIndex);                        
                        const newIndex = tags.indexOf(newVal)
                        // 如果新值在该文章中已经有了，则直接删除旧值，否则将旧值修改为新值
                        if (newIndex === -1) {
                            tags[index] = newVal
                            article.tags = tags.join(',')
                            // console.log(article);
                            request({
                                url: `/updateTag/${article.id}`,
                                method: 'put',
                                data: {
                                    tags: article
                                }
                            }).then(res=>{
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }else {
                            this.deleteSpecArticleTag(oldVal, i)
                        }
                        this.updateListByTags(chosenTags)
                    }
                }
            }
            // 防止更改了activeIndex的article，所以提交一个mutation
            // this.updateArticle(this.articleList[this.activeIndex])
        },
        // 删除标签
        deleteArticleTag(tag) {
            // console.log(tag);
            
            for (let article of this.articleList) {
                // 文章已发布，至少保留一篇文章
                if (article.tags.length) {
                    // 把对象中的tags属性切割成数组
                    const tags = article.tags.split(',')
                    // 取出带有要删除标签的文章
                    const index = tags.indexOf(tag)
                    
                    if (index !== -1) {
                        if (tags.length === 1 && article.isPublished === 1) {
                            console.error('已发布文章请至少保持一个tag!')
                        }else {
                            // 删除标签
                            tags.splice(index, 1);
                            // 切割成数组形式
                            article.tags = tags.join(',');
                            console.log(article.tags + '    fawefa e');
                            request({
                                url: `/deltags/${article.id}`,
                                method: 'post',
                                data: {
                                    tags: article.tags
                                }
                            }).then(res=>{
                                console.log(res);
                            }).catch(err=>{
                               console.log(err);
                            })
                        }
                    }
                }
            }
            // 防止更改了activeIndex的article，所以提交一个mutation
            // this.updateArticle(this.articleList[this.activeIndex])
        },
    },
    // 监听vuex数据变化，如果发生变化，更新articleList数据
    watch:{
        title(val){
            if(this.articleList.length !== 0){
                this.articleList[this.activeIndex].title = val;
            }
        },
        tags(val){
            if(this.articleList.length !== 0){
                this.articleList[this.activeIndex].tags = val;
            }
        },
        content(val){
            if(this.articleList.length !== 0){
                this.articleList[this.activeIndex].content = val;
            }
        },
        isPublished(val){
            if(this.articleList.length !== 0){
                this.articleList[this.activeIndex].isPublished = val;
            }
        },
        toggleDelete(val){
            // 如果这个值变化，从false变为true，说明当前文章是需要删除的
            this.articleList.splice(this.activeIndex,1)
            if(this.activeIndex === this.articleList.length){
                this.activeIndex--;
            }
            if(this.articleList.length !== 0){
                this.SET_CURRENT_ARTICLE(this.articleList[this.activeIndex])
            }else{
                this.SET_CURRENT_ARTICLE({
                    id:'',
                    title:'',
                    tags:'',
                    content:'', 
                    isPublished:''  
                })
            }

        }
    }
}
</script>

<style lang="scss" type='text/scss' scoped>
@import "../../assets/style/variable";
.article {
    @include flex($flow: column wrap, $align: flex-start);
    padding: 0.2em 0.5em;
    margin-bottom: 1.5em;
    height: 5em;
    max-width: 100%;
    background: $white;
    border: 0.1em solid $special;
    cursor: pointer;
    transition: all .5s;
    header {
        max-width: 100%;
        font-size: 1.3rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.2em;
    }
    p {
        margin: 0;
        color: $special;
    }
    &:last-child {
        margin-bottom: 0;
    }
}
.article:hover {
    transform: scale(1.03);
    box-shadow: 0 0 0 3px #eee;
    border: 1px solid $base;
}
.active {
    border: 1px solid $base;
}

.published {
    border-right: 4px solid $base;
}
</style>

