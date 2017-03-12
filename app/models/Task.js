const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  title: String,
  description: String,
  added: { type: Date, default: Date.now },
  priority: String,
});

module.exports = mongoose.model('Task', TaskSchema);