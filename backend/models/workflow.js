const mongoose = require('mongoose');


const WorkflowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nodes: [
    {
      id: String,
      type: String,
      data: mongoose.Schema.Types.Mixed,
      position: { x: Number, y: Number }
    }
  ],
  transitions: [
    {
      from: String,
      to: String,
      condition: String
    }
  ],
  version: { type: Number, default: 1 }
});


module.exports = mongoose.model('Workflow', WorkflowSchema);
