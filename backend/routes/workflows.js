const express = require('express');
const router = express.Router();
const Workflow = require('../models/workflow');
const Task = require('../models/task');
// JWT middleware can be added here if you prefer to secure all routes in this router.
const authenticateJWT = require('../middleware/authenticateJWT'); // create this as a shared file if needed


// Create a Workflow
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { name, nodes, transitions } = req.body;
    let newWorkflow = new Workflow({ name, nodes, transitions });
    newWorkflow = await newWorkflow.save();
    res.status(201).json(newWorkflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get a Workflow by ID
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });
    res.json(workflow);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Execute a Workflow
router.post('/:id/execute', authenticateJWT, async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) return res.status(404).json({ error: 'Workflow not found' });

    // For each node in the workflow, create a task and simulate execution.
    workflow.nodes.forEach(async (node) => {
      const task = new Task({
        workflowId: workflow._id,
        nodeId: node.id,
        status: 'pending'
      });
      await task.save();

      // Simulate task execution delay and update the status.
      setTimeout(async () => {
        task.status = 'completed';
        await task.save();
        // Emit task status update
        req.app.get('io').emit('taskStatusUpdate', { id: task._id, nodeId: task.nodeId, status: task.status });
      }, 2000);
    });

    res.json({ message: 'Workflow execution started' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
