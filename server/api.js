const db = require('./db')
const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')
const fs = require('fs')
const multer = require('multer')
const mongoose = require('mongoose')

// 用户登录
router.use('/login', (req, res) => {
  let {
    userName,
    pass
  } = req.body
  db.Users.findOne({ // 从users集合中查找用户
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

// 用户注册
router.use('/register', (req, res) => {
  let {
    userName,
    pass,
    age,
    sex,
    hometown,
    address,
    hobby,
    imgUrl,
    signature,
    birthday,
    career,
    company,
    school,
    emai} = req.body
  db.Users.findOne({
    userName
  }).then(user => {
    if (user) { // 如果找到用户   则用户已被注册
      res.send({errno: 1})
      return
    }
    res.send({errno: 0})
    new db.Users({ // 保存注册成功的数据到users集合
      userName,
      pass,
      age,
      sex,
      hometown,
      address,
      hobby,
      imgUrl,
      signature,
      birthday,
      career,
      company,
      school,
      emai
    }).save()
  })
})
// 存储项目数据
router.use('/project', (req, res) => {
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
    db.Projects.findOne({_id: sid}).then(project => {
      oldImgUrl = project.imgUrl
    })
    db.Projects.updateOne({_id: sid}, {$set: {title,
      webSite,
      description,
      imgUrl,
      visit,
      date}
    }).then(() => {
      res.send({error: 0, imgUrl: oldImgUrl}) // 返回修改成功
    })
  } else {
    new db.Projects({ // 保存注册成功的数据到db.Projects集合
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
router.use('/deleteProject', (req, res) => {
  let { _id, imgUrl } = req.body
  let sid = mongoose.Types.ObjectId(_id)
  db.Projects.deleteOne({_id: sid}).then(() => {
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
router.use('/article', (req, res) => {
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
    db.Articles.findOne({_id: sid}).then(article => {
      oldImgUrl = article.imgUrl
    })
    db.Articles.updateOne({_id: sid}, {$set: {title,
      text,
      imgUrl,
      visit,
      date,
      type}
    }).then(() => {
      res.send({error: 0, imgUrl: oldImgUrl}) // 返回修改成功
    })
  } else {
    new db.Articles({ // 保存注册成功的数据到db.Articles集合
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
router.use('/deleteArticle', (req, res) => {
  let { _id, imgUrl } = req.body
  let sid = mongoose.Types.ObjectId(_id)
  db.Articles.deleteOne({_id: sid}).then(() => {
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

// 获取用户数据
router.use('/userlist', (req, res) => {
  db.Users.find().then(users => {
    // console.log(users)
    res.send(users)
  })
})

// 数据库获取项目数据
router.use('/projectlist', (req, res) => {
  db.Projects.find().then(project => {
    res.send(project)
  })
})

// 数据库获取文章数据
router.use('/articlelist', (req, res) => {
  db.Articles.find().then(article => {
    res.send(article)
  })
})

// 删除图片
router.use('/deletePic', (req, res) => {
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
router.use('/upload', (req, res) => {
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
router.use('/addVisit', (req, res) => {
  if (req.body.type === 'project') {
    let sid = mongoose.Types.ObjectId(req.body.id)
    db.Projects.updateOne({_id: sid}, {$inc: {visit: 1}}).then(() => {
      res.send({error: 0}) // 返回修改成功
    })
  }
  if (req.body.type === 'article') {
    let sid = mongoose.Types.ObjectId(req.body.id)
    db.Articles.updateOne({_id: sid}, {$inc: {visit: 1}}).then(() => {
      res.send({error: 0}) // 返回修改成功
    })
  }
})

module.exports = router
