<template>
  <div id="container">
    <el-carousel :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item of aboutMe" :key="item">
        <div class="medium">{{ item }}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "AboutContainer",
  data () {
    return {
      aboutMe:["您好,我叫方圆,英文名是Funny!","毕业于兰州理工大学计算机专业,来自于安徽滁州.",
        "我所掌握的技术有:HTML | CSS | JavaScript | Jquery | Vue | Sass | Stylus 等;熟悉使用Bootstrap | ElementUI 等辅助框架;熟练使用PS等辅助工具.",
        "周末没有工作的情况下多数会宅在家里面刷刷技术论坛的一些文章,日常瞻仰一些大佬;也会约三五好友打LOL,很享受那种和整个团队获得最后胜利的喜悦,LOL更多的是需要团队配合;又或者我会喊一些朋友来家里面给他们做上满满一桌的美食,我一直和他们说的是,没有我不会做的,只有好吃和一般的区别.哈哈.....这就是多数周末的我",
        "看了上面的这条可别以为我是个铁憨憨的宅男了奥,我也有旅行的梦,也有远方的心(奈何被Money这个小恶魔困住了).但是我还是会在节假日到周边去走走,见见世面.",
        "这就是我,一个热衷于前端技术,似宅非宅,喜欢交朋友的人.如果你想对我有更多了解的话.联系我吧.我的邮箱是:15151556015@163.com"]
    };
  }
}
</script>

<style lang="scss" scoped  type="text/css">
  #container {
    padding-top: 50px;
  }
  .el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-carousel__item div {
    color: #fff;
    padding: 20px;
    font-size: 24px;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #2d2d2d;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #3b3b3b;
  }
  #container /deep/ .el-carousel__arrow > i {
    color: #dd501a !important;
    font-size: 25px !important;
    font-weight: 1000 !important;
  }
</style>