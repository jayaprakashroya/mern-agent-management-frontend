import React, { useState } from 'react';

const UploadTasks = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const taskData = {
      name: taskName,
      description,
    };

    try {
      const response = await fetch('https://mern-agent-backend-1.onrender.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setMessage('Task uploaded successfully!');
        setTaskName('');
        setDescription('');
      } else {
        let errorMessage = 'Failed to upload task';
        try {
          const data = await response.json();
          if (data.message) errorMessage = data.message;
        } catch {
          // ignore parsing error
        }
        setMessage(errorMessage);
      }
    } catch (error) {
      setMessage('Error uploading task');
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <h2>Upload Task</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="taskName">Task Name:</label>
          <input
            id="taskName"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit Task</button>
      </form>
    </div>
  );
};

export default UploadTasks;
