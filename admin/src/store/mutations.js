const mutations = {
    SET_TOKEN:(state,token)=>{
        state.token = token
    },
    SET_USERNAME:(state,username)=>{
        state.username = username
    },
    // 设置改变title的方法
    SET_TITLE:(state,title)=>{
        state.title = title
    },
    // 设置改变tags的方法
    SET_TAGS:(sate,tags)=>{
        state.tags = tags
    },
    // 设置改变content的方法
    SET_CONTENT:(sate,centent)=>{
        state.centent = centent
    },
    // 设置当前正在编辑的文章，将它放到Vuex中
    SET_CURRENT_ARTICLE:(state,{id,title,tags,content,isPublished})=>{
        state.id = id
        state.title = title
        state.tags = tags  
        state.content = content  
        state.isPublished = isPublished        
    },
    // 设置当前文章是否删除
    SET_DELETE_ARTICLE:(state)=>{
        state.toggleDelete = !state.toggleDelete
    },
    // 设置当前文章已发布的状态
    SET_PUBLISH_STATE:(state)=>{
        state.isPubished = 1
    },
}
export default mutations