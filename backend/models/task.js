const mongoose = require('mongoose');


const TaskSchema = new mongoose.Schema({
  workflowId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workflow' },
  nodeId: String,
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Task', TaskSchema);
