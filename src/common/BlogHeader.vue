<template>
  <div id="header">
    <div class="wrap">
      <el-menu
        :default-active="activeIndex2"
        router
        class="el-menu-demo"
        menu-trigger="click"
        collapse-transition
        mode="horizontal"
        @select="handleSelect"
        background-color="#2d2d2d"
        text-color="#fff"
        active-text-color="#ffd04b">
        <!-- <el-menu-item><img style="height:58px" src="./../assets/images/logo.jpg" alt=""></el-menu-item> -->
        <el-menu-item index="/home">Home</el-menu-item>
        <el-menu-item index="/exhibition">Exhibition</el-menu-item>
        <el-submenu index=''>
          <template slot="title">Articles</template>
          <el-menu-item index="/articles/all">All</el-menu-item>
          <el-menu-item index="/articles/life">Life</el-menu-item>
          <el-menu-item index="/articles/technology">Technology</el-menu-item>
        </el-submenu>
        <el-menu-item index="/about">About</el-menu-item>
        <el-menu-item index="/link">Link</el-menu-item>
        <el-menu-item class="setup">
          <el-select
            class="inputWidth"
            v-model="value"
            clearable
            filterable
            remote
            reserve-keyword
            default-first-option
            :popper-append-to-body = false
            placeholder="请输入搜索内容"
            :remote-method="remoteMethod"
            :loading="loading">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
            <el-button slot="append" icon="el-icon-search"></el-button>
            <!-- <ul v-show="show" class="showContent">
              <li @click="close(item)" v-for="(item, index) in options" :key="item._id">item.title</li>
            </ul> -->
            <el-option
              v-for="item in options"
              :key="item._id"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
        </el-menu-item>
        <el-menu-item class="setup">
          <router-link to="/backstage">
            <i class="el-icon-setting" style="margin-right: 15px;font-size:25px;"></i>
          </router-link>
          <span>Funny</span>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogHeader",
  data() {
    return {
      activeIndex2: '1',
      options: [],
      value: [],
      list: [],
      loading: false,
      states:[]
    };
  },
  watch: {
    value: 'changeData'
    
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          //从数据库获取数据
          this.$store.dispatch('getArticleList').then(()=>{
            this.$store.dispatch('getProjectList').then(()=>{
              this.states = this.$store.state.articlelist.concat(this.$store.state.projectlist)
              this.options = this.states.filter(item => {
                return item.title.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1;
              });
            })
          })
        }, 200);
      } else {
        this.options = [];
      }
    },
    changeData(currVal,oldVal){
      if(!currVal)return;
      let content = this.states.filter((item)=>{
        return item._id === currVal;
      })
      if(content[0] && content[0].classification === 'article'){
        this.$router.push({name:'ArticlesShow',params:{id:content[0]._id}})
      }
      if(content[0] && content[0].classification === 'project'){
        this.$router.push({name:'ExhibitionShow',params:{id:content[0]._id}})
      }
    },
    handleScroll(e){
      let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
      let oHeader = document.getElementById('header');
      oHeader.style.left = -scrollLeft + 'px';

    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
}
</script>

<style lang="scss" scoped  type="text/css">
@import 'styles/variables.scss';
  #header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgb(45, 45, 45);
    @include z-index3;
    .wrap {
      width: 1240px;
      margin: 0 auto;
    }
  }
  .inputWidth {
    width: 300px !important;
    .showContent {
      position: relative;
      width: 300px;
    }
  }
  .el-menu-demo {
    border-bottom: none !important;
    .el-menu-item {
      font-size: 20px !important;
      padding: 0 30px !important;
      user-select: none !important;
      .el-select {
        display: block;
      }
      .el-dropdown {
        background: rgb(45, 45, 45) !important;
      }
    }
  }
  #header /deep/ .el-submenu__title{
    font-size: 20px !important;
    padding: 0 30px !important;
    user-select: none !important;
  }
  #header  /deep/ .setup:hover {
        background: #2d2d2d !important;
  }
 
</style>
