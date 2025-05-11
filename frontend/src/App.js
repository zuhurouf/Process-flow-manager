import React from 'react';
import WorkflowEditor from './components/workfloweditor';
import Dashboard from './components/dashboard';

const App = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Process Flow Creator for Logistics Optimization</h1>
      <WorkflowEditor />
      <Dashboard />
    </div>
  );
};

export default App;
