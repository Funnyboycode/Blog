const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
  title: String,
  text: String,
  imgUrl: Array,
  visit: Number,
  date: String,
  type: Array,
  classification: String
})

module.exports = mongoose.model('articles', articleSchema)
