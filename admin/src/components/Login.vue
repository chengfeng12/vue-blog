<template>
    <div class="login-container">
        <header class="login-head">
            <!-- <i class=""></i> -->
            <span>yxr博客系统</span>
            <img class="logo" src="../assets/image/logo.png" alt="login">
        </header>
        <section class="form">
            <span class="slogan">
                登登登登...录
                <span>/login</span>
            </span>
            <input name="user" v-validate="'required|min:4|max:16|alpha_dash'" type="text" id="use" placeholder="请输入用户名" v-model="LoginForm.user">
            <!-- alpha_num 可以包含英文和数字 -->
            <input name="password" v-validate="'required|max:12'" type="password" id="password" placeholder="名输入密码" v-model="LoginForm.password" @keydown.enter="login">
            <button id="login" @click="login">登录</button>
        </section>
        <footer>Always</footer>
        <notifications group="user"></notifications>
        <notifications group="admin"></notifications>
        <!-- <span>{{errors.first('user')}}</span> -->
        <!-- <span>{{errors.first('password')}}</span>         -->
    </div>
</template>

<script>
// 设置验证的中文提示消息
import { Validator } from 'vee-validate';

// 设置token的方法
import { setToken } from '@/utils/auth'
const dict = {
    custom: {
        // 该字段名字
        user: {
            required: '您的用户名不能为空' 
        },
        password: {
            required: ()=> '您的密码不能为空'
        }
    }
};
Validator.localize('en',dict); //change the locale

// 引入发请求的模块
import request from '@/utils/request'
export default {
    neme: 'Login',
    data () {
        return {
            LoginForm:{
                user:'',
                password:''
            }
        }
    },
    methods: {
        // 登录方法
        login:function () {
            // 首先拿到验证成功失败的结果，如果成功了在进行登录，如果失败，则进行消息提示
            // console.log(this.errors.items);
            if(this.errors.items.length === 0) {
                // console.log('全部成功');
                request({
                    url:'/login',
                    method:'post',
                    data:this.LoginForm
                }).then(res=>{
                    // console.log(res);
                    if(res.success){
                        this.$notify({
                            type:'warn',
                            group: 'user',
                            title:'登录成功',
                            text:res.message
                        })
                        // 正确后，要先得到 token 值，将 token 存到 Cookie 中
                        // 成功之后开始跳转 list 页面
                        let token = res.token;
                        setToken(token);
                        this.$store.commit('SET_TOKEN',token);
                        this.$router.push('/list');
                    }else{
                        // 如果用户名密码不正确，要给出提示
                        this.$notify({
                            type:'error',
                            group: 'user',
                            title:'登录失败',
                            text:res.message
                        })
                        // this.LoginForm
                    }
                }).catch(err=>{
                    // 如果发送请求的时候信息错误，把错误扔进控制台输出
                    console.log(err);  
                })
            }else{
                this.$notify({
                    // width: '50%',
                    type:'warn',
                    group:'user',
                    title:'验证失败',
                    text: this.errors.items[0].msg
                })
            }
        }
    },
    // 钩子函数，当组件加载完毕之后自动执行
    // mounted:function () {
    //     request({
    //         url:'/test',
    //         method:"post",
    //         data: {
    //             a: 'a'
    //         }
    //     }).then(({data})=>{
    //         console.log(data);
    //     })
    // }
}
</script>

<style lang="scss" scoped>
// 记得引入全局的变量文件
@import "../assets/style/variable";
.login-container {
    height: 100%;
    // background-color: $base;
    // overflow: hidden;
    @include flex($flow: column wrap);
    font-family: "KaiShu", "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    .login-head {
        @include flex;
        width: 100%;
        height: 3em;
        font-size: 2rem;
    }

    .form {
        @include flex($flow: column wrap);
        width: 400px;
        height: 250px;
        border-top: 20px solid $base;
        border-radius: 5px;
        // box-shadow: 4px 4px 5px -3px rgba(0, 0, 0, .3);
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.6);
        .slogan {
            font-size: 1.6rem;
            margin-bottom: 1em;
            //color: $quote;
            span {
                color: $base;
            }
        }
        input {
            font: {
                size: 1rem;
                family: Dosis, Arial, sans-serif;
            }
            margin-bottom: 2em;
            width: 20em;
            height: 2.5em;
            outline-color: $base;
            border-radius: 3px;
            border: 1px solid #ccc;
        }
        button {
            color: $white;
            font: {
                size: 1.6rem;
                family: KaiShu, Arial, sans-serif;
            }
            width: 6em;
            height: 2em;
            border: none;
            background: $base;
            outline: none;
            cursor: pointer;
        }
    }
    footer {
        height: 4em;
        @include flex;
        justify-self: flex-end;
    }
}
</style>
