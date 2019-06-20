<template>
  <div id="container">
    <ul class="articles">
      <li class="article" v-for="(article, index) in filterArticles" :key="index" :id="article._id" @mouseenter="showOperate(index)" @mouseleave="showOperate(-1)">
        <h1>{{article.title}}</h1>
        <!-- <p v-html="article.text"></p> -->
        <article-content :article="article"></article-content>
        <ul class="topRight">
          <li><span class="el-icon-view">{{article.visit}}</span></li>
          <li><span class="el-icon-time">{{article.date}}</span></li>
        </ul>
        <ul v-show="num == index ? true : false" class="operate">
          <li @click="edited(article)">编辑</li>
          <li @click="deleted(article._id,article.imgUrl)" type='warning'>删除</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import ArticleContent from './ArticleContent'
export default {
  name: "ArticlesContainer",
  props:['filterArticles'],
  inject:['reload'],
  components:{
    ArticleContent
  },
  data () {
    return {
      num: -1
    };
  },
  methods: {
    showOperate(number){
      this.num = number;
    },
    edited(article){
      this.$router.push({name:'NewArticle',params:{article}})
    },
    deleted(_id,imgUrl){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/api/deleteArticle',{_id,imgUrl})
          .then((res)=>{
            if(res.status === 200){
              // 重新加载页面
              this.reload();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss" scoped  type="text/css">
  @import 'styles/mixins.scss';
  #container {
    min-height: 600px;
    .articles {
      width: 90%;
      margin: 20px auto;
      border-radius: 5px;
      overflow: hidden;
      
      .article {
        position: relative;
        padding:10px;
        border-bottom: 1px solid #fff;
        @include grad(right bottom,#2e2e2e,#0d7d43,#bceeed);
        p {
          padding: 10px 0;
        }
        .topRight {
          position: absolute;
          display: flex;
          top: 10px;
          right: 0;
          li {
            padding: 0 10px;
          }
        }
        .operate {
          position: absolute;
          display: flex;
          height: 20px;
          line-height: 20px;
          right: 10px;
          bottom: 3px;
          font-size: 16px;
          z-index: 10002;
          li {
            cursor: pointer;
          }
          li:nth-child(1){
            color: #000;
          }
          li:nth-child(2){
            color:red;
            margin-left: 10px;
          }
        }
      }
    }
  }
</style>