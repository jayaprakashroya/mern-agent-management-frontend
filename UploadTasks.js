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
        const data = await response.json();
        setMessage(data.message || 'Failed to upload task');
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
          <label>Task Name:</label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
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
