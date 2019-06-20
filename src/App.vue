<template>
  <div id="app">
    <!-- <blog-header></blog-header>
    <router-view></router-view>
    <blog-footer></blog-footer> -->
    <!-- <el-container style="height: 500px; border: 1px solid #eee"> -->
    <el-container>
      <el-header>
        <blog-header></blog-header>
      </el-header>
      <el-main>
        <router-view v-if="isRouterAlive"></router-view>
      </el-main>
      <el-footer>
        <div id="footer">
          <blog-footer></blog-footer>
        </div>
      </el-footer>
    </el-container>
    <div id="bg"></div>
  </div>  
</template>

<script>
import BlogHeader from '@/common/BlogHeader'
import BlogFooter from '@/common/BlogFooter'
export default {
  name: 'App',
  components:{
    BlogHeader,
    BlogFooter
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 刷新页面
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    createStar() {
      // 屏幕的尺寸
      let screenW = document.documentElement.offsetWidth,
          screenH = document.documentElement.offsetHeight,
          bg = document.querySelector("#bg");
      // console.log(screenW,screenH);
      
      // 2. 动态创建多个星星
      for(let i=0; i<150; i++){
        let star = document.createElement('star');
        bg.appendChild(star);

        //位置随机
        let x = parseInt(Math.random() * (screenW-60));
        let y = parseInt(Math.random() * (screenH-60));
        star.style.left = x + 'px';
        star.style.top = y + 'px';

        //大小随机
        let scale = Math.random() * 1.5;
        star.style.transform = 'scale('+ scale + ', ' + scale + ')';

        //频率随机
        let rate = Math.random() * 1.5;
        star.style.animationDelay = rate + 's';
      }
    }
  },
  mounted() {
    this.createStar()
  },
}
</script>
  
<style lang="scss" type="text/css">
@import 'styles/variables.scss';
  #app {
    min-height: 100%;
    
    color: #fff;
    // overflow: hidden;
  }
  .el-container{
    // height: 100%;
    // display: flex;
    // justify-content: center;
  }
  .el-header{
    width: 100%;
  }
  /* 弹出提示框显示等级最高 */
  .el-message {
      @include z-index4;
    }
  #bg {
    @include z-index1;
  }
  .el-main {
    min-height: 800px;
    width: 1240px;
    margin: 0 auto;
  }
  .el-footer {
    // position: absolute;
    bottom: 0;
    background: #2d2d2d !important;
    padding: 0 !important;
    #footer {
      width: 1240px;
      margin: 0 auto;
      background: #2d2d2d !important;
    }
  }
  star{
    width: 30px;
    height: 30px;
    background: url("./assets/images/star.png") no-repeat;
    position: absolute;
    background-size:100% 100%;
    animation: flash 1s alternate infinite;
  }
  
  @keyframes flash {
    0%{opacity: 0;}
    100%{opacity: 1;}
  }

  star:hover{
    transform: scale(3, 3) rotate(180deg) !important;
    transition: all 1s;
  }
  .el-menu--horizontal {
    @include z-index5;
  }
  .el-select-dropdown {
    @include z-index3;;
    background: skyblue !important;
    .popper__arrow::after {
      border-bottom-color: skyblue !important;
    }
  }
  .el-message-box__wrapper {
    z-index: 10006 !important;
  }
</style>
