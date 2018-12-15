<template>
    <footer class="foot">
        <div class="foot-box">
            <ul class="clear">
                <li>
                    <h3>尹旭冉 · 个人博客</h3>
                    <p>Hi~欢迎访问我的博客！</p>
                    <p>你可以通过以下的方式联系我！</p>
                    <div>
                        <div class="wx"></div>
                        <div class="qq"></div>
                    </div>
                </li>
                <li>
                    <h3>Languages</h3>
                    <p><i></i><span>HTML5</span></p>
                    <p><i></i><span>CSS3</span></p>
                    <p><i></i><span>JavaScript</span></p> 
                    <p><i></i><span>Node</span></p>                                  
                </li>
                <li>
                    <h3>Dreams</h3>
                    <p><i></i><span>成为全栈工程师</span></p>
                    <p><i></i><span>成为阿里工程师</span></p>
                    <p><i></i><span>换取一堆堆的发票</span></p>
                </li>
                <li>
                    <h3>Interests</h3>
                    <p><i></i><span>喜欢健身</span></p>
                    <p><i></i><span>音乐, 美, 浪漫</span></p>
                    <p><i></i><span>动漫掌控者</span></p>
                </li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variable';
ul,li{
    margin: 0;
    padding: 0;
    list-style: none;
}
.foot {
    background: rgba(0,0,0,.9);
    .foot-box {
        max-width: 850px;
        margin: 0 auto;
        ul {
            li {
                float: left;
                font-size: 14px;
                margin-right: 5em;
                h3 {
                    color: $white;
                }
                p {
                    span {
                        cursor: pointer;
                    }
                    span:hover {
                        border-bottom: 2px solid $base;
                    }
                }
            }
        }
    }
}
h3::before {
    display: none;
}
</style>
