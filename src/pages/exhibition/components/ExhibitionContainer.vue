<template>
  <ul id="container">
    <li class="project" v-for="(project, index) in filterProjects" :key="index" :id="project._id" @mouseenter="showOperate(index)" @mouseleave="showOperate(-1)">
      <ul v-show="num == index ? true : false" class="operate">
        <li @click="edited(project)">编辑</li>
        <li @click="deleted(project._id,project.imgUrl)" type='warning'>
         删除
        </li>
      </ul>
      <el-card>
        <div slot="header" class="clearfix">
          <h1><a @click="addVisit(project._id)" :href="'http://'+project.webSite" target="_blank">{{project.title}}</a></h1>
        </div>
        <div class="wrap">
          <img :src="project.imgUrl" alt="project.imgUrl">
          <ul class="info">
            <li >
              <div class="el-icon-document name">描述:</div>
              <div class="detail">{{project.description}}</div>
            </li>
            <li>
              <div class="el-icon-place name">地址:</div>
              <div class="detail"><a @click="addVisit(project._id)" target="_blank" :href="'http://'+project.webSite">{{project.webSite}}</a></div>
            </li>
            <li>
              <div class="el-icon-view name">访问:</div>
              <div class="detail">{{project.visit}}</div>
            </li>
            <li>
              <div class="el-icon-time name">时间:</div>
              <div class="detail">{{project.date}}</div>
            </li>
          </ul>
        </div>
      </el-card>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ExhibitionContainer",
  props:['filterProjects'],
  inject: ['reload'],
  data () {
    return {
      num:-1
    };
  },
  
  methods: {
    showOperate(number){
      this.num = number;
    },
    edited(project){
      this.$router.push({name:'NewProject',params:{project}});
    },
    deleted(_id,imgUrl){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/deleteProject',{_id,imgUrl})
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
    },
    // 访问网站后更新访问数量
    addVisit(id){
      //异步队列
      this.$store.dispatch('addVisit',{id,type:'project'})
    }
  },
}
</script>

<style lang="scss" scoped  type="text/css">
@import 'styles/mixins.scss';
  #container {
    display: flex;
    flex-wrap: wrap;
    .project {
      position: relative;
      margin: 20px;
      margin-bottom: 40px;
      width: 45%;
      .operate {
        position: absolute;
        display: flex;
        height: 40px;
        line-height: 40px;
        right: 10px;
        font-size: 12px;
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
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both
      }
      .el-card {
        border: 2px solid #EBEEF5;
        @include grad(bottom,#7f838e,#333438,#f4f5f7);
        -webkit-transition: .3s;
        transition: .3s;
        .wrap {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          img {
            
            height: 200px;
            max-width: 100%;;
            margin: 0 auto;
          }
          .info {
            color: #fd514f;
            margin-left: 20px;
            li {
              display: flex;
              margin-top: 20px;
              div {
                line-height: 20px;
              }
              .name {
                white-space: nowrap
              }
              .detail {
                margin-left:10px;
                  a:hover, a:visited, a:link, a:active {
                    color: #fd514f;
                }
              }
            }
          }
        }
      }
    }    
  }  
</style>
  