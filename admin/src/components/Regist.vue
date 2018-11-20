<template>
    <div class="regist-container">
        <header class="regist-head">
            <!-- <i class=""></i> -->
            <span>yxr博客系统</span>
            <img class="logo" src="../assets/image/logo.png" alt="regist">
        </header>
        <section class="form">
            <span class="slogan">
                注注注注...册
                <span>/regist</span>
            </span>
            <input name="user" type="text" id="use"  @blur="userBlur" placeholder="请输入用户名" v-model="RegistForm.user">
            <p>{{data.userMessage}}</p>
            <input name="password" type="password" class="password" @blur="passwordBlur" placeholder="请输入密码" v-model="RegistForm.password" @keydown.enter="regist">
            <p>{{data.passwordMessage}}</p>            
            <input name="twoPassword" type="password" class="password" @blur="twoPasswordBlur" placeholder="请再次输入密码" v-model="RegistForm.twopassword" @keydown.enter="regist">
            <p>{{data.twopasswordMessage}}</p>            
            <div>
                <button id="login" @click="login">登录</button>
                <button id="regist" @click="regist">注册</button>
            </div>
        </section>
        <footer>Always</footer>
        <div class="eject" :class="{scaleBig:data.warning}">
            <span @click="data.warning = !data.warning">x</span>
            <p>{{data.msg}}</p>
        </div>
        <!-- <notifications group="user"></notifications>
        <notifications group="admin"></notifications> -->
        <!-- <notifications group="admin"></notifications> -->
        <!-- <span>{{errors.first('user')}}</span>
        <span>{{errors.first('password')}}</span>
        <span>{{errors.first('twoPassword')}}</span>   -->
    </div>
</template>

<script>
// 设置验证的中文提示消息
import { Validator } from 'vee-validate';

// 设置token的方法
// import { setToken } from '@/utils/auth';

// 引入发请求的模块
import request from '@/utils/request'
export default {
    neme: 'Regist',
    data () {
        return {
            data: {
                userMessage:'',
                passwordMessage:'',
                twopasswordMessage:'',
                regular:false,
                warning:false,
                msg:''
            },
            RegistForm:{
                user:'',
                password:'',
                twopassword:''
            },
            regular: {
                user: /^[\w]{4,16}$/,
                password: /^[\w]{6,16}$/
            }
        }
    },
    methods: {
        userBlur () {
            if(this.RegistForm.user.length == 0) {
                this.data.regular = false;
                this.data.userMessage = '用户名不能为空'
            }else if(!this.regular.user.test(this.RegistForm.user)){
                this.data.regular = false;                
                this.data.userMessage = '用户名格式输入错误'
            }else{
                this.data.userMessage = ''
                this.data.regular = true;
            }
        },
        passwordBlur () {
            if(this.RegistForm.password.length == 0) {
                this.data.regular = false;
                this.data.passwordMessage = '密码不能为空'
            }else if(!this.regular.password.test(this.RegistForm.password)){
                this.data.regular = false;              
                this.data.passwordMessage = '密码格式输入错误'
            }else{
                this.data.passwordMessage = '';          
                this.data.regular = true;
            }
        },
        twoPasswordBlur () {
            if(this.RegistForm.password.length == 0) {
                this.data.regular = false;
                this.data.twopasswordMessage = '密码不能为空'
            }else if(this.RegistForm.password !== this.RegistForm.twopassword) {
                this.data.twopasswordMessage = '两次密码不一致';
                this.data.regular = false;
            }else{
                this.data.twopasswordMessage = '';          
                this.data.regular = true;
            }
        },
        login () {
            console.log(this.errors.items);
            this.$router.push('/login')
        },
        regist () {
            this.data.regular
            if(this.data.regular){
                request({
                    url: '/regist',
                    method: 'post',
                    data: {
                        user: this.RegistForm.user,
                        password: this.RegistForm.password
                    }
                }).then(res=>{
                    // console.log('接收成功');
                    console.log(res);
                    if(res.success){
                        this.data.warning = true;
                        this.data.msg = res.msg;
                        setTimeout(function(){
                            console.log('我是跳转的内容');
                            console.log(this);
                            
                            // this.$router.push('/login');
                        },3000)
                    }else{
                        this.data.warning = true;
                        this.data.msg = res.msg;                        
                    }
                }).catch(err=>{
                    console.log('接收失败');
                })
            }else{
                console.log('注册失败');
                if(this.RegistForm.user.length == 0) {
                    this.data.regular = false;
                    this.data.userMessage = '用户名不能为空'
                }
                if(this.RegistForm.password.length == 0) {
                    this.data.regular = false;
                    this.data.passwordMessage = '密码不能为空'
                }
                if(this.RegistForm.password.length == 0) {
                    this.data.regular = false;
                    this.data.twopasswordMessage = '密码不能为空'
                }
            }
        }
    },
}
</script>

<style lang="scss" scoped>
// 记得引入全局的变量文件
@import "../assets/style/variable";
.regist-container {
    height: 100%;
    // background-color: $base;
    // overflow: hidden;
    @include flex($flow: column wrap);
    font-family: "KaiShu", "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
    .regist-head {
        @include flex;
        width: 100%;
        height: 3em;
        font-size: 2rem;
    }

    .form {
        @include flex($flow: column wrap);
        width: 400px;
        height: 300px;
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
            // margin-bottom: 2em;
            width: 20em;
            height: 2.5em;
            outline-color: $base;
            border-radius: 3px;
            border: 1px solid #ccc;
        }
        p {
            width: 200px;
            height: 13px;
            color: $red;
            margin: 4px 0;
            text-align: left;
        }
        div {
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
                margin:  .4em;
                outline: none;
                cursor: pointer;
            }
        }
    }
    footer {
        height: 4em;
        @include flex;
        justify-self: flex-end;
    }
    .eject {
        position: relative;
        width: 200px;
        height: 110px;
        background-color: #fff;
        box-shadow: 0px 2px 4px #aaa;
        top: -250px;
        transform: scale(0);
        transition: all .2s;
        p {
            text-align: center;
            // position: absolute;
            font-size: 20px;
            color: $base;
            margin: 40px 0;
        }
        span {
            font-size: 20px;
            position: absolute;
            top: 0;
            right: 0;
            display: inline-block;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            cursor: pointer;           
        }
    }
    .scaleBig {
        transform: scale(1.2);
    }
}
</style>
