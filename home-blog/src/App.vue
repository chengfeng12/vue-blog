<template>
  <div id="app">
    <Header></Header>
    <div id="main" @click="sweepMask">
        <transition mode="out-in" name="fade" @before-enter="beforeEnter" @after-enter="afterEnter">
            <router-view/>
        </transition>
    </div>
    <footer id="app-footer">本博客由博主提供支持.</footer>
  </div>
</template>

<script>
import Header from '@/components/common/Header'
export default {
    name: 'App',
    components:{
      Header
    },
    data() {
        return {
            maskFlag: false
        }
    },
    methods: {
        sweepMask() {
            this.maskFlag = !this.maskFlag
            // console.log(this.maskFlag);
        },

        // 为了定义底部的过度效果
        afterEnter() {
            const footer = document.getElementById('app-footer')
            // console.log(footer);
            
            footer.className = 'solid'
        },
        beforeEnter() {
            const footer = document.getElementById('app-footer');
            // console.log(footer);
            footer.className = 'trans'
        }
      }
    }
</script>

<style lang="scss" scoped>
@import "assets/style/variable";
    #app {
        margin-left: -20em;
    }
    #app-footer {
        font-weight: 200;
        width: 100%;
        font-size: 1.4rem;
        margin: 0 auto;
        color: #666;
        padding: 20px 0;
        text-align: center;
        box-shadow: 0 -1px 0 rgba(0, 0, 0, .25);
        .github {
            color: $base;
        }
    }

    .trans {
        opacity: 0;
    }

    .solid {
        opacity: 1;
    }
    @media screen and (max-width: 850px) {
        #app {
            margin-left: 0;
        }
    }
    @media screen and (max-width: 630px) {
        #app {
            margin-left: 0;
        }
    }
</style>
