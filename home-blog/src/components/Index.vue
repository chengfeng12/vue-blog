<template>
    <div class="hello">
        <div class="clear per-header">
          <div class="personal">
            <div class="per-left">
              <div class="per-bg"></div>
              <div class="per-p">
                <p>生命之花的开放，唯有不懈的奋斗</p>
              </div>
              <div class="logo"></div>
            </div>
          </div>
          <div class="per-right">
            <h3>PERSONAL INFO</h3>
            <p><span>博主：</span><span>尹旭冉个人博客</span></p>
            <p><span>微信：</span><span>weimotang</span></p>
            <p><span>邮箱：</span><span>913457727@qq.com</span></p>
            <p><span>Blog：</span><span>yinxvran.com</span></p>
          </div>
        </div>
        <div class="articles">
          <ul>
            <li v-for="(item,index) in articles" :key="index">
              <div class="clear art-box">
                <div class="left">
                   <router-link class="article" :to="'/articles/' + articles[index].id">
                    <img src="../assets/img/indexImg/index1.jpg" alt="">
                  </router-link>
                </div>
                <div class="right">
                  <!-- {{articles[index].id}} -->
                  <router-link class="article" :to="'/articles/' + articles[index].id">
                    <h3>{{articles[index].title}}</h3>
                    <p>{{articles[index].content}}</p>
                  </router-link>
                </div>
              </div>
              <div class="pBox">
                <span class="time"><i></i>{{articles[index].publishTime}}</span>
                <span class="all"><router-link class="article allA" :to="'/articles/' + articles[index].id">阅读全文<i></i></router-link></span>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      articles:[]
    }
  },
  created () {
    axios({
      url: '/getArticle',
      method: 'get'
    }).then(res=>{
      // console.log(res.data);
      this.articles = res.data;
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variable';
.articles {
    width: 100%;
    li {
      margin-bottom: 20px;
      margin: 15px 0 20px;
      background-color: #fff;
      box-shadow: 0 1px 2px rgba(0,0,0,.1);
      border-radius: 5px;
      transition: all .2s;
    }
    li:hover{
      box-shadow: 0px 0px 10px rgba(0,0,0,.3);
    }
}
.article {
  // display: inline-block;
  color: $black;
}
ul,li {
    margin: 0;
    padding: 0;
    list-style: none;
}
h3::before {
      display: none;
    }
.personal {
    display: inline-block;
    margin: 25px 0;
    width: 25em;
    height: 14em;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    border-radius: 0;
    .per-left {
      position: relative;
      right: 0;
      height: 100%;
      width: 100%;
      .per-bg {
        height: 50%;
        width: 100%;
        background-image: url('../assets/img/indexImg/txbg.jpg');
        background-size: cover;
      }
      .per-p {
        text-align: center;
        padding-top: 1em;
        line-height: 6em;
      }
      .logo {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -45px;
        margin-top: -45px;
        width: 90px;
        height: 90px;
        background-color: #fff;
        border-radius: 50%;
        background-image: url('../assets/img/logo.png');
        background-size: cover;
        transition: all 1s;
      }
      .logo:hover {
        transform: rotate(360deg);
      }
    }
}
.per-right {
  float: right;
  margin: 25px 0;
  width: 32em;
  height: 14em;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  h3 {
    margin-left: 15px;
  }
  p {
    margin-left: 15px;
    font-size: 1.1em;
  }
  p span:nth-child(2) {
    font-size: .9em;
  } 
}
.left {
    position: relative;
    float: right;
    width: 240px;
    height: 145px;
    overflow: hidden;
    margin: 20px;
    img {
        display: block;
        padding: 2px;
        border: 1px solid #f3f3f3;
        height: 145px;
        width: 240px;
    }
    div {
      width: 240px;
      height: 145px;
    }

}
.clear::after {
    content: '';
    display: block;
    clear: both;
}
.art-box {
  margin-bottom: 8px; 
}
.pBox {
    margin-top: 16px;
    padding: 8px 20px;
    border-top: 1px solid #F3F3F3;
    line-height: 27px;
    overflow: hidden;
    display: block;
    clear: both;
    font-size: 12px;
    .time i{
      margin-left: 15px;
    }
    .all {
      float: right!important;
      line-height: 27px;
    }
}
.right {
    float: left;
    width: 40em;
    padding: 21px 20px 0 3px;
    a {
        h3 {
        width: 100%;
        height: 100%;
        margin: 3px 0 6px 15px;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        max-height: 25px;
      }
      p {
        height: 100px;
        margin: 3px 0 6px 15px;
        display: -webkit-box;
        line-height: 1.8em;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
        text-indent: 2em;
      }
    }
}
@media screen and (max-width: 850px){
  .left {
    float: left;
    img {
      transform: scale(.7);
    }
  }
  .right {
    p {
      width: 100%;
    }
  }
}
@media screen and (max-width: 630px){
  .right {
    p {
      width: 100%;
    }
  }
}
</style>
