<template>
    <div class="archive-container">
        <h1>文章归档</h1>
        <!-- <ul id='timeline'>
            <li class='work' v-for="(item,index) in introductions" :key="index">
                <input class='radio' id='work3' name='works' type='radio'>
                <div class="relative">
                    <label for='work3'>{{ item.title }}</label>
                    <span class='date'>{{ item.publishTime }}</span>
                    <span class='circle'></span>
                </div>
                <div class='content'>
                    <p>
                        {{ item.content }}
                    </p>
                </div>
            </li>
        </ul> -->
        <div class="content">
            <div class="wrapper">
                <!-- <div class="light"><i></i></div>
                <hr class="line-left">
                <hr class="line-right"> -->
                <div class="main">
                    <div class="year" v-for="(item,index) in years" :key="index">
                        
                        <h2><a href="#">{{item}}<i></i></a></h2>
                        <div class="list">
                            <ul>
                                <li class="cls" v-for="(sum,ind) in introductions[index]" :key="ind">
                                    <!-- {{sum[ind]}} -->
                                    <p class="date">{{sum}}</p>
                                    <p class="intro">微俱聚V5.4上线</p>
                                    <p class="version">&nbsp;</p>
                                    <div class="more">
                                        <p>形成完整的基础服务+互动推广+业务管理+行业应用+应用商店的服务架构</p>
                                        <p>注册用户突破10万，荣获“创业之星”大赛八强</p>
                                    </div>
                                </li>
                                <!-- <li class="cls">
                                    <p class="date">11月</p>
                                    <p class="intro">微俱聚v5.3上线</p>
                                    <p class="version">&nbsp;</p>
                                    <div class="more">
                                        <p>全新渠道代理管理后台上线，更便捷更强大</p>
                                        <p>荣获2013年微应用最佳服务商</p>
                                    </div>
                                </li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div>
            <h1>文章归档</h1>
            <section v-for="(year,index) in years" :key="index">
                <h4>{{ year }}</h4>
                <ul class="list" v-for="(intro,index) in introductions[year]" :key="index">
                    <li>
                        <router-link :to="'/articles/' + intro.id">{{ intro.title }}</router-link>
                        <span class="time"> {{ intro.publishTime }}</span>
                    </li>
                </ul>
            </section>
        </div> -->
    </div>
</template>

<script>
// import parseMarkdown from '@/utils/parseMarkdown'
import axios from "@/utils/axios";
import moment from "moment";
// 引入js文件
import "@/assets/js/XYtime";
// 引入css文件
// import "@/assets/css/timeXY.css";
moment.locale('zh-CN')
export default {
  name: "Archive",
  data() {
    return {
      introductions: [],
      years:[]
    };
  },
  created() {
    // 获取所有文章
    axios({
      url: "/getArticle",
      method: "get"
    }).then(res => {
        // console.log(res.data);
        
        // console.log(res.data);

        for (let intro of res.data) {
          const introYear = moment(intro.publishTime).format("YYYY年");
        //   const mon = moment(intro.publishTime).format("MM月");
        //   console.log(mon);
        //   intro.mon = mon;
                  
        //   intro.publishTime = introYear
        //   this.introductions.push(intro);
        //   // console.log(introYear);
          if (this.years.indexOf(introYear) === -1) {
            this.years.push(introYear);
            this.introductions[introYear] = [];
          }
          intro.publishTime = moment(intro.publishTime).format("MM-DD");
          this.introductions[introYear].push(intro);
        }
        console.log(this.years);
        // console.log(this.introductions);
        
        console.log(this.introductions);
        
      }).catch(err => {
        // console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/style/variable";
// .archive-container {
//   ul {
//     /*padding-left: .2em;*/
//     list-style-type: circle;
//     li {
//       margin: 0.8em 0;
//     }
//   }

//   .date {
//     color: $special;
//   }

//   a {
//     color: $base;
//   }
// }

</style>
