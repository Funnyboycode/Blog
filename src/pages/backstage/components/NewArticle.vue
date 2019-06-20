<template>
  <div id="newArticle">
    <div class="head">
      <el-input v-model="form.title" placeholder="请输入文章表标题"></el-input>
      <el-button slot="append" @click="submit">保存文章</el-button>
      <el-button slot="append" @click="abandon">放弃保存</el-button>
    </div>
    <div id="tag">
      <span>标签:</span>
      <el-select v-model="form.type" multiple filterable placeholder="请选择">
        <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
      </el-select>
    </div>
    <!-- 图片上传组件辅助-->
    <el-upload 
      v-show="false"
      class="avatar-uploader"
      action="/api/upload"
      :headers="header"
      accept="image/*"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError">
    </el-upload>
    <!-- 富文本编辑器 -->
    <quill-editor ref="myQuillEditor" v-model="form.text" class="myQuillEditor" :options="editorOption"/>
  </div>
</template>

<script>
import dateFtt from '../../../../js/dateTime'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{'header': 1}, {'header': 2}],               // custom button values
  [{'list': 'ordered'}, {'list': 'bullet'}],
  [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
  [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
  [{'direction': 'rtl'}],                         // text direction

  [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
  [{'header': [1, 2, 3, 4, 5, 6, false]}],

  [{'color': []}, {'background': []}],          // dropdown with defaults from theme
  [{'font': []}],
  [{'align': []}],
  ['link', 'image', 'video'],
  ['clean']                                         // remove formatting button
]
export default {
  name: "NewArticle",
  inject:['reload'],
  data() {
    return {
      form:{
        _id: '',
        title: '',
        text: '',
        imgUrl: [],
        visit: 0,
        date: '',
        type: '',
        classification: 'article'
      },
      options: ["HTML", "CSS", "JS", "life", "technology"],
      header: {token: sessionStorage.token},  // 有的图片服务器要求请求头需要有token之类的参数，写在这里
      editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        }
    }
  },
  methods: {
    // 上传图片成功
    uploadSuccess(res){
      let info = res.res[0].path.replace(/\\/g,"/");
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (info !== null) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  info为服务器返回的图片地址
        quill.insertEmbed(length, 'image', info);
        // 调整光标到最后
        quill.setSelection(length + 1);
        //图片路径添加进去
        this.form.imgUrl.push(info)
      } else {
        this.$message.error('图片插入失败');
      }
    },
    // 上传图片失败
    uploadError(){
      this.$message.error('图片插入失败');
    },
    //保存文章
    submit() {
      this.form.date = dateFtt("yyyy-MM-dd hh:mm:ss", new Date());
      //找到富文本编辑器里面的图片
      let ele = document.querySelector('.ql-container');
      let aImgUrl = ele.querySelectorAll('img');
      let nowImg = [];
      aImgUrl.forEach(item => {
        nowImg.push(item.getAttribute('src'));
      });
      this.imgUrl = nowImg;
      this.$axios
        .post("/api/article", this.form)
        .then(res => {
          if (!res.data.errno) {
            //更改成功
            // 删除之前旧的图片
            if(res.data.imgUrl){
              let deleteUrl = [];
              res.data.imgUrl.forEach(url => {
                if(this.imgUrl.indexOf(url) < 0) deleteUrl.push(url);
              });
              if (deleteUrl[0]) this.$axios.post('/api/deletePic',{imgUrl: deleteUrl});
            }
          }
          this.$message({
            message: "恭喜您,文章保存成功!",
            type: "success"
          });
          // 页面刷新
          this.$route.params.article = null;
          this.reload();
        });
    },
    // 文章放弃保存
    abandon(){
      let imgUrl = this.imgUrl;
      this.$confirm('此操作将删除刚才文章中上传的图片, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/api/deletePic',{imgUrl})
        .then((res)=>{
          if(res.status === 200){
            // 重新加载页面
            this.$route.params.article = null;
            this.reload();
            this.$message({
              type: 'success',
              message: '放弃保存成功!'
            });
          }
        });
        
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '放弃保存已取消'
        });          
      });
    }
  },
  created() {
    let article = this.$route.params.article;
    if(article){
      this.form._id = article._id
      this.form.title = article.title;
      this.form.type = article.type;
      this.form.text = article.text;
      this.form.visit = article.visit;
    }
  },
};
</script>

<style lang="scss" scoped  type="text/css">
#newArticle {
  color: #000;
  .head {
    display: flex;
    justify-content: space-between;
    .el-input {
      width: 85%;
    }
    .el-button {
      width: 13%;
      background: red;
      color: #fff;
      font-weight: 800;
    }
  }
  #tag {
    margin: 20px 0;
  }
}
#newArticle /deep/ .ql-container {
  min-height: 490px !important;
}
</style>