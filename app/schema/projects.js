const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: String,
  webSite: String,
  description: String,
  imgUrl: String,
  visit: Number,
  date: String,
  classification: String
})

module.exports = mongoose.model('projects', projectSchema)
