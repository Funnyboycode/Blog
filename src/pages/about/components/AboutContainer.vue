<template>
  <div id="container">
    <el-carousel :autoplay=false :interval="4000" type="card" height="400px">
      <el-carousel-item v-for="item of aboutMe" :key="item">
        <div class="medium">{{ item }}</div>
      </el-carousel-item>
    </el-carousel>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <p class="aboutBlog">有关本站</p>
        <div class="about">
          <p>这个博客主要用于记录自我的前端成长之路</p>
          <p>这也是自己第一次做博客，希望和大家多多交流，一起成长！</p>
          <p>欢迎大家提一些对本站的建议，可以直接邮箱联系我</p>
        </div>
        
      </div>
      <ul>
        <li v-for="(item, index) in info" :key="index">{{item}}</li>
      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AboutContainer",
  data () {
    return {
      aboutMe:["您好,我叫方圆,英文名是Funny!","毕业于兰州理工大学计算机专业,来自于安徽滁州.",
        "我所掌握的技术有:HTML | CSS | JavaScript | Vue | Sass | Stylus 等;熟悉使用Bootstrap | ElementUI 等辅助框架;熟练使用PS等辅助工具.",
        "周末没有工作的情况下多数会宅在家里面刷刷技术论坛的一些文章,日常瞻仰一些大佬;也会约三五好友打LOL,很享受那种通过和整个团队配合获得最后胜利的喜悦;又或者我会喊一些朋友来家里面给他们做上满满一桌的美食,一直和朋友玩笑说,没有我不会做的,只有好吃和一般的区别.哈哈.....这就是我",
        "这就是我,一个热衷于前端技术,似宅非宅,喜欢交朋友的人.如果你想对我有更多了解的话.联系我吧.我的邮箱是:15151556015@163.com"],
      info:['实现了用户注册、登录、检测登录、博客管理（文章和项目的修改及删除）、文章编辑等功能。',
      '前端使用vue全家桶（cli,router,vuex,axios），框架用的elmentUI',
      '后端使用node,框架用的express,mongoose',
      '数据库采用mongodb',
      '服务器是centos,使用Nginx进行web服务器的搭建']
    }
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
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  li {
    list-style: disc;
  }
  .aboutBlog{
    font-size: 30px;
    font-weight:400;
  }
  .about {
    margin: 10px 0 0 20px;
  }
</style>