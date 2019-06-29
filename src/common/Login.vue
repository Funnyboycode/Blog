<template>
  <div id="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="headTitle">
        <i class="el-icon-star-off"></i>
        <span>个人博客登录</span>
      </div>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        userName: '', // 用户名
        pass: '', // 密码
        age: '', // 年龄
        sex: '', // 性别
        hometown: '', // 住址
        address: '', // 现居住地
        hobby: '', // 爱好
        imgUrl: '', // 头像
        signature: '', // 签名
        birthday: '', // 生日
        career: '', // 职业
        company: '', // 公司
        school: '', // 学校
        email: '', // 邮箱
        isAdmin: 0 //是否是管理员
      },
      rules: {
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户名字", trigger: "blur" },
          { min: 4, max: 16, message: "长度在 4 到 16 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //所有的检验规则都成立 则valid为true
          // alert('submit!');
          //把用户的信息传递到后台  向这个借口/Login传递数据
          // this.$axios.post('/api/login',{
          this.$axios
            .post("/api/login", {
              userName: this.ruleForm.userName,
              pass: this.ruleForm.pass
            })
            .then(res => {
              if (res.data.errno) {
                //如果登录失败  则出现失败的提示
                this.$message.error("用户不存在,请先注册!");
                return;
              }
              this.$message({
                message: "恭喜您,登录成功!",
                type: "success"
              });
              // this.$router.push("/admin");
              this.$store.commit("saveLoginUser", this.ruleForm.userName);
              // this.$emit('changeStatus',this.ruleForm.userName)
              this.$router.go(-1,true);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //所有的检验规则都成立 则valid为true
          // alert('submit!');
          //把用户的信息传递到后台  向这个借口/Login传递数据
          this.$axios
            .post("/api/register", this.ruleForm)
            .then(res => {
              if (res.data.errno) {
                //如果用户已存在 提示
                this.$message.error("用户已存在,不能注册!");
                return;
              }
              this.$message({
                message: "恭喜您,注册成功!",
                type: "success"
              });
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped  type="text/css">
#login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 500px;
  height: 250px;
  padding: 20px 30px 40px 0;
  margin: auto;
  box-shadow: 0 0 10px 0 blue;
}
.headTitle {
  margin: 20px auto 30px;
  text-align: center;
  font-size: 25px;
  font-weight: 800;
}
#login /deep/ .el-form-item__label {
  color: #fff !important;
}
</style>