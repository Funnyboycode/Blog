<template>
  <div id="example">
   <!-- 利用v-if…v-else切换 展开 和 收起 两个画面，template包裹多个元素 -->
    <template v-if="isHide">
        <!-- 只显示摘要的画面 -->
        <div class="hideBg">
            <!-- <p class="summary" v-html="content"></p> -->
            <div class="ql-editor summary" v-html="content"></div>
            <quill-editor
              ref="text"
              v-show="false"
              v-model="content"
              @focus="onEditorFocus($event)"
              class="myQuillEditor"
              />
            <div class="showBtn">
                <!-- 绑定点击事件onShow，点击展开全文 -->
                <a href="#" @click.stop.prevent="onShow">展开阅读全文&nbsp;
                    <!-- 向下的角箭头符号，用css画 -->
                    <span class="downArrow"></span>
                </a>
            </div>
        </div>
    </template>
    <template v-else>
        <!-- 显示完整内容的画面 -->
        <div class="showBg">
            <div class="ql-editor" v-html="content"></div>            
            <div class="hideBtn">
                <!-- 绑定点击事件onHide，点击收起内容 -->
                <a href="#" @click.stop.prevent="onHide">收起&nbsp;
                    <!-- 向上的角箭头符号 -->
                    <span class="upArrow"></span>
                </a>
            </div>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ArticleContent",
  inject:['reload'],
  props:['article'],
  data() {
    return {
      con: '',
      isHide: true    //初始值为true，显示为折叠画面      
    }
  },
  computed: {
    content:{
      get(){
        return this.article.text;
      },
      set(newVal){
        this.con = newVal;
      }
    }
  },
  methods: {
    onShow: function(){
        this.isHide = false;    //点击onShow切换为false，显示为展开画面
        // 访问量加1
        this.$store.dispatch('addVisit',{type:'article',id: this.article._id}).then(() => {
          // this.reload();
        })
    },
    onHide: function(){
        this.isHide = true;    //点击onHide切换为true，显示为折叠画面
    },
    onEditorFocus(val,editor){ // 富文本获得焦点时的事件
      // console.log(val); // 富文本获得焦点时的内容
      editor.enable(false); // 在获取焦点的时候禁用
    }
  }
}
</script>

<style lang="scss" scoped  type="text/css">
  /* 摘要背景板 */
  .hideBg {
    // width: 500px;
    // background-color: #e9ecef;
    margin: 10px;
    padding: 10px;
    padding-bottom: 0;    /* 方便渐变层遮挡 */
    position: relative;    /* 用于子元素定位 */
  }
  /* 全文背景板，基本与摘要相同 */
  .showBg {
    margin: 10px;
    padding: 10px;
  }
  /* 摘要内容 */
  .summary {
    overflow: hidden;    /* 隐藏溢出内容 */
    line-height: 25px;
    height: 75px;
    padding: 0 !important;
  }
  #example p {
    text-indent: 2em;
  }
  /* 展开按钮 */
  .showBtn {
    width: 100%;    /* 与背景宽度一致 */
    height: 20px;
    position: absolute;    /* 相对父元素定位 */
    top: 20px;    /* 刚好遮挡在最后两行 */
    left: 0;
    z-index: 10002;    /* 正序堆叠，覆盖在p元素上方 */
    text-align: center;
    // opacity: .5;
    padding-top: 60px;
  }
  /* 收起按钮 */
  .hideBtn {
    position: relative;
    text-align: right;
    z-index: 10002;
  }
  #example a {
    text-decoration: none;    /* 清除链接默认的下划线 */
  }
  /* 向下角箭头 */
  .downArrow {
    display: inline-block;
    width: 8px;    /* 尺寸不超过字号的一半为宜 */
    height: 8px;
    border-right: 1px solid;    /* 画两条相邻边框 */
    border-bottom: 1px solid;
    transform: rotate(45deg);    /* 顺时针旋转45° */
    margin-bottom: 3px;
  }
  /* 向上角箭头，原理与下箭头相同 */
  .upArrow {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-left: 1px solid;
    border-top: 1px solid;
    transform: rotate(45deg);
    margin-top: 3px;
  }
</style>