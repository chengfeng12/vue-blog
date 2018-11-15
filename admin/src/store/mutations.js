const mutations = {
    SET_TOKEN:(state,token)=>{
        state.token = token
    },
    SET_USERNAME:(state,username)=>{
        state.username = username
    },
    // 设置当前正在编辑的文章，将它放到Vuex中
    SET_CURRENT_ARTICLE:(state,{id,title,tages,contneet,isPubished})=>{
        state.id = id
        state.title = title
        state.tags = tags  
        state.content = contnet  
        state.isPubished = isPubished        
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