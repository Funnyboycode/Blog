const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser')
const Users = require('./schema/users')
const Projects = require('./schema/projects')
const Articles = require('./schema/articles')
const upload = require('../utils/multer')
const fs = require('fs')
const app = express()
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(bodyParser.json())
app.use('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-type')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,PATCH')
  let {
    userName,
    pass
  } = req.body

  Users.findOne({ // 从users集合中查找用户
    userName,
    pass
  }).then(user => {
    if (user) { // 如果找到用户则登录成功  返回 0
      res.send({
        errno: 0
      })
    } else { // 如果没有找到用户  则登录失败 返回 1
      res.send({
        errno: 1
      })
    }
  })
})

// 存储项目数据
app.use('/project', (req, res) => {
  let {
    _id,
    title,
    webSite,
    description,
    imgUrl,
    visit,
    date,
    classification
  } = req.body
  if (_id) { // 如果有_id 则进行更新
    let sid = mongoose.Types.ObjectId(_id)
    let oldImgUrl
    // 找到之前的项目图片地址
    Projects.findOne({_id: sid}).then(project => {
      oldImgUrl = project.imgUrl
    })
    Projects.updateOne({_id: sid}, {$set: {title,
      webSite,
      description,
      imgUrl,
      visit,
      date}
    }).then(() => {
      res.send({error: 0, imgUrl: oldImgUrl}) // 返回修改成功
    })
  } else {
    new Projects({ // 保存注册成功的数据到Projects集合
      title,
      webSite,
      description,
      imgUrl,
      visit,
      date,
      classification
    }).save()
    res.send({error: 1}) // 返回新建成功
  }
})

// 删除项目数据
app.use('/deleteProject', (req, res) => {
  let { _id, imgUrl } = req.body
  let sid = mongoose.Types.ObjectId(_id)
  Projects.deleteOne({_id: sid}).then(() => {
    // 存在图片则删除图片
    if (imgUrl) {
      fs.unlink(imgUrl, err => {
        if (err) {
          res.send({error: 1})
        } else {
          res.send({error: 0})
        }
      })
    }
  })
})
// 存储文章数据
app.use('/article', (req, res) => {
  let {
    _id,
    title,
    text,
    imgUrl,
    visit,
    date,
    type,
    classification
  } = req.body
  if (_id) { // 如果有_id 则进行更新
    let sid = mongoose.Types.ObjectId(_id)
    let oldImgUrl
    // 找到之前的文章图片地址的集合
    Articles.findOne({_id: sid}).then(article => {
      oldImgUrl = article.imgUrl
    })
    Articles.updateOne({_id: sid}, {$set: {title,
      text,
      imgUrl,
      visit,
      date,
      type}
    }).then(() => {
      res.send({error: 0, imgUrl: oldImgUrl}) // 返回修改成功
    })
  } else {
    new Articles({ // 保存注册成功的数据到Articles集合
      title,
      text,
      imgUrl,
      visit,
      date,
      type,
      classification
    }).save()
    res.send({error: 1}) // 返回新建成功
  }
})

// 删除文章数据
app.use('/deleteArticle', (req, res) => {
  let { _id, imgUrl } = req.body
  let sid = mongoose.Types.ObjectId(_id)
  Articles.deleteOne({_id: sid}).then(() => {
    // 存在图片则删除图片
    if (imgUrl[0]) {
      imgUrl.forEach(img => {
        fs.unlink(img, err => {
          if (err) {
            res.send({error: 1})
          }
        })
      })
    }
    res.send({error: 0})
  })
})

app.use('/userlist', (req, res) => {
  Users.find().then(users => {
    // console.log(users)
    res.send(users)
  })
})

// 数据库获取项目数据
app.use('/projectlist', (req, res) => {
  Projects.find().then(project => {
    res.send(project)
  })
})

// 数据库获取文章数据
app.use('/articlelist', (req, res) => {
  Articles.find().then(article => {
    res.send(article)
  })
})

// 删除图片
app.use('/deletePic', (req, res) => {
  let imgUrl = req.body.imgUrl
  if (imgUrl[0]) {
    imgUrl.forEach(img => {
      fs.unlink(img, err => {
        if (err) {
          res.send({error: 1})
        }
      })
    })
  }
  res.send({error: 0})
})

// 上传图片到本地
app.use('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send({error: 1})
      return
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send({error: 1})
      return
    }
    // Everything went fine.
    res.send({
      error: 0,
      res: req.files
    })
  })
})

// 更新访问量
app.use('/addVisit', (req, res) => {
  if (req.body.type === 'project') {
    let sid = mongoose.Types.ObjectId(req.body.id)
    Projects.updateOne({_id: sid}, {$inc: {visit: 1}}).then(() => {
      res.send({error: 0}) // 返回修改成功
    })
  }
  if (req.body.type === 'article') {
    let sid = mongoose.Types.ObjectId(req.body.id)
    Articles.updateOne({_id: sid}, {$inc: {visit: 1}}).then(() => {
      res.send({error: 0}) // 返回修改成功
    })
  }
})
// 数据库连接
mongoose.connect('mongodb://localhost:27019/blog', {
  useNewUrlParser: true
}, err => {
  if (err) {
    console.log(err)

    console.log('数据库连接失败!')
    return
  }
  app.listen(3000, () => {
    console.log('3000端口成功监听')
  })
  console.log('数据库连接成功!')
})
