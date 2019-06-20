<template>
  <div id="backstage">
    <el-container>
      <el-aside>
         <el-menu
          class="el-menu-vertical-demo"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>后台管理器</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">写文章</el-menu-item>
              <el-menu-item index="1-2">写文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
          <el-menu-item index="/backstage/newArticle">
            <i class="el-icon-document"></i>
            <span slot="title">写文章</span>
          </el-menu-item>
          <el-menu-item index="/backstage/newProject">
            <i class="el-icon-folder"></i>
            <span slot="title">建项目</span>
          </el-menu-item>
          <el-menu-item index="/backstage/dressUp">
            <i class="el-icon-wallet"></i>
            <span slot="title">装扮</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "BackStage",
  data () {
    return {
    };
  }
}
</script>

<style lang="scss" scoped  type="text/css">
@import 'styles/variables.scss';
  #backstage {
    background: #fff;
    border-radius: 5px;
    box-shadow: 20px 20px 20px grey inset;
    .el-aside {
      padding: 20px !important;
      .el-menu {
        height: 100%;
      }
    }
    .el-main {
      @include z-index2;
    }
  }
</style>