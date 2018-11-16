
const getters = {
    // 把tags字符串切成数组返回    
    getTags:state=>{
        if(state.tags.length !== 0){
            return state.tags.split(',')
        }
        return []
    },
    getTitle:state=>{
        return state.title
    }
}
export default getters