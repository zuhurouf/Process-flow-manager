import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Connect to the backend Socket.io server (adjust URL/port as needed)
const socket = io('http://localhost:5000');

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Listen for real-time task status updates
    socket.on('taskStatusUpdate', (data) => {
      setTasks((prevTasks) => {
        // Check if the task already exists in the list
        const taskIndex = prevTasks.findIndex((t) => t.id === data.id);
        if (taskIndex >= 0) {
          // Update the existing task
          const updatedTasks = [...prevTasks];
          updatedTasks[taskIndex] = data;
          return updatedTasks;
        }
        return [...prevTasks, data];
      });
    });

    // Clean up the listener when the component unmounts
    return () => {
      socket.off('taskStatusUpdate');
    };
  }, []);

  return (
    <div>
      <h2>Task Dashboard</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            Node {task.nodeId} — Status: {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
