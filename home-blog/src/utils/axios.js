import axios from 'axios'
import Vue from 'vue'
 // 创建axios实例
const service = axios.create({
  baseURL: "http://localhost:3000/api", 
  timeout: 5000 
})

export default service