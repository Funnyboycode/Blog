<template>
  <div id="newProject">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item prop="title" label="项目名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item prop="webSite" label="项目网址">
        <el-input v-model="form.webSite"></el-input>
      </el-form-item>
      <el-form-item label="图片上传">
        <el-upload ref="upload"
          :limit="1"
          drag
          :on-success="handleSuccess"
          :on-error="handleError"
          accept="image/*"
          :auto-upload="false"
          action="/api/upload"
          list-type="picture"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item prop="description" label="项目简述">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即保存</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import dateFtt from '../../../../js/dateTime'
export default {
  name: "NewProject",
  inject:['reload'],
  data () {
    return {
      len: 0,
      form: {
        _id:'',
        title: '',
        webSite: '',
        description: '',
        imgUrl: '',
        visit: 0,
        date: '',
        classification: 'project'
      },
      rules:{
        title:[{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        webSite:[{ required: true, message: '请输入项目地址', trigger: 'blur' }],
        description:[{ required: true, message: '请输入项目简述', trigger: 'blur' }]
      },
      fileList:[]
    };
  },
  methods: {
    onSubmit(){
      // 如果没有选择图片长度为0
      this.len = this.$refs.upload.uploadFiles.length;
      if (this.len === 0) {
        if(this.$route.params.project) this.form.imgUrl = this.$route.params.project.imgUrl;
        this.uploadProject();
      } else if (this.len > 0) {
        this.$refs.upload.submit();
      }
    },
    onCancel(){
      if(this.$route.params.project){
        this.$route.params.project = null;
      }
      this.reload();
    },
    handleSuccess(res){
      this.form.imgUrl = res.res[0].path.replace(/\\/g,"/");
      this.uploadProject();
    },
    handleError(){
      this.$message.error('上传失败');
    },
    // 上传项目数据到数据库
    uploadProject(){
      this.form.date = dateFtt("yyyy-MM-dd hh:mm:ss",new Date());
      if(this.$route.params.project){
        this.form._id = this.$route.params.project._id;
      }
      this.$axios.post('/api/project',
        this.form
      )
      .then(res => {
        if (!res.data.error) {
          //更改成功
          // 删除之前旧的图片
          if(this.len > 0 && res.data.imgUrl){
            this.$axios.post('/api/deletePic',{imgUrl: [res.data.imgUrl]})
          }
          
          this.$message({
            type: "success",
            message:"项目已经更改成功!"
          });
          this.reload();
          return;
        }
        this.$message({
          message: "恭喜您,项目创建成功!",
          type: "success"
        });
        this.reload();
      })
    },
  },
  created() {
    let project = this.$route.params.project;
    if(project){
    this.form.title = project.title;
    this.form.webSite = project.webSite;
    this.form.description = project.description;
    this.form.visit = project.visit;
    }
  },
}
</script>

<style lang="scss" scoped  type="text/css">
  #newProject {
    color: #000;
  }
</style>