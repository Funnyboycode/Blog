// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose')
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27019/blog', {useNewUrlParser: true}, function (err) {
  if (err) {
    console.log('Connection Error:' + err)
  } else {
    console.log('Connection success!')
  }
})
// 为这次连接绑定事件
const db = mongoose.connection
db.once('error', (error) => console.log(`Mongo connection error: ${error}`))
db.once('open', () => console.log('Mongo connection successed'))
// /************** 定义模式Schema **************/
// const loginSchema = new mongoose.Schema({
//     account : String,
//     password : String
// });

// 用户
const userSchema = new mongoose.Schema({
  userName: String, // 用户名
  pass: String, // 密码
  age: Number, // 年龄
  sex: String, // 性别
  hometown: String, // 住址
  address: String, // 现居住地
  hobby: String, // 爱好
  imgUrl: String, // 头像
  signature: String, // 签名
  birthday: String, // 生日
  career: String, // 职业
  company: String, // 公司
  school: String, // 学校
  email: String // 邮箱
})

// 文章
const articleSchema = new mongoose.Schema({
  title: String,
  text: String,
  imgUrl: Array,
  visit: Number,
  date: String,
  type: Array,
  classification: String
})
// 项目
const projectSchema = new mongoose.Schema({
  title: String,
  webSite: String,
  description: String,
  imgUrl: String,
  visit: Number,
  date: String,
  classification: String
})
// /************** 定义模型Model **************/
// const Models = {
//     Login : mongoose.model('Login',loginSchema)
// }

const Models = {
  Users: mongoose.model('Users', userSchema),
  Projects: mongoose.model('Projects', projectSchema),
  Articles: mongoose.model('Articles', articleSchema)
}
module.exports = Models
