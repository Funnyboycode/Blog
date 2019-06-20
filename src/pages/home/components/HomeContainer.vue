<template>
  <div id="homeContainer">
    <div class="showNum">
      <span>显示前</span>
      <input type="number" name="" id="num" min='0' v-model="input">
      <span>热门项目和文章</span>
    </div>
    <div ref="container" id="container">
      <div class="hotProjects">
        <h1>热门项目</h1>
        <ul class="wrap">
          <li v-for="(project, index) in hotProjects" :key="index" @click="jumpShow(project._id,project.classification)">
            <!-- <a :href="project.webSite" target="_blank"><h3>{{project.title}}</h3> -->
            <h3>{{project.title}}</h3>
            <span class="el-icon-view">{{project.visit}}</span>
          </li>
        </ul>
      </div>
      <div class="hotArticles">
        <h1>热门文章</h1>
        <ul class="wrap">
          <li v-for="(article, index) in hotArticles" :key="index" @click="jumpShow(article._id,article.classification)">
            <!-- <a :href="article.addr" target="_blank"><h3>{{article.title}}</h3></a> -->
            <h3>{{article.title}}</h3>
            <span class="el-icon-view">{{article.visit}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeContainer",
  data () {
    return {
      input: 10,
      articles: [],
      projects: []
    };
  },
  methods: {
    jumpShow(id,classification){
      // 跳转
      if(classification === 'article'){
        this.$router.push({name:'ArticlesShow',params:{id}})
      }
      if(classification === 'project'){
        this.$router.push({name:'ExhibitionShow',params:{id}})
      }
      //增加访问量
      this.$store.dispatch('addVisit',{id,type:classification})
    }
  },
  computed: {
    hotProjects(){
      return this.projects.slice(0,this.input)
    },
    hotArticles(){
      return this.articles.slice(0,this.input)
    }
  },
  created() {
    this.$store.dispatch('getArticleList');
    this.$store.dispatch('getProjectList');
    this.projects = this.$store.state.projectlist.sort((a,b) => {
      return b.visit - a.visit
    });
    this.articles = this.$store.state.articlelist.sort((a,b) => {
      return b.visit - a.visit
    });
  },
  mounted() {
    //左右俩边的高度一致
    let projectH = this.$refs.container.children[0].clientHeight
    let articleH = this.$refs.container.children[1].clientHeight
    let maxH = Math.max(projectH,articleH)
    this.$refs.container.children[0].style.height = maxH + "px"
    this.$refs.container.children[1].style.height = maxH + "px"
  },
}
</script>

<style lang="scss" scoped  type="text/css">
  .showNum {
    padding: 10px 0 30px 10px;
    #num {
      position: relative;
      width: 40px;
      z-index: 10002;
    }
  }
  #container {
    display: flex;
    align-items: flex-start;
    justify-content: space-around;
    min-height: 600px;
    padding-top: 20px;
    background-color: #3b3b3b;
    border-radius: 10px;
    .hotProjects {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 40%;
      min-height: 500px;
      background-color: #494a4f;
      border-radius: 5px;
      h1 {
        padding: 10px 0;
        font-size: 25px;
        color: red;
      }
      .wrap {
        z-index: 10002;
        margin-bottom: 20px;
        width: 80%;
        li {
          display: flex;
          justify-content: space-between;
          padding: 10px 10px;
          border: 1px solid grey;
          cursor: pointer;
          a {
            width: 80%;
            color: #fff;
          }
          span {
            width: 20%;
          }
        }
      }
    }
    .hotArticles {
      @extend .hotProjects
    }
  }
</style>