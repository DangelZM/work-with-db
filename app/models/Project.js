const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: String,
  description: String,
  added: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);