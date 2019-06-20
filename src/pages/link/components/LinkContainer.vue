<template>
  <div id="container">
    <ul class="links">
      <li class="link" v-for="(link, index) in links" :key="index">
        <a :href="link.addr" target="_blank">
          <el-tooltip class="item" effect="dark" :content="link.des" placement="top-start">
            <el-button>{{link.title}}</el-button>
          </el-tooltip>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LinkContainer",
  data () {
    return {
      links:[
        {title: "网页设计色彩剖析之深邃黑",
        addr: "https://www.uisdc.com/black-web-design",
        des: "颜色中的黑暗骑士：网页设计色彩剖析之深邃黑"
        },
        {title: "Vue官网",
        addr: "https://cn.vuejs.org/",
        des: "Vue是一套用于构建用户界面的渐进式框架,Vue中所有东西都是响应式的."
        },
        {title: "Sass中文文档",
        addr: "https://www.sass.hk/docs/",
        des: "Sass 是一款强化 CSS 的辅助工具，它在 CSS 语法的基础上增加了变量 (variables)、嵌套 (nested rules)、混合 (mixins)、导入 (inline imports) 等高级功能，这些拓展令 CSS 更加强大与优雅."
        },
        {title: "ElementUI官网学习",
        addr: "https://element.eleme.cn/#/zh-CN",
        des: "饿了么前端团队推出的一款基于Vue.js 2.0 的桌面端UI框架."
        },
      ]
    };
  }
}
</script>

<style lang="scss" scoped  type="text/css">
@import 'styles/mixins.scss';
  #container {
    min-height: 650px;
    border-radius: 5px;
    padding: 50px;
    @include grad(top left,#909090,#000,#55565b);
    .link {
      margin-bottom: 30px;
      .el-button {
        background: #a95324 !important;
        color: #000500 !important;
        font-weight: 800;
        border: 2px solid gold !important;
      }
    }
  }

</style>