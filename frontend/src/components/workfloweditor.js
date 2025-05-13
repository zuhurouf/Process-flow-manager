import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css'; 

import axios from 'axios'; // For API calls


const initialNodes = [];
const initialEdges = [];

const WorkflowEditor = () => {
  // Using React Flow’s hooks to manage nodes and edges separately.
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Local state for a new node's label from user input.
  const [newNodeLabel, setNewNodeLabel] = useState('');

  // Adds a new node at a default location. (You could improve this with a custom drop zone.)
  const addNode = () => {
    if (!newNodeLabel.trim()) return; // Ignore empty input

    // Create a new node. For uniqueness, we use Date.now()—adapt as needed.
    const newNode = {
      id: `${Date.now()}`, // Unique id
      data: { label: newNodeLabel },
      position: { x: 250, y: 100 }, // Default starting position. You may randomize or let user drop.
    };

    setNodes((nds) => nds.concat(newNode));
    setNewNodeLabel('');
  };

  // Custom onConnect that prompts the user for a condition.
  const onConnect = useCallback(
    (params) => {
      // Ask for condition input when an edge is created.
      const condition = window.prompt('Enter condition for this connection:');
      
      // Build the new edge object with the provided condition.
      const newEdge = {
        id: `e-${params.source}-${params.target}-${Date.now()}`,
        source: params.source,
        target: params.target,
        label: condition ? condition : '', // Save condition in label (or you may use a custom field)
      };

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Save workflow to the database via the back-end.
  // This function calls an API endpoint (e.g., POST /workflows) with the nodes and edges data.
  const saveWorkflow = async () => {
    // Prepare the workflow object.
    const workflow = {
      name: 'New Workflow',
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.type || 'default',
        label: node.data.label,
        position: node.position,
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        condition: edge.label,
      })),
    };
    console.log(workflow);
    try {
      // Example POST using axios. Adjust the URL and payload as needed.
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDY5NzM4OTYsImV4cCI6MTc0Njk3NzQ5Nn0.FiDD3trEIbeyNb8GJzdsYxWhSyzlV8IDoMFwTxqahZU"
      const response = await axios.post('http://localhost:5000/workflows', workflow, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      console.log('Workflow saved!', response.data);

      // Optionally, update the dashboard using a WebSocket event or call a function.
      // For example, if using Socket.io:
      // socket.emit('workflowUpdated', response.data);
      
      alert('Workflow saved successfully!');
    } catch (error) {
      console.error('Error saving workflow:', error);
      alert('Error saving workflow');
    }
  };

  return (
    <ReactFlowProvider>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter node task"
          value={newNodeLabel}
          onChange={(e) => setNewNodeLabel(e.target.value)}
        />
        <button onClick={addNode}>Add Node</button>
        <button onClick={saveWorkflow} style={{ marginLeft: '1rem' }}>
          Save Workflow
        </button>
      </div>

      <div style={{ height: 500, border: '1px solid #ddd' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          deleteKeyCode={46} // Delete key to remove nodes or edges
        />
      </div>
    </ReactFlowProvider>
  );
};

export default WorkflowEditor;
