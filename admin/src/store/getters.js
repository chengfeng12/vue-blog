const getters = {
    // 把tags字符串切成数组返回    
    getTags:state=>{
        if(tags.length !== 0){
            return state.tags.split(',')
        }
    }
}
export default getters